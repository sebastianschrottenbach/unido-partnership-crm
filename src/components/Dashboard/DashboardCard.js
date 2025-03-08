import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ minWidth: 200, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box sx={{ color, mr: 2 }}>{icon}</Box>
          <Box>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
