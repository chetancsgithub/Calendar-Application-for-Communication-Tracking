import {
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom';
import { addCompany, getCompanies, updateCompany } from '../../services/api';
const CompanyManagement = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '',
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await getCompanies();
    setCompanies(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateCompany(editId, form);
      } else {
        await addCompany(form);
      }
      setOpen(false);
      setForm({
        name: '',
        location: '',
        linkedInProfile: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
        communicationPeriodicity: '',
      });
      setEditId(null);
      fetchCompanies();
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
      console.log('Company deleted successfully');
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('Failed to delete the company. Please try again.');
    }
  };

  const handleEdit = (company) => {
    setEditId(company._id);
    setForm({
      name: company.name || '',
      location: company.location || '',
      linkedInProfile: company.linkedInProfile || '',
      emails: company.emails.join(', ') || '',
      phoneNumbers: company.phoneNumbers.join(', ') || '',
      comments: company.comments || '',
      communicationPeriodicity: company.communicationPeriodicity || '',
    });
    setOpen(true);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Company
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/admin/communication-methods')}
        style={{ marginLeft: '10px' }}
      >
        Communication Method
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>LinkedIn Profile</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company._id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>
                <a href={company.linkedInProfile} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(company)}>Edit</Button>
                <Button onClick={() => handleDelete(company._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? 'Edit Company' : 'Add Company'}</DialogTitle>
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
            name="location"
            label="Location"
            fullWidth
            margin="normal"
            value={form.location}
            onChange={handleInputChange}
          />
          <TextField
            name="linkedInProfile"
            label="LinkedIn Profile"
            fullWidth
            margin="normal"
            value={form.linkedInProfile}
            onChange={handleInputChange}
          />
          <TextField
            name="emails"
            label="Emails"
            fullWidth
            margin="normal"
            value={form.emails}
            onChange={handleInputChange}
          />
          <TextField
            name="phoneNumbers"
            label="Phone Numbers"
            fullWidth
            margin="normal"
            value={form.phoneNumbers}
            onChange={handleInputChange}
          />
          <TextField
            name="comments"
            label="Comments"
            fullWidth
            margin="normal"
            value={form.comments}
            onChange={handleInputChange}
          />
          <TextField
            name="communicationPeriodicity"
            label="Communication Periodicity"
            fullWidth
            margin="normal"
            value={form.communicationPeriodicity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyManagement;
