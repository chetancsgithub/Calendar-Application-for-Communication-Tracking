import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from '../../services/api';
import CommunicationActionModal from './CommunicationActionModal';
import Notifications from './Notifications';

const Dashboard = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await getCompanies();
    setCompanies(response.data);
  };

  const handleSelectCompany = (name) => {
    setSelectedCompanies([name]); // Only keep the newly selected company
  };

  const highlightClass = (nextDate) => {
    const today = new Date();
    const date = new Date(nextDate);
    if (date < today) return 'highlight-red';
    if (date.toDateString() === today.toDateString()) return 'highlight-yellow';
    return '';
  };

  return (
    <Box>
      <Notifications />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Last Five Communications</TableCell>
            <TableCell>Next Scheduled Communication</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow
              key={company.name}
              className={`${highlightClass(company.nextCommunicationDate)} ${
                selectedCompanies.includes(company.name) ? 'selected-row' : ''
              }`}
            >
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {company.lastCommunications.map((comm) => (
                  <Tooltip title={comm.notes} key={comm.date}>
                    <span>
                      {comm.type} ({new Date(comm.date).toLocaleDateString()})
                    </span>
                  </Tooltip>
                ))}
              </TableCell>
              <TableCell>
                {company.nextCommunicationType} (
                {new Date(company.nextCommunicationDate).toLocaleDateString()})
              </TableCell>
              <TableCell>
                <Button
                  variant={selectedCompanies.includes(company.name) ? 'contained' : 'outlined'}
                  onClick={() => handleSelectCompany(company.name)}
                >
                  {selectedCompanies.includes(company.name) ? 'Selected' : 'Select'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        disabled={selectedCompanies.length === 0}
      >
        Communication Performed
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/calendar')}
        style={{ marginLeft: '10px' }}
      >
        Calendar
      </Button>
      <CommunicationActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedCompanies={selectedCompanies}
        refreshCompanies={fetchCompanies}
      />
    </Box>
  );
};

export default Dashboard;
