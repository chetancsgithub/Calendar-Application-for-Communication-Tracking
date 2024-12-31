const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Get all companies with communications
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete company by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!id) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully', deletedCompany });
  } catch (err) {
    console.error('Error deleting company:', err);
    res.status(500).json({ error: 'An error occurred while deleting the company' });
  }
});

// Log a new communication
router.post('/name/:name/log', async (req, res) => {
  try {
    const { name } = req.params;
    const { type, date, notes } = req.body;

    const company = await Company.findOne({ name });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    company.lastCommunications.push({ type, date, notes });

    // Update next communication date
    const periodicity = company.communicationPeriodicity || 14;
    company.nextCommunicationType = type;
    company.nextCommunicationDate = new Date(new Date(date).getTime() + periodicity * 24 * 60 * 60 * 1000);

    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
