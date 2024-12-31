const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Get overdue communications
router.get('/overdue', async (req, res) => {
  try {
    const today = new Date();
    const overdueCompanies = await Company.find({ nextCommunicationDate: { $lt: today } });
    res.json(overdueCompanies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get today's communications
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysCompanies = await Company.find({
      nextCommunicationDate: { $gte: today, $lt: tomorrow },
    });
    res.json(todaysCompanies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;