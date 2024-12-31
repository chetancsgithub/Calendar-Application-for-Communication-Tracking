import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { logCommunicationByName } from '../../services/api';

const CommunicationActionModal = ({ open, onClose, selectedCompanies, refreshCompanies }) => {
  const [form, setForm] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const companyName = selectedCompanies[0]; // The only selected company
      if (companyName) {
        await logCommunicationByName(companyName, {
          type: form.type,
          date: form.date,
          notes: form.notes,
        });
        refreshCompanies();
        onClose();
      }
    } catch (error) {
      console.error('Failed to log communication:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log Communication</DialogTitle>
      <DialogContent>
        <Select
          name="type"
          value={form.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Phone Call">Phone Call</MenuItem>
        </Select>
        <TextField
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="notes"
          label="Notes"
          value={form.notes}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommunicationActionModal;
