import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getCompanies } from "../../services/api";

const CalendarView = () => {
  const [communications, setCommunications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyCommunications, setDailyCommunications] = useState([]);

  useEffect(() => {
    fetchCommunications();
  }, []);

  const fetchCommunications = async () => {
    const response = await getCompanies();
    const data = response.data.flatMap((company) => {
      // Extract last communications
      const lastCommunications = company.lastCommunications.map((comm) => {
        const parsedDate = new Date(comm.date); // Parse date directly
        return {
          date: parsedDate,
          type: comm.type || "Not Available",
          notes: comm.notes || "No notes available",
        };
      });

      // Extract next communication details
      const nextCommDate = company.nextCommunicationDate
        ? new Date(company.nextCommunicationDate)
        : null;
      const nextCommType = company.nextCommunicationType || "Scheduled";

      return lastCommunications.map((lastComm) => ({
        lastDate: lastComm.date,
        lastType: lastComm.type,
        nextDate: nextCommDate,
        nextType: nextCommType,
        company: company.name,
        notes: lastComm.notes,
      }));
    });

    setCommunications(data);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const normalizedSelectedDate = new Date(date.setHours(0, 0, 0, 0));
    const filtered = communications.filter((comm) => {
      const normalizedCommDate = comm.nextDate
        ? new Date(comm.nextDate.setHours(0, 0, 0, 0))
        : null;
      return (
        normalizedCommDate &&
        normalizedCommDate.toDateString() === normalizedSelectedDate.toDateString()
      );
    });
    setDailyCommunications(filtered);
  };

  const tileContent = ({ date }) => {
    const normalizedDate = new Date(date.setHours(0, 0, 0, 0));
    const comms = communications.filter((comm) => {
      const normalizedCommDate = comm.nextDate
        ? new Date(comm.nextDate.setHours(0, 0, 0, 0))
        : null;
      return (
        normalizedCommDate &&
        normalizedCommDate.toDateString() === normalizedDate.toDateString()
      );
    });
    if (comms.length > 0) {
      return (
        <div
          style={{
            backgroundColor: "#3f51b5",
            borderRadius: "50%",
            color: "white",
            padding: "5px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "20px",
            height: "20px",
            fontSize: "12px",
          }}
        >
          {comms.length}
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#3f51b5" }}
      >
        Communication Calendar
      </Typography>

      <Box sx={{ maxWidth: 600, margin: "auto", mb: 4, paddingLeft: 30 }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Communications on {selectedDate.toDateString()}
        </Typography>

        {dailyCommunications.length > 0 ? (
          dailyCommunications.map((comm, index) => (
            <Card key={index} sx={{ marginBottom: 2, padding: 2, boxShadow: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">{comm.company}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Last Communication:</strong></Typography>
                  <Typography><strong>Type:</strong> {comm.lastType}</Typography>
                  <Typography>
                    <strong>Date:</strong> {comm.lastDate ? comm.lastDate.toDateString() : "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Next Communication:</strong></Typography>
                  <Typography><strong>Type:</strong> {comm.nextType}</Typography>
                  <Typography>
                    <strong>Date:</strong> {comm.nextDate ? comm.nextDate.toDateString() : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No communications on this date.
          </Typography>
        )}

        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button variant="contained" color="primary" sx={{ borderRadius: 20 }}>
            View More Communications
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarView;
