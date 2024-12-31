const mongoose = require('mongoose');

const CommunicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  linkedInProfile: { type: String },
  emails: [{ type: String }],
  phoneNumbers: [{ type: String }],
  comments: { type: String },
  communicationPeriodicity: { type: Number, default: 14 }, // In days
  lastCommunications: [CommunicationSchema],
  nextCommunicationType: { type: String },
  nextCommunicationDate: { type: Date },
});

module.exports = mongoose.model('Company', CompanySchema);
