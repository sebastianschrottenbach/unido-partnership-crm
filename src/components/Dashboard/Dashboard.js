import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Box, Grid, Typography, Container, Paper, List, ListItem, ListItemText, 
  Divider, Button, Chip, FormControl, InputLabel, Select, MenuItem,
  ListItemAvatar, Avatar, Collapse, IconButton, Tooltip
} from '@mui/material';
import { 
  People, Business, AttachMoney, Description, WarningAmber, 
  Event, Public, ZoomIn, FilterList, Refresh,
  ExpandMore, ExpandLess, Dashboard as DashboardIcon, PieChart as PieChartIcon,
  BarChart as BarChartIcon, Info, Check, Warning,
  // Region specific icons
  LocationCity, Language, EmojiFlags, PublicOff, Park, 
  WbSunny, AcUnit, SouthAmerica, NorthEast
} from '@mui/icons-material';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartTooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import DashboardCard from './DashboardCard';
import { useData } from '../../contexts/DataContext';
import NetworkVisualization from './NetworkVisualization/NetworkVisualization';
import { partnershipData, sdgs } from '../../data/sampleData';

// Import utility functions
import { 
  enhanceLocalNetworkData, daysUntil,
  getContributionTypeData, getSDGAlignmentData, getRegionalDistributionData,
  getSectorDistributionData, filterPartners, calculateDashboardMetrics
} from './utils/dashboardUtils';
import {
  getSDGColor, getRegionColor, getChartColor, themeColors
} from './utils/colorUtils';

// Define region icons mapping for use across all components
const regionIcons = {
  'Europe': <LocationCity style={{ color: getRegionColor('Europe'), marginRight: 6 }} />,
  'Africa': <WbSunny style={{ color: getRegionColor('Africa'), marginRight: 6 }} />,
  'Asia': <Language style={{ color: getRegionColor('Asia'), marginRight: 6 }} />,
  'North America': <NorthEast style={{ color: getRegionColor('North America'), marginRight: 6 }} />,
  'Latin America': <SouthAmerica style={{ color: getRegionColor('Latin America'), marginRight: 6 }} />,
  'Middle East': <Park style={{ color: getRegionColor('Middle East'), marginRight: 6 }} />,
  'Oceania': <PublicOff style={{ color: getRegionColor('Oceania'), marginRight: 6 }} />,
  'Global': <EmojiFlags style={{ color: getRegionColor('Global') || themeColors.primary, marginRight: 6 }} />
};

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

