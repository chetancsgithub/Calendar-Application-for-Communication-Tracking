const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const CommunicationMethod = require('../models/CommunicationMethod');

// --- Company Routes ---

// Get all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new company
router.post('/companies', async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a company
router.put('/companies/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a company
router.delete('/companies/:id', async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Communication Method Routes ---

// Get all communication methods
router.get('/communication-methods', async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort({ sequence: 1 });
    res.json(methods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new communication method
router.post('/communication-methods', async (req, res) => {
  try {
    const newMethod = new CommunicationMethod(req.body);
    const savedMethod = await newMethod.save();
    res.status(201).json(savedMethod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a communication method
router.put('/communication-methods/:id', async (req, res) => {
  try {
    const updatedMethod = await CommunicationMethod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedMethod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a communication method
router.delete('/communication-methods/:id', async (req, res) => {
  try {
    await CommunicationMethod.findByIdAndDelete(req.params.id);
    res.json({ message: 'Communication method deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
