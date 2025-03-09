import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Box, Grid, Typography, Container, Paper, List, ListItem, ListItemText, 
  Divider, Button, Chip, Tabs, Tab, FormControl, InputLabel, Select, MenuItem,
  CircularProgress, ListItemAvatar, Avatar, AppBar, Collapse, IconButton, Tooltip
} from '@mui/material';
import { 
  People, Business, AttachMoney, Description, WarningAmber, 
  Event, Category, Public, ZoomIn, ZoomOut, FilterList,
  ExpandMore, ExpandLess, Dashboard as DashboardIcon, PieChart as PieChartIcon,
  BarChart as BarChartIcon, Info, Check, Warning
} from '@mui/icons-material';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartTooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import DashboardCard from './DashboardCard';
import { useData } from '../../contexts/DataContext';
import NetworkVisualization from './NetworkVisualization/NetworkVisualization';
import { enhanceNetworkData } from './NetworkVisualization/networkUtils';
import unidoStaff from '../../data/unidoStaff';
import OrganizationalHierarchy from './OrganizationalHierarchy/OrganizationalHierarchy';
import { sdgs } from '../../data/sampleData';

// Import utility functions
import { 
  processNetworkData, enhanceLocalNetworkData, daysUntil,
  calculateTotalContributions, calculateActiveProjects, getUniqueCountries,
  getContributionTypeData, getSDGAlignmentData, getRegionalDistributionData,
  getSectorDistributionData, filterPartners, calculateDashboardMetrics
} from './utils/dashboardUtils';
import {
  typeColors, nodeTypeColors, statusColors, regionColors, chartColors,
  getSDGColor, getRegionColor, getPartnerTypeColor, getStatusColor, getChartColor
} from './utils/colorUtils';

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

