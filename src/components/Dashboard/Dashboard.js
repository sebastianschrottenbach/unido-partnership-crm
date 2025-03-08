import React, { useMemo } from 'react';
import { 
  Box, Grid, Typography, Container, Paper, List, ListItem, ListItemText, Divider, Button, Chip 
} from '@mui/material';
import {
  People, Business, Public, AssignmentTurnedIn, Notifications, Timeline,
  AccessTime, ArrowForward, Event
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import { PieChartComponent, BarChartComponent } from './PartnershipChart';
import { useData } from '../../contexts/DataContext';

const Dashboard = () => {
  const { partners } = useData();
  const navigate = useNavigate();

  // Calculate metrics for dashboard
  const metrics = useMemo(() => {
    const active = partners.filter(p => p.status === 'Active').length;
    const planning = partners.filter(p => p.status === 'Planning').length;
    const onHold = partners.filter(p => p.status === 'On Hold').length;
    const inactive = partners.filter(p => p.status === 'Inactive').length;

    const byType = Object.entries(
      partners.reduce((acc, partner) => {
        acc[partner.type] = (acc[partner.type] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));
    
    const byRegion = Object.entries(
      partners.reduce((acc, partner) => {
        acc[partner.region] = (acc[partner.region] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));
    
    const bySector = Object.entries(
      partners.reduce((acc, partner) => {
        acc[partner.sector] = (acc[partner.sector] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    // Count SDG references
    const sdgCounts = partners.reduce((acc, partner) => {
      if (partner.sdgAlignment) {
        partner.sdgAlignment.forEach(sdg => {
          acc[`SDG ${sdg}`] = (acc[`SDG ${sdg}`] || 0) + 1;
        });
      }
      return acc;
    }, {});

    const bySDG = Object.entries(sdgCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 SDGs

    // Get recent activities
    const recentActivities = partners
      .flatMap(partner => 
        partner.engagements?.map(engagement => ({
          ...engagement,
          partnerName: partner.name
        })) || []
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return { 
      active, planning, onHold, inactive,
      total: partners.length, 
      byType, byRegion, bySector, bySDG,
      recentActivities
    };
  }, [partners]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Partnership Dashboard
      </Typography>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              fullWidth
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/partners/new')}
            >
              Add Partner
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              fullWidth
              variant="outlined"
              startIcon={<Event />}
              onClick={() => navigate('/activities')}
            >
              Schedule Meeting
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              fullWidth
              variant="outlined"
              startIcon={<Notifications />}
              onClick={() => navigate('/follow-ups')}
            >
              View Follow-ups
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              fullWidth
              variant="outlined"
              startIcon={<Timeline />}
              onClick={() => navigate('/reports')}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Total Partners" 
            value={metrics.total} 
            icon={<People fontSize="large" />}
            color="#009cdc"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Active Partners" 
            value={metrics.active} 
            icon={<AssignmentTurnedIn fontSize="large" />}
            color="#f47a42"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Planning" 
            value={metrics.planning} 
            icon={<AccessTime fontSize="large" />}
            color="#009cdc"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="On Hold" 
            value={metrics.onHold} 
            icon={<Notifications fontSize="large" />}
            color="#f47a42"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <PieChartComponent 
            data={metrics.byType} 
            dataKey="value" 
            nameKey="name"
            title="Partners by Type" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChartComponent 
            data={metrics.byRegion} 
            dataKey="value" 
            nameKey="name"
            title="Partners by Region" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChartComponent 
            data={metrics.bySector} 
            dataKey="value" 
            nameKey="name"
            title="Partners by Sector" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChartComponent 
            data={metrics.bySDG} 
            xAxisKey="name"
            dataKey="count" 
            title="Top SDG Alignments" 
          />
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Recent Activities</Typography>
              <Button 
                endIcon={<ArrowForward />}
                onClick={() => navigate('/activities')}
              >
                View All
              </Button>
            </Box>
            <List>
              {metrics.recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={activity.type}
                      secondary={`${activity.partnerName} - ${new Date(activity.date).toLocaleDateString()}`}
                    />
                  </ListItem>
                  {index < metrics.recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
