import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Typography, Paper, Divider, List, ListItem, 
  ListItemText, ListItemIcon, Collapse, Chip,
  Badge, Tooltip, Button
} from '@mui/material';
import { 
  ExpandMore, ExpandLess, Business, Person, 
  AccountTree, Folder, FolderOpen, ArrowForward
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useData } from '../../../contexts/DataContext';
import unidoOrganization from '../../../data/unidoOrganization';
import { getStaffById } from '../../../data/unidoStaff';

// Styled components for visual hierarchy
const DirectorateItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const DivisionItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderLeft: `4px solid ${theme.palette.secondary.main}`,
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const PartnerItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  marginLeft: theme.spacing(4),
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const OrganizationalHierarchy = () => {
  const { partners } = useData();
  const [expandedDirectorates, setExpandedDirectorates] = useState({});
  const [expandedDivisions, setExpandedDivisions] = useState({});

  // Process data to organize partners by divisions
  const organizationData = useMemo(() => {
    const result = {};

    // Initialize structure with UNIDO organization
    unidoOrganization.directorates.forEach(directorate => {
      result[directorate.id] = {
        ...directorate,
        divisions: directorate.divisions.map(division => ({
          ...division,
          partners: []
        }))
      };
    });

    // Add director general's office
    result['DG'] = {
      id: 'DG',
      name: 'Director General\'s Office',
      divisions: []
    };

    // Function to find division by ID
    const findDivision = (divisionId) => {
      for (const directorate of Object.values(result)) {
        const division = directorate.divisions.find(d => d.id === divisionId);
        if (division) return division;
      }
      return null;
    };

    // Associate partners with divisions based on contact person
    partners.forEach(partner => {
      if (partner.mainContactPerson) {
        const staff = getStaffById(partner.mainContactPerson);
        
        if (staff && staff.unit) {
          if (staff.unit.division) {
            // Staff is in a division
            const division = findDivision(staff.unit.division);
            if (division) {
              division.partners.push({
                id: partner.id,
                name: partner.name,
                type: partner.type,
                contactPersonName: partner.contactPerson,
                contactPerson: staff,
                projects: partner.projects?.length || 0,
                status: partner.status
              });
            }
          } else if (staff.unit.directorate) {
            // Staff is directly in a directorate (no division)
            const directorate = result[staff.unit.directorate];
            
            // For staff directly under directorate, create virtual division
            if (directorate) {
              // Check if we already have a virtual division for directorate-level staff
              let virtualDivision = directorate.divisions.find(d => d.id === `${directorate.id}_DIR`);
              
              if (!virtualDivision) {
                virtualDivision = {
                  id: `${directorate.id}_DIR`,
                  name: 'Directorate Office',
                  partners: []
                };
                directorate.divisions.push(virtualDivision);
              }
              
              virtualDivision.partners.push({
                id: partner.id,
                name: partner.name,
                type: partner.type,
                contactPersonName: partner.contactPerson,
                contactPerson: staff,
                projects: partner.projects?.length || 0,
                status: partner.status
              });
            }
          }
        }
      }
    });

    return result;
  }, [partners]);

  // Handler for expanding/collapsing directorates
  const handleToggleDirectorate = (directorateId) => {
    setExpandedDirectorates(prev => ({
      ...prev,
      [directorateId]: !prev[directorateId]
    }));
  };

  // Handler for expanding/collapsing divisions
  const handleToggleDivision = (divisionId) => {
    setExpandedDivisions(prev => ({
      ...prev,
      [divisionId]: !prev[divisionId]
    }));
  };

  // Count total partners for a directorate
  const countDirectoratePartners = (directorate) => {
    return directorate.divisions.reduce((total, division) => 
      total + division.partners.length, 0);
  };

  return (
    <Paper sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        UNIDO Organizational Structure & Partners
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Explore UNIDO's directorates and divisions to see associated partners and contacts
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List component="nav" sx={{ width: '100%' }}>
        {Object.values(organizationData).map(directorate => {
          const directorateExpanded = expandedDirectorates[directorate.id] || false;
          const partnerCount = countDirectoratePartners(directorate);
          
          return (
            <Box key={directorate.id} sx={{ mb: 1 }}>
              <DirectorateItem
                button
                onClick={() => handleToggleDirectorate(directorate.id)}
              >
                <ListItemIcon>
                  <Badge badgeContent={partnerCount} color="primary">
                    <AccountTree color="primary" />
                  </Badge>
                </ListItemIcon>
                <ListItemText 
                  primary={directorate.name} 
                  secondary={`${directorate.divisions.length} divisions, ${partnerCount} partners`}
                />
                {directorateExpanded ? <ExpandLess /> : <ExpandMore />}
              </DirectorateItem>

              <Collapse in={directorateExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {directorate.divisions.map(division => {
                    const divisionExpanded = expandedDivisions[division.id] || false;
                    const hasPartners = division.partners.length > 0;
                    
                    return (
                      <React.Fragment key={division.id}>
                        <DivisionItem 
                          button 
                          onClick={() => handleToggleDivision(division.id)}
                          disabled={!hasPartners}
                        >
                          <ListItemIcon>
                            <Badge badgeContent={division.partners.length} color="secondary">
                              {divisionExpanded ? <FolderOpen color="secondary" /> : <Folder color="secondary" />}
                            </Badge>
                          </ListItemIcon>
                          <ListItemText 
                            primary={division.name} 
                            secondary={
                              hasPartners 
                                ? `${division.partners.length} partners` 
                                : 'No partners'
                            }
                          />
                          {hasPartners && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                              <Chip 
                                size="small" 
                                label={`${division.partners.length} partners`} 
                                color="secondary" 
                                variant="outlined" 
                                sx={{ fontSize: '0.75rem', height: 24 }}
                              />
                            </Box>
                          )}
                          {hasPartners && (
                            divisionExpanded ? <ExpandLess /> : <ExpandMore />
                          )}
                        </DivisionItem>

                        {hasPartners && (
                          <Collapse in={divisionExpanded} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {division.partners.map(partner => (
                                <PartnerItem key={partner.id} dense sx={{ flexWrap: 'wrap' }}>
                                  <ListItemIcon>
                                    <Business fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Box display="flex" alignItems="center">
                                        <Button
                                          component={Link}
                                          to={`/partners/${partner.id}`}
                                          sx={{ 
                                            p: 0, 
                                            minWidth: 'auto',
                                            textAlign: 'left', 
                                            textTransform: 'none',
                                            color: 'primary.main',
                                            fontWeight: 'medium',
                                            '&:hover': { textDecoration: 'underline' }
                                          }}
                                        >
                                          {partner.name}
                                        </Button>
                                        <Chip 
                                          size="small" 
                                          label={partner.type} 
                                          color="info" 
                                          variant="outlined"
                                          sx={{ height: 20, fontSize: '0.7rem' }}
                                        />
                                      </Box>
                                    }
                                    secondary={
                                      <Typography variant="caption" display="block" color="text.secondary">
                                        Partner Contact: {partner.contactPersonName || 'Not specified'}
                                      </Typography>
                                    }
                                  />
                                  <Tooltip title={
                                    <React.Fragment>
                                      <Typography variant="caption" fontWeight="bold">
                                        UNIDO Contact Person
                                      </Typography>
                                      <Typography variant="caption" display="block">
                                        {partner.contactPerson.name}
                                      </Typography>
                                      <Typography variant="caption" display="block">
                                        {partner.contactPerson.title}
                                      </Typography>
                                      <Typography variant="caption" display="block">
                                        {partner.contactPerson.email}
                                      </Typography>
                                    </React.Fragment>
                                  }>
                                    <Chip 
                                      icon={<Person fontSize="small" />}
                                      size="small"
                                      label={partner.contactPerson.name} 
                                      variant="outlined"
                                      color="primary"
                                    />
                                  </Tooltip>
                                </PartnerItem>
                              ))}
                            </List>
                          </Collapse>
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Paper>
  );
};

export default OrganizationalHierarchy;