// Dashboard Header component
const DashboardHeader = ({ filters, onFilterChange, resetFilters, history }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <DashboardIcon sx={{ color: '#009cdc', mr: 2, fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#009cdc' }}>
            UNIDO Partnership Intelligence Hub
          </Typography>
        </Box>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select 
                value={filters.year} 
                onChange={(e) => onFilterChange('year', e.target.value)}
                label="Year"
              >
                <MenuItem value="all">All Years</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Region</InputLabel>
              <Select 
                value={filters.region} 
                onChange={(e) => onFilterChange('region', e.target.value)}
                label="Region"
              >
                <MenuItem value="all">All Regions</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Latin America">Latin America</MenuItem>
                <MenuItem value="Middle East">Middle East</MenuItem>
                <MenuItem value="North America">North America</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Partner Type</InputLabel>
              <Select 
                value={filters.partnerType} 
                onChange={(e) => onFilterChange('partnerType', e.target.value)}
                label="Partner Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Private Sector">Private Sector</MenuItem>
                <MenuItem value="Government">Government</MenuItem>
                <MenuItem value="NGO">NGO</MenuItem>
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="UN Agency">UN Agency</MenuItem>
                <MenuItem value="International Organization">International Organization</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select 
                value={filters.status} 
                onChange={(e) => onFilterChange('status', e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item>
            <Button 
              variant="outlined" 
              size="medium" 
              onClick={resetFilters}
              startIcon={<FilterList />}
              sx={{ 
                borderColor: '#009cdc',
                color: '#009cdc',
                '&:hover': {
                  backgroundColor: 'rgba(0, 156, 220, 0.1)',
                  borderColor: '#009cdc',
                }
              }}
            >
              Reset
            </Button>
          </Grid>
          
          <Grid item sx={{ marginLeft: 'auto' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => history.push('/partners')}
              startIcon={<ZoomIn />}
              sx={{ 
                backgroundColor: '#009cdc',
                '&:hover': {
                  backgroundColor: '#0089c3', // Slightly darker
                },
                boxShadow: '0 2px 8px rgba(0, 156, 220, 0.3)',
              }}
            >
              View All Partners
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// UNIDO Division Intelligence Panel component
const DivisionsPanel = ({ directorates, selectedDivision, setSelectedDivision }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Business sx={{ color: '#009cdc', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            UNIDO Divisions
          </Typography>
          <Tooltip title="Select a division to filter the dashboard data" arrow placement="right">
            <Info sx={{ ml: 1, fontSize: 18, color: '#999999' }} />
          </Tooltip>
        </Box>
        
        <Grid container spacing={2}>
          {/* "All Divisions" card */}
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Paper 
              elevation={selectedDivision === 'all' ? 3 : 1}
              sx={{ 
                p: 2, 
                cursor: 'pointer', 
                bgcolor: selectedDivision === 'all' ? 'rgba(0, 156, 220, 0.1)' : '#ffffff',
                color: 'inherit',
                borderLeft: '4px solid #009cdc',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                  transform: selectedDivision === 'all' ? 'none' : 'translateY(-2px)',
                }
              }}
              onClick={() => setSelectedDivision('all')}
            >
              <Typography variant="subtitle1" fontWeight="bold">All Divisions</Typography>
              <Box>
                <Typography variant="h5" color="#009cdc" fontWeight="medium">
                  {directorates.reduce((sum, dir) => sum + dir.partnerCount, 0)}
                </Typography>
                <Typography variant="body2" color="#666666">Partners</Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Division cards - generated dynamically */}
          {directorates.map(directorate => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={directorate.id}>
              <Paper 
                elevation={selectedDivision === directorate.id ? 3 : 1}
                sx={{ 
                  p: 2, 
                  cursor: 'pointer', 
                  bgcolor: selectedDivision === directorate.id ? `${directorate.color}10` : '#ffffff',
                  borderLeft: `4px solid ${directorate.color}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                    transform: selectedDivision === directorate.id ? 'none' : 'translateY(-2px)',
                  }
                }}
                onClick={() => setSelectedDivision(directorate.id)}
              >
                <Typography variant="subtitle1" fontWeight="bold">{directorate.name}</Typography>
                <Box>
                  <Typography variant="h5" color={directorate.color} fontWeight="medium">
                    {directorate.partnerCount}
                  </Typography>
                  <Typography variant="body2" color="#666666">Partners</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

// Key metrics row component
const KeyMetricsRow = ({ metrics }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Partners" 
            value={`${metrics.active} / ${metrics.total}`}
            secondaryText="Active / Total"
            icon={<People fontSize="large" sx={{ color: '#009cdc' }} />}
            color="#009cdc" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Projects" 
            value={metrics.projects.total}
            secondaryText={`$${(metrics.projects.totalBudget / 1000000).toFixed(1)}M Budget`}
            icon={<Business fontSize="large" sx={{ color: '#f47a42' }} />}
            color="#f47a42" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Contributions" 
            value={`$${(metrics.contributions.financial / 1000000).toFixed(1)}M`}
            secondaryText={`+ $${(metrics.contributions.inKind / 1000000).toFixed(1)}M In-kind`}
            icon={<AttachMoney fontSize="large" sx={{ color: '#009cdc' }} />}
            color="#009cdc" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Agreements" 
            value={metrics.agreements.total}
            secondaryText={`${metrics.agreements.expiring.length} Expiring Soon`}
            icon={<Description fontSize="large" sx={{ color: '#f47a42' }} />}
            color="#f47a42" 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Strategic Impact Section component
const StrategicImpactSection = ({ filteredPartners }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BarChartIcon sx={{ color: '#009cdc', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Strategic Impact
          </Typography>
          <Tooltip title="Shows how partnerships align with UN Sustainable Development Goals" arrow placement="right">
            <Info sx={{ ml: 1, fontSize: 18, color: '#999999' }} />
          </Tooltip>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ height: 300, px: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getSDGAlignmentData(filteredPartners)} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis 
                    dataKey="sdg" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={{ stroke: '#ddd' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => value} 
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={{ stroke: '#ddd' }}
                  />
                  <RechartTooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: 'none'
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    dataKey="count" 
                    name="Partnerships by SDG" 
                    radius={[4, 4, 0, 0]}
                  >
                    {getSDGAlignmentData(filteredPartners).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getSDGColor(entry.sdg)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Financial & Partner Distribution Section
const DistributionSection = ({ filteredPartners }) => {
  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {/* Left Column - Financial Contributions */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AttachMoney sx={{ color: '#009cdc', mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Financial Contributions
            </Typography>
          </Box>
          
          <Box sx={{ height: 300, pt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getContributionTypeData(filteredPartners)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={1}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {getContributionTypeData(filteredPartners).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                  ))}
                </Pie>
                <RechartTooltip 
                  formatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    border: 'none'
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
      
      {/* Right Column - Partner Distribution */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PieChartIcon sx={{ color: '#f47a42', mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Partner Distribution
            </Typography>
          </Box>
          
          <Box sx={{ height: 300, pt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getSectorDistributionData(filteredPartners)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={1}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {getSectorDistributionData(filteredPartners).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getChartColor(index + 3)} />
                  ))}
                </Pie>
                <RechartTooltip 
                  contentStyle={{ 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    border: 'none'
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Geographic Distribution Section
const GeographicSection = ({ filteredPartners }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Public sx={{ color: '#009cdc', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Geographic Distribution
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ height: 400, px: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={getRegionalDistributionData(filteredPartners)} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
                  <XAxis 
                    type="number"
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={{ stroke: '#ddd' }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={{ stroke: '#ddd' }}
                  />
                  <RechartTooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: 'none'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Partners by Region" 
                    fill="#009cdc"
                    radius={[0, 4, 4, 0]}
                    barSize={24}
                  >
                    {getRegionalDistributionData(filteredPartners).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRegionColor(entry.name)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Action Intelligence Section component
const ActionIntelligenceSection = ({ metrics, history }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <WarningAmber sx={{ color: '#f47a42', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Action Items
          </Typography>
          <Tooltip title="Items that require attention in the near future" arrow placement="right">
            <Info sx={{ ml: 1, fontSize: 18, color: '#999999' }} />
          </Tooltip>
        </Box>
        
        <Grid container spacing={3}>
          {/* Expiring Agreements */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#f5f7fa', borderRadius: '8px' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                <Description sx={{ mr: 1, color: '#f47a42' }} />
                Expiring Agreements
              </Typography>
              
              <List disablePadding sx={{ maxHeight: 280, overflow: 'auto' }}>
                {metrics.agreements.expiring.length > 0 ? (
                  metrics.agreements.expiring.map((agreement, index) => (
                    <React.Fragment key={agreement.id || index}>
                      <ListItem 
                        button 
                        onClick={() => history.push(`/partners/${agreement.partnerId}`)}
                        sx={{ 
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'rgba(244, 122, 66, 0.15)', color: '#f47a42' }}>
                            <Description />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={agreement.type} 
                          secondary={
                            <React.Fragment>
                              <Typography variant="body2" component="span">
                                {agreement.partnerName}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                component="span" 
                                color="error" 
                                sx={{ display: 'block' }}
                              >
                                Expires in {daysUntil(agreement.endDate)} days
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <Chip 
                          label={daysUntil(agreement.endDate) <= 30 ? "Urgent" : "Soon"} 
                          size="small" 
                          color={daysUntil(agreement.endDate) <= 30 ? "error" : "warning"}
                          sx={{ ml: 1 }}
                        />
                      </ListItem>
                      {index < metrics.agreements.expiring.length - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Check sx={{ color: '#4caf50', fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" color="#666666">
                      No agreements expiring soon
                    </Typography>
                  </Box>
                )}
              </List>
            </Paper>
          </Grid>
          
          {/* Upcoming Activities */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#f5f7fa', borderRadius: '8px' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                <Event sx={{ mr: 1, color: '#009cdc' }} />
                Upcoming Activities
              </Typography>
              
              <List disablePadding sx={{ maxHeight: 280, overflow: 'auto' }}>
                {metrics.upcomingActivities.length > 0 ? (
                  metrics.upcomingActivities.map((activity, index) => (
                    <React.Fragment key={activity.id || index}>
                      <ListItem 
                        button 
                        onClick={() => history.push(`/partners/${activity.partnerId}`)}
                        sx={{ 
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'rgba(0, 156, 220, 0.15)', color: '#009cdc' }}>
                            <Event />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={activity.type} 
                          secondary={
                            <React.Fragment>
                              <Typography variant="body2" component="span">
                                {activity.partnerName}
                              </Typography>
                              <Typography variant="body2" component="span" color="#666666" sx={{ display: 'block' }}>
                                {activity.description || 'No description available'}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <Chip 
                          label={activity.date} 
                          size="small" 
                          color="primary"
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </ListItem>
                      {index < metrics.upcomingActivities.length - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Warning sx={{ color: '#999999', fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" color="#666666">
                      No upcoming activities scheduled
                    </Typography>
                  </Box>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Partnership Network Visualization Section component
const NetworkSection = ({ enhancedNetworkData, handleNodeClick, selectedNode, history }) => {
  const [networkExpanded, setNetworkExpanded] = useState(false);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setNetworkExpanded(!networkExpanded)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ color: '#009cdc', mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Partnership Network Visualization
            </Typography>
          </Box>
          <Button 
            variant="text" 
            endIcon={networkExpanded ? <ExpandLess /> : <ExpandMore />}
            sx={{ color: '#009cdc' }}
          >
            {networkExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </Box>
        
        <Collapse in={networkExpanded} timeout="auto">
          <Box sx={{ height: 500, mt: 3, position: 'relative' }}>
            <NetworkVisualization 
              data={enhancedNetworkData} 
              onNodeClick={handleNodeClick} 
              zoomable={true} 
            />
            
            {/* Node details panel - appears when a node is clicked */}
            {selectedNode && (
              <Paper 
                elevation={3} 
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  width: 300, 
                  p: 2, 
                  zIndex: 100, 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">{selectedNode.name}</Typography>
                  <IconButton size="small" onClick={() => handleNodeClick(null)}>
                    <ExpandLess />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" gutterBottom>
                  <strong>Type:</strong> {selectedNode.type}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Sector:</strong> {selectedNode.sector}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Region:</strong> {selectedNode.region}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Status:</strong> {selectedNode.status}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Projects:</strong> {selectedNode.projects || 0}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Contributions:</strong> ${selectedNode.contributions ? selectedNode.contributions.toLocaleString() : 0}
                </Typography>
                {selectedNode.sdgs && selectedNode.sdgs.length > 0 && (
                  <>
                    <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
                      <strong>SDGs:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedNode.sdgs.map(sdg => (
                        <Chip 
                          key={sdg} 
                          label={`SDG ${sdg}`} 
                          size="small" 
                          sx={{ mb: 0.5, bgcolor: `${getSDGColor(sdg)}20`, color: getSDGColor(sdg) }}
                        />
                      ))}
                    </Box>
                  </>
                )}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    fullWidth
                    onClick={() => history.push(`/partners/${selectedNode.id}`)}
                    sx={{ 
                      bgcolor: '#009cdc',
                      '&:hover': {
                        bgcolor: '#0089c3' // Slightly darker
                      }
                    }}
                  >
                    View Full Profile
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const { partners, unidoStaff } = useData();
  const history = useHistory();
  
  // State for filters, tabs, and selected elements
  const [mainTabValue, setMainTabValue] = useState(0);
  const [analysisTabValue, setAnalysisTabValue] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Network filters state
  const [filters, setFilters] = useState({
    year: 'all',
    region: 'all',
    partnerType: 'all',
    status: 'all',
    sdg: 'all',
    directorate: 'all'
  });
  
  // State for selected division
  const [selectedDivision, setSelectedDivision] = useState('all');
  
  // Calculate dashboard metrics using the imported utility function
  const metrics = useMemo(() => {
    return calculateDashboardMetrics(partners || []);
  }, [partners]);
  
  // Sample directorates data (replace with actual data)
  const directorates = useMemo(() => [
    { id: 'dir1', name: 'External Relations', color: '#009cdc', partnerCount: 58 },
    { id: 'dir2', name: 'Policy & Programme', color: '#f47a42', partnerCount: 42 },
    { id: 'dir3', name: 'Technical Cooperation', color: '#4caf50', partnerCount: 67 },
    { id: 'dir4', name: 'Digitalization', color: '#9c27b0', partnerCount: 35 },
    { id: 'dir5', name: 'Finance', color: '#ff9800', partnerCount: 29 },
    { id: 'dir6', name: 'Human Resources', color: '#e91e63', partnerCount: 12 }
  ], []);
  
  // Filter partners based on selected filters and division
  const filteredPartners = useMemo(() => {
    const divisionFilter = selectedDivision !== 'all' 
      ? { ...filters, directorate: selectedDivision } 
      : filters;
    
    return filterPartners(partners || [], divisionFilter, unidoStaff || []);
  }, [partners, filters, unidoStaff, selectedDivision]);
  
  // Process network data for visualization
  const networkData = useMemo(() => {
    // First create partner nodes from filtered partners
    const partnerNodes = (filteredPartners || []).map(partner => ({
      id: partner.id,
      name: partner.name,
      type: partner.type,
      sector: partner.sector,
      region: partner.region,
      country: partner.country,
      contactPerson: partner.mainContactPerson || partner.contactPerson,
      status: partner.status || 'Active',
      connections: partner.connections || [],
      nodeType: 'partner',
      sdgs: partner.sdgs || []
    }));
    
    // Create a set of staff IDs that are actually used as contacts
    const usedStaffIds = new Set(partnerNodes.map(node => node.contactPerson).filter(Boolean));
    
    // Add UNIDO staff nodes for those who are contacts for partners
    const staffNodes = (unidoStaff || [])
      .filter(staff => usedStaffIds.has(staff.id) && staff.unit) // Make sure staff has a unit
      .map(staff => ({
        id: staff.id,
        name: staff.name,
        title: staff.title || '',
        email: staff.email || '',
        nodeType: 'staff',
        directorate: staff.unit?.directorate || 'Unknown',
        division: staff.unit?.division || 'Unknown',
        location: staff.location || ''
      }));
    
    // Combine all nodes
    const nodes = [...partnerNodes, ...staffNodes];
    
    // Create links between partners and their UNIDO contacts
    const links = [];
    
    // Create a Set of all node IDs for quick lookup
    const nodeIds = new Set(nodes.map(node => node.id));
    
    // Only create links if both the source and target nodes exist
    partnerNodes.forEach(partner => {
      if (partner.contactPerson && nodeIds.has(partner.contactPerson)) {
        links.push({
          source: partner.id,
          target: partner.contactPerson,
          type: 'contact-relationship',
          strength: 2 // Strong connection between partner and primary contact
        });
      }
    });
    
    return { nodes, links };
  }, [filteredPartners, unidoStaff]);
  
  // Enhanced network data with colors and additional properties
  const enhancedNetworkData = useMemo(() => {
    return enhanceLocalNetworkData(networkData);
  }, [networkData]);
  
  // Handle main tab change
  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
  };

  // Handle analysis tab change
  const handleAnalysisTabChange = (event, newValue) => {
    setAnalysisTabValue(newValue);
  };
  
  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      year: 'all',
      region: 'all',
      partnerType: 'all',
      status: 'all',
      sdg: 'all',
      directorate: 'all'
    });
    setSelectedDivision('all');
  };
  
  // Handle node click in the network visualization
  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
  }, []);
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, bgcolor: '#f5f7fa' }}>
      {/* Dashboard Header with Filters */}
      <DashboardHeader 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        resetFilters={resetFilters} 
        history={history} 
      />
      
      {/* Top Metrics Cards */}
      <KeyMetricsRow metrics={metrics} />
      
      {/* UNIDO Division Intelligence Panel */}
      <DivisionsPanel 
        directorates={directorates} 
        selectedDivision={selectedDivision} 
        setSelectedDivision={setSelectedDivision} 
      />
      
      {/* Strategic Impact Section */}
      <StrategicImpactSection filteredPartners={filteredPartners} />
      
      {/* Financial & Partner Distribution Section */}
      <DistributionSection filteredPartners={filteredPartners} />
      
      {/* Geographic Distribution Section */}
      <GeographicSection filteredPartners={filteredPartners} />
      
      {/* Action Intelligence Section */}
      <ActionIntelligenceSection metrics={metrics} history={history} />
      
      {/* Partnership Network Visualization (Collapsible) */}
      <NetworkSection 
        enhancedNetworkData={enhancedNetworkData} 
        handleNodeClick={handleNodeClick} 
        selectedNode={selectedNode}
        history={history}
      />
    </Container>
  );
};

export default Dashboard;