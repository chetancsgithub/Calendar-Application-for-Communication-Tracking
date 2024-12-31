import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import axios from 'axios'; // Ensure axios is imported
import React, { useEffect, useState } from 'react';
import {
  addCommunicationMethod,
  getCommunicationMethods,
  updateCommunicationMethod,
} from '../../services/api';

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const response = await getCommunicationMethods();
      setMethods(response.data);
    } catch (error) {
      console.error('Error fetching communication methods:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setForm((prev) => ({ ...prev, mandatory: checked }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateCommunicationMethod(editId, form);
      } else {
        await addCommunicationMethod(form);
      }
      setOpen(false);
      setForm({
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
      });
      setEditId(null);
      fetchMethods();
    } catch (error) {
      console.error('Error saving communication method:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/communication-methods/${id}`);
      setMethods(methods.filter((method) => method._id !== id));
      console.log('Communication method deleted successfully');
    } catch (error) {
      console.error('Error deleting communication method:', error);
      alert('Failed to delete the communication method. Please try again.');
    }
  };

  const handleEdit = (method) => {
    setEditId(method._id);
    setForm({
      name: method.name || '',
      description: method.description || '',
      sequence: method.sequence || '',
      mandatory: method.mandatory || false,
    });
    setOpen(true);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Communication Method
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Sequence</TableCell>
            <TableCell>Mandatory</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {methods.map((method) => (
            <TableRow key={method._id}>
              <TableCell>{method.name}</TableCell>
              <TableCell>{method.description}</TableCell>
              <TableCell>{method.sequence}</TableCell>
              <TableCell>
                <Checkbox checked={method.mandatory} disabled />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(method)}>Edit</Button>
                <Button onClick={() => handleDelete(method._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editId ? 'Edit Communication Method' : 'Add Communication Method'}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            value={form.description}
            onChange={handleInputChange}
          />
          <TextField
            name="sequence"
            label="Sequence"
            type="number"
            fullWidth
            margin="normal"
            value={form.sequence}
            onChange={handleInputChange}
          />
          <Box display="flex" alignItems="center" marginTop={2}>
            <Checkbox
              checked={form.mandatory}
              onChange={handleCheckboxChange}
            />
            <span>Mandatory</span>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommunicationMethodManagement;
