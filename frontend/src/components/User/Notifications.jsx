import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getOverdueCommunications, getTodaysCommunications } from '../../services/api';

const Notifications = () => {
  const [overdueCount, setOverdueCount] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const overdue = await getOverdueCommunications();
    const today = await getTodaysCommunications();
    setOverdueCount(overdue.data.length);
    setDueTodayCount(today.data.length);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
      <Card
        sx={{
          width: 200,
          textAlign: 'center',
          backgroundColor: '#ffe5e5',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" color="error" fontWeight="bold">
            {overdueCount}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Overdue Communications
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 200,
          textAlign: 'center',
          backgroundColor: '#e3f2fd',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" color="primary" fontWeight="bold">
            {dueTodayCount}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Due Today
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Notifications;
