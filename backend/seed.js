const mongoose = require('mongoose');
const Company = require('./models/Company');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected for seeding');

    // Add sample data
    await Company.create([
      {
        name: 'Company A',
        lastCommunications: [
          { type: 'Email', date: new Date('2023-12-10'), notes: 'Initial contact' },
        ],
        nextCommunicationType: 'Phone Call',
        nextCommunicationDate: new Date('2023-12-24'),
      },
      {
        name: 'Company B',
        lastCommunications: [
          { type: 'LinkedIn Post', date: new Date('2023-12-01'), notes: 'Shared update' },
        ],
        nextCommunicationType: 'LinkedIn Message',
        nextCommunicationDate: new Date('2023-12-15'),
      },
    ]);

    console.log('Data seeded successfully');
    mongoose.disconnect();
  })
  .catch((err) => console.error('Seeding error:', err));