// UNIDO Organizational Units component
const DivisionsPanel = ({ directorates, selectedDivision, setSelectedDivision }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Business sx={{ color: '#009cdc', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Partners per Organizational Units
          </Typography>
          <Tooltip title="Select an organizational unit to filter the dashboard data" arrow placement="right">
            <Info sx={{ ml: 1, fontSize: 18, color: '#999999' }} />
          </Tooltip>
        </Box>
        
        {/* Compact selection with chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Chip
            label={`All Units (${directorates.reduce((sum, dir) => sum + dir.partnerCount, 0)})`}
            onClick={() => setSelectedDivision('all')}
            color={selectedDivision === 'all' ? 'primary' : 'default'}
            variant={selectedDivision === 'all' ? 'filled' : 'outlined'}
            sx={{ fontWeight: selectedDivision === 'all' ? 600 : 400 }}
          />
          
          {directorates.map(directorate => (
            <Chip
              key={directorate.id}
              label={`${directorate.acronym} (${directorate.partnerCount})`}
              onClick={() => setSelectedDivision(directorate.id)}
              color={selectedDivision === directorate.id ? 'primary' : 'default'}
              variant={selectedDivision === directorate.id ? 'filled' : 'outlined'}
              sx={{ 
                fontWeight: selectedDivision === directorate.id ? 600 : 400,
                '&:hover': { bgcolor: selectedDivision === directorate.id ? '' : 'rgba(0, 156, 220, 0.1)' } 
              }}
            />
          ))}
        </Box>
        
        {/* Show the selected unit's full name */}
        {selectedDivision !== 'all' && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
            {directorates.find(d => d.id === selectedDivision)?.name || ''}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

// Key metrics row component
const KeyMetricsRow = ({ partners }) => {
  // Calculate metrics from the current filtered partners
  const dynamicMetrics = useMemo(() => {
    // Count total and active partners
    const total = partners.length;
    const active = partners.filter(p => p.status === 'Active' || !p.status).length;
    
    // Count projects and total budget
    let projectCount = 0;
    let projectBudget = 0;
    partners.forEach(partner => {
      if (partner.projects) {
        projectCount += partner.projects.length;
        partner.projects.forEach(project => {
          projectBudget += project.budget || 0;
        });
      }
    });
    
    // Calculate contributions
    let financialContribution = 0;
    let inKindContribution = 0;
    partners.forEach(partner => {
      if (partner.contributions) {
        partner.contributions.forEach(contribution => {
          if (contribution.type === 'Financial') {
            financialContribution += contribution.value || 0;
          } else if (contribution.type === 'In-kind') {
            inKindContribution += contribution.value || 0;
          }
        });
      }
    });
    
    // Count agreements
    let agreementCount = 0;
    let expiringAgreements = [];
    const nearFuture = new Date();
    nearFuture.setMonth(nearFuture.getMonth() + 3); // Agreements expiring in next 3 months
    
    partners.forEach(partner => {
      if (partner.agreements) {
        agreementCount += partner.agreements.length;
        partner.agreements.forEach(agreement => {
          if (agreement.expiryDate) {
            const expiryDate = new Date(agreement.expiryDate);
            if (expiryDate <= nearFuture && expiryDate >= new Date()) {
              expiringAgreements.push(agreement);
            }
          }
        });
      }
    });
    
    return {
      total,
      active,
      projects: {
        total: projectCount,
        totalBudget: projectBudget
      },
      contributions: {
        financial: financialContribution,
        inKind: inKindContribution
      },
      agreements: {
        total: agreementCount,
        expiring: expiringAgreements
      }
    };
  }, [partners]);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Partners" 
            value={`${dynamicMetrics.active} / ${dynamicMetrics.total}`}
            secondaryText="Active / Total"
            icon={<People fontSize="large" sx={{ color: '#009cdc' }} />}
            color="#009cdc" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Projects" 
            value={dynamicMetrics.projects.total}
            secondaryText={`$${(dynamicMetrics.projects.totalBudget / 1000000).toFixed(1)}M Budget`}
            icon={<Business fontSize="large" sx={{ color: '#f47a42' }} />}
            color="#f47a42" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Contributions" 
            value={`$${(dynamicMetrics.contributions.financial / 1000000).toFixed(1)}M`}
            secondaryText={`+ $${(dynamicMetrics.contributions.inKind / 1000000).toFixed(1)}M In-kind`}
            icon={<AttachMoney fontSize="large" sx={{ color: '#009cdc' }} />}
            color="#009cdc" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Agreements" 
            value={dynamicMetrics.agreements.total}
            secondaryText={`${dynamicMetrics.agreements.expiring.length} Expiring Soon`}
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
                <BarChart data={useMemo(() => {
                  // Map the numeric SDG IDs to their names
                  const sdgCounts = {};
                  filteredPartners.forEach(partner => {
                    if (partner.sdgAlignment && Array.isArray(partner.sdgAlignment)) {
                      partner.sdgAlignment.forEach(sdgId => {
                        const sdgName = `SDG ${sdgId}`;
                        sdgCounts[sdgName] = (sdgCounts[sdgName] || 0) + 1;
                      });
                    }
                  });
                  
                  return Object.keys(sdgCounts)
                    .map(sdgName => ({
                      sdg: sdgName,
                      count: sdgCounts[sdgName],
                      sdgNumber: parseInt(sdgName.replace('SDG ', ''), 10)
                    }))
                    .sort((a, b) => b.count - a.count);
                }, [filteredPartners])} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
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
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const regionName = data.name;
                        const regionCount = data.count;
                        const color = getRegionColor(regionName);
                        
                        return (
                          <Paper elevation={3} sx={{ 
                            p: 1.5, 
                            border: `1px solid ${color}`,
                            bgcolor: 'white'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {regionIcons[regionName]}
                              <Typography variant="subtitle2" sx={{ ml: 1, color, fontWeight: 'bold' }}>
                                {regionName}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              <span style={{ color: '#666' }}>Partners: </span>
                              <span style={{ color }}>{regionCount}</span>
                            </Typography>
                          </Paper>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    dataKey="count" 
                    name="Partnerships by SDG" 
                    radius={[4, 4, 0, 0]}
                  >
                    {useMemo(() => {
                      // Map the numeric SDG IDs to their names
                      const sdgCounts = {};
                      filteredPartners.forEach(partner => {
                        if (partner.sdgAlignment && Array.isArray(partner.sdgAlignment)) {
                          partner.sdgAlignment.forEach(sdgId => {
                            const sdgName = `SDG ${sdgId}`;
                            sdgCounts[sdgName] = (sdgCounts[sdgName] || 0) + 1;
                          });
                        }
                      });
                      
                      return Object.keys(sdgCounts)
                        .map(sdgName => ({
                          sdg: sdgName,
                          count: sdgCounts[sdgName],
                          sdgNumber: parseInt(sdgName.replace('SDG ', ''), 10)
                        }))
                        .sort((a, b) => b.count - a.count);
                    }, [filteredPartners]).map((entry, index) => (
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
                  data={useMemo(() => {
                    // Calculate contribution amounts by type
                    const types = { 'Financial': 0, 'In-kind': 0, 'Other': 0 };
                    
                    filteredPartners.forEach(partner => {
                      if (partner.contributions && Array.isArray(partner.contributions)) {
                        partner.contributions.forEach(contrib => {
                          if (contrib.type === 'Financial') {
                            types['Financial'] += (contrib.amount || 0);
                          } else if (contrib.type === 'In-kind') {
                            types['In-kind'] += (contrib.estimatedValue || 0);
                          } else {
                            types['Other'] += (contrib.estimatedValue || contrib.amount || 0);
                          }
                        });
                      }
                    });
                    
                    return Object.keys(types)
                      .filter(key => types[key] > 0) // Only include types with values
                      .map(key => ({ name: key, value: types[key] }));
                  }, [filteredPartners])}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={1}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {useMemo(() => {
                    // Calculate contribution amounts by type
                    const types = { 'Financial': 0, 'In-kind': 0, 'Other': 0 };
                    
                    filteredPartners.forEach(partner => {
                      if (partner.contributions && Array.isArray(partner.contributions)) {
                        partner.contributions.forEach(contrib => {
                          if (contrib.type === 'Financial') {
                            types['Financial'] += (contrib.amount || 0);
                          } else if (contrib.type === 'In-kind') {
                            types['In-kind'] += (contrib.estimatedValue || 0);
                          } else {
                            types['Other'] += (contrib.estimatedValue || contrib.amount || 0);
                          }
                        });
                      }
                    });
                    
                    return Object.keys(types)
                      .filter(key => types[key] > 0) // Only include types with values
                      .map(key => ({ name: key, value: types[key] }));
                  }, [filteredPartners]).map((entry, index) => (
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
            <PieChartIcon sx={{ color: themeColors.secondary, mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: themeColors.secondary }}>
              Partner Distribution
            </Typography>
          </Box>
          
          <Box sx={{ height: 300, pt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={useMemo(() => {
                    // Group partners by type
                    const typeCounts = {};
                    filteredPartners.forEach(partner => {
                      if (partner.type) {
                        typeCounts[partner.type] = (typeCounts[partner.type] || 0) + 1;
                      }
                    });
                    
                    return Object.keys(typeCounts)
                      .map(type => ({ name: type, value: typeCounts[type] }))
                      .sort((a, b) => b.value - a.value);
                  }, [filteredPartners])}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={1}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {useMemo(() => {
                    // Group partners by type
                    const typeCounts = {};
                    filteredPartners.forEach(partner => {
                      if (partner.type) {
                        typeCounts[partner.type] = (typeCounts[partner.type] || 0) + 1;
                      }
                    });
                    
                    return Object.keys(typeCounts)
                      .map(type => ({ name: type, value: typeCounts[type] }))
                      .sort((a, b) => b.value - a.value);
                  }, [filteredPartners]).map((entry, index) => {
                    // Partner type colors based on the theme
                    const partnerTypeColors = {
                      'Private Sector': themeColors.primary,        // Blue #009cdc
                      'Government': themeColors.secondary,        // Orange #f47a42
                      'NGO': '#4caf50',                          // Green
                      'Academic': '#9c27b0',                      // Purple
                      'International Organization': '#ff9800'     // Orange/Amber
                    };
                    
                    // Use the dedicated color for the partner type or fall back to chart colors
                    const color = partnerTypeColors[entry.name] || getChartColor(index);
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
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
          <Public sx={{ color: themeColors.primary, mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: themeColors.primary }}>
            Geographic Distribution
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ height: 400, px: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={useMemo(() => {
                    // Group partners by region
                    const regionCounts = {};
                    filteredPartners.forEach(partner => {
                      if (partner.region) {
                        regionCounts[partner.region] = (regionCounts[partner.region] || 0) + 1;
                      }
                    });
                    
                    return Object.keys(regionCounts)
                      .map(region => ({ name: region, count: regionCounts[region] }))
                      .sort((a, b) => b.count - a.count);
                  }, [filteredPartners])} 
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
                    axisLine={{ stroke: '#ddd' }}
                    tickLine={{ stroke: '#ddd' }}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const regionName = payload.value;
                      const regionIcon = regionIcons[regionName];
                      
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <foreignObject x="-40" y="-12" width="40" height="24">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                              {regionIcon}
                            </div>
                          </foreignObject>
                          <text x="-45" y="4" textAnchor="end" fill="#666" style={{ fontSize: '12px' }}>
                            {regionName}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <RechartTooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const regionName = data.name;
                        const regionCount = data.count;
                        const color = getRegionColor(regionName);
                        
                        return (
                          <Paper elevation={3} sx={{ 
                            p: 1.5, 
                            border: `1px solid ${color}`,
                            bgcolor: 'white'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {regionIcons[regionName]}
                              <Typography variant="subtitle2" sx={{ ml: 1, color, fontWeight: 'bold' }}>
                                {regionName}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              <span style={{ color: '#666' }}>Partners: </span>
                              <span style={{ color }}>{regionCount}</span>
                            </Typography>
                          </Paper>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    content={(props) => {
                      const { payload } = props;
                      
                      return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
                          {payload.map((entry, index) => {
                            const regionName = entry.payload.name;
                            const color = getRegionColor(regionName);
                            
                            return (
                              <Box key={`legend-${index}`} sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mx: 1.5, 
                                mb: 1,
                                p: 0.5,
                                border: `1px solid ${color}`,
                                borderRadius: 1,
                                bgcolor: `${color}10`
                              }}>
                                {regionIcons[regionName]}
                                <Typography variant="caption" sx={{ fontWeight: 500, color: color }}>
                                  {regionName}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      );
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    name="Partners by Region" 
                    fill={themeColors.primary}
                    radius={[0, 4, 4, 0]}
                    barSize={24}
                    label={{
                      position: 'right',
                      formatter: (value) => value,
                      fill: '#666',
                      fontWeight: 'bold'
                    }}
                  >
                    {useMemo(() => {
                      // Group partners by region
                      const regionCounts = {};
                      filteredPartners.forEach(partner => {
                        if (partner.region) {
                          regionCounts[partner.region] = (regionCounts[partner.region] || 0) + 1;
                        }
                      });
                      
                      return Object.keys(regionCounts)
                        .map(region => ({ name: region, count: regionCounts[region] }))
                        .sort((a, b) => b.count - a.count);
                    }, [filteredPartners]).map((entry, index) => (
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

// Partners List Section component
const PartnersListSection = ({ partners, selectedDivision, directorates, history, resetToSampleData }) => {
  // Get name of selected division/sector for display
  const sectionTitle = useMemo(() => {
    if (selectedDivision === 'all') {
      return 'All Partners';
    } else {
      const directorate = directorates.find(d => d.id === selectedDivision);
      return directorate ? `${directorate.name} Partners` : 'Partners';
    }
  }, [selectedDivision, directorates]);

  // Color for the section heading
  const sectionColor = useMemo(() => {
    if (selectedDivision === 'all') {
      return '#009cdc';
    } else {
      const directorate = directorates.find(d => d.id === selectedDivision);
      return directorate ? directorate.color : '#009cdc';
    }
  }, [selectedDivision, directorates]);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate visible partners (paginated)
  const visiblePartners = partners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ color: sectionColor, mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: sectionColor }}>
              {sectionTitle}
            </Typography>
            <Tooltip title="Partners associated with the selected division" arrow placement="right">
              <Info sx={{ ml: 1, fontSize: 18, color: '#999999' }} />
            </Tooltip>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<Refresh />}
            onClick={resetToSampleData}
            sx={{ bgcolor: '#009cdc', '&:hover': { bgcolor: '#0089c3' } }}
          >
            Refresh Partners
          </Button>
        </Box>


        
        {partners.length > 0 ? (
          <>
            <Box sx={{ overflowX: 'auto' }}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {visiblePartners.map((partner) => (
                  <React.Fragment key={partner.id}>
                    <ListItem 
                      alignItems="flex-start"
                      button
                      onClick={() => history.push(`/partners/${partner.id}`)}
                      sx={{ 
                        borderRadius: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        },
                        mb: 1
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: `${partner.type === 'Private Sector' ? '#009cdc' : 
                                        partner.type === 'Government' ? '#f47a42' : 
                                        partner.type === 'NGO' ? '#4caf50' : 
                                        partner.type === 'Academic' ? '#9c27b0' : 
                                        partner.type === 'UN Agency' ? '#ffeb3b' : '#ff9800'}` }}>
                          {partner.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="medium">
                            {partner.name}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2" component="span" color="text.primary">
                              {partner.type}
                            </Typography>
                            <Typography variant="body2" component="span" color="text.secondary" sx={{ display: 'block' }}>
                              {partner.region}, {partner.country} • Sector: {partner.sector}
                            </Typography>
                            {partner.sdgAlignment && partner.sdgAlignment.length > 0 && (
                              <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {partner.sdgAlignment.slice(0, 5).map((sdg, i) => (
                                  <Chip 
                                    key={i} 
                                    label={`SDG ${sdg}`} 
                                    size="small" 
                                    sx={{ 
                                      height: 22, 
                                      fontSize: 11,
                                      bgcolor: `${getSDGColor(sdg)}20`, 
                                      color: getSDGColor(sdg),
                                      '& .MuiChip-label': { px: 1 }
                                    }} 
                                  />
                                ))}
                                {partner.sdgAlignment.length > 5 && (
                                  <Chip 
                                    label={`+${partner.sdgAlignment.length - 5}`} 
                                    size="small" 
                                    sx={{ 
                                      height: 22, 
                                      fontSize: 11,
                                      bgcolor: '#eee', 
                                      '& .MuiChip-label': { px: 1 }
                                    }} 
                                  />
                                )}
                              </Box>
                            )}
                          </React.Fragment>
                        }
                      />
                      <Chip 
                        label={partner.status || 'Active'} 
                        size="small" 
                        color={(partner.status === 'Active' || !partner.status) ? 'success' : 'default'}
                        variant="outlined"
                        sx={{ ml: 1, alignSelf: 'flex-start', mt: 2 }}
                      />
                    </ListItem>
                    {visiblePartners.indexOf(partner) < visiblePartners.length - 1 && (
                      <Divider component="li" sx={{ my: 0.5 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
              <Button 
                disabled={page === 0} 
                onClick={() => handleChangePage(null, page - 1)}
                sx={{ mr: 1, color: sectionColor, borderColor: sectionColor }}
                variant="outlined"
                size="small"
              >
                Previous
              </Button>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                Page {page + 1} of {Math.ceil(partners.length / rowsPerPage)}
              </Typography>
              <Button 
                disabled={page >= Math.ceil(partners.length / rowsPerPage) - 1} 
                onClick={() => handleChangePage(null, page + 1)}
                sx={{ ml: 1, color: sectionColor, borderColor: sectionColor }}
                variant="outlined"
                size="small"
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Warning sx={{ color: '#999999', fontSize: 40, mb: 1 }} />
            <Typography variant="body1" color="#666666">
              No partners found for the selected division and filters
            </Typography>
          </Box>
        )}
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
  // Get partners data and resetToSampleData function from DataContext
  const { partners, resetToSampleData } = useData();
  const history = useHistory();
  
  // State for filters, tabs, and selected elements
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
  
  // Define the official UNIDO organizational units
  const directorates = useMemo(() => {
    // Create a mapping of sectors to official UNIDO units
    // and count partners for each unit
    const unitCounts = {};
    
    // Define the actual organizational units
    const unidoUnits = [
      { id: 'odg', name: 'Office of the Director General', acronym: 'ODG' },
      { id: 'glo', name: 'Directorate of Global Partnerships and External Relations', acronym: 'GLO' },
      { id: 'tcs', name: 'Technical Cooperation and Sustainable Industrial Development', acronym: 'TCS' },
      { id: 'iet', name: 'Directorate of SDG Innovation and Economic Transformation', acronym: 'IET' },
      { id: 'spp', name: 'Directorate of Strategic Planning, Programming and Policy', acronym: 'SPP' }
    ];
    
    // Initialize counts for each unit
    unidoUnits.forEach(unit => {
      unitCounts[unit.id] = 0;
    });
    
    // Map existing sectors to organizational units and count
    partners.forEach(partner => {
      if (partner.sector) {
        // Simple mapping - in a real app this would be more sophisticated
        let unitId;
        if (partner.sector.includes('Policy')) {
          unitId = 'spp';
        } else if (partner.sector.includes('Sustainable') || partner.sector.includes('Industrial')) {
          unitId = 'tcs';
        } else if (partner.sector.includes('Innovation') || partner.sector.includes('Economic')) {
          unitId = 'iet';
        } else if (partner.sector.includes('Global') || partner.sector.includes('External')) {
          unitId = 'glo';
        } else {
          unitId = 'odg'; // Default
        }
        
        unitCounts[unitId] += 1;
      }
    });
    
    // Create final directorate objects with correct names and counts
    return unidoUnits.map(unit => ({
      id: unit.id,
      name: unit.name,
      acronym: unit.acronym,
      color: '#009cdc',
      partnerCount: unitCounts[unit.id]
    }));
  }, [partners]);
  
  // Filter partners based on selected filters and division
  const filteredPartners = useMemo(() => {
    // Get base filtered partners by regular filters
    let filtered = filterPartners(partners || [], filters, [], directorates);
    
    // If a specific division/sector is selected, further filter the partners
    if (selectedDivision !== 'all') {
      // Find the sector name corresponding to the selected division id
      const selectedDirectorate = directorates.find(dir => dir.id === selectedDivision);
      if (selectedDirectorate) {
        // Filter partners by the sector name of the selected directorate
        filtered = filtered.filter(partner => partner.sector === selectedDirectorate.name);
      }
    }
    
    return filtered;
  }, [partners, filters, selectedDivision, directorates]);
  
  // Process network data for visualization - simplified version for sample data
  const networkData = useMemo(() => {
    // Process filtered partners into network nodes
    const partnerNodes = (filteredPartners || []).map(partner => ({
      id: partner.id,
      name: partner.name,
      type: partner.type,
      sector: partner.sector,
      region: partner.region,
      country: partner.country,
      contactPerson: partner.mainContactPerson,
      status: partner.status || 'Active',
      connections: partner.connections || [],
      nodeType: 'partner',
      sdgs: partner.sdgAlignment || []
    }));
    
    // Create more realistic UNIDO staff nodes for the network visualization
    const staffNodes = [];
    
    // Define a set of realistic UNIDO staff names by directorate
    const staffNames = {
      'odg': ['Maria Rodriguez', 'John Chen', 'Fatima Al-Zahra'],
      'iet': ['Aisha Mbeki', 'Carlos Fernandez', 'Michael Takahashi'],
      'tcs': ['Elena Petrov', 'Ahmed Hassan', 'Priya Singh'],
      'glo': ['David Kim', 'Sara Nguyen', 'Roberto Martinez'],
      'spp': ['Anna Kowalski', 'Li Wei', 'Nadia Ibrahim']
    };
    
    // Create staff nodes with realistic names based on directorate
    const staffMap = new Map();
    filteredPartners.forEach(partner => {
      if (partner.mainContactPerson && !staffMap.has(partner.mainContactPerson)) {
        // Map the partner sector to a directorate
        let directorate = 'glo';
        if (partner.sector === 'Directorate of SDG Innovation and Economic Transformation') {
          directorate = 'iet';
        } else if (partner.sector === 'Technical Cooperation and Sustainable Industrial Development') {
          directorate = 'tcs';
        } else if (partner.sector === 'Directorate of Strategic Planning, Programming and Policy') {
          directorate = 'spp';
        } else if (partner.sector === 'Office of the Director General') {
          directorate = 'odg';
        }
        
        // Get a staff name based on the staff ID and directorate
        const staffId = parseInt(partner.mainContactPerson.replace('staff_', '')) || 0;
        const nameIndex = staffId % (staffNames[directorate]?.length || 1);
        const staffName = staffNames[directorate]?.[nameIndex] || 'UNIDO Staff';
        
        staffMap.set(partner.mainContactPerson, {
          id: partner.mainContactPerson,
          name: staffName,
          nodeType: 'staff',
          directorate: directorate,
          division: directorate === 'odg' ? 'Office of the Director General' : `${directorate.toUpperCase()} Division`
        });
      }
    });
    staffMap.forEach(staff => staffNodes.push(staff));
    
    // Combine all nodes
    const nodes = [...partnerNodes, ...staffNodes];
    
    // Create links between partners and staff
    const links = [];
    partnerNodes.forEach(partner => {
      if (partner.contactPerson && staffMap.has(partner.contactPerson)) {
        links.push({
          source: partner.id,
          target: partner.contactPerson,
          type: 'contact-relationship',
          strength: 2
        });
      }
      
      // Add partner-to-partner connections if they exist
      if (partner.connections && Array.isArray(partner.connections)) {
        partner.connections.forEach(targetId => {
          if (filteredPartners.some(p => p.id === targetId)) {
            links.push({
              source: partner.id,
              target: targetId,
              type: 'partnership',
              strength: 1
            });
          }
        });
      }
    });
    
    return { nodes, links };
  }, [filteredPartners]);
  
  // Enhanced network data with colors and additional properties
  const enhancedNetworkData = useMemo(() => {
    return enhanceLocalNetworkData(networkData);
  }, [networkData]);
  
  
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
      <KeyMetricsRow partners={filteredPartners} />
      
      {/* Partners List Section - Shows partners based on filters */}
      <PartnersListSection 
        partners={filteredPartners} 
        selectedDivision={selectedDivision}
        directorates={directorates}
        history={history}
        resetToSampleData={resetToSampleData}
      />
      
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