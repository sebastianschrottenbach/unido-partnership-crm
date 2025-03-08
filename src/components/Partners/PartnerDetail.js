import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, Grid, Chip, Button, 
  Tabs, Tab, Divider, List, ListItem, ListItemText, Card, 
  CardContent, TextField, IconButton, Avatar, Dialog, DialogTitle,
  DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { 
  ArrowBack, Edit, Delete, Add, Business, Public, Phone, 
  Email, CalendarToday, Flag, CheckCircle, Assignment, Save, Cancel 
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { sdgs } from '../../data/sampleData';

// Helper component for displaying partner metadata
const InfoItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`partner-tabpanel-${index}`}
      aria-labelledby={`partner-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const PartnerDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { partners, updatePartner, deletePartner } = useData();
  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newActivity, setNewActivity] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Meeting',
    notes: ''
  });
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  
  // Find the partner by ID
  const partner = partners.find(p => p.id === parseInt(id));
  const [editedPartner, setEditedPartner] = useState(partner);
  
  if (!partner) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Partner not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => history.push('/partners')}>
          Back to Partners
        </Button>
      </Container>
    );
  }
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleEditToggle = () => {
    if (editing) {
      // If we're exiting edit mode, update the partner
      updatePartner(editedPartner);
    } else {
      // If we're entering edit mode, set the edited partner to a copy of the current one
      setEditedPartner({...partner});
    }
    setEditing(!editing);
  };
  
  const handleEditChange = (field, value) => {
    setEditedPartner({
      ...editedPartner,
      [field]: value
    });
  };
  
  const handleDeleteConfirm = () => {
    deletePartner(partner.id);
    setConfirmDelete(false);
    history.push('/partners');
  };
  
  const handleActivitySubmit = () => {
    const activity = {
      ...newActivity,
      id: partner.engagements ? partner.engagements.length + 1 : 1
    };
    
    const updatedPartner = {
      ...partner,
      engagements: partner.engagements ? [...partner.engagements, activity] : [activity]
    };
    
    updatePartner(updatedPartner);
    setActivityDialogOpen(false);
    setNewActivity({
      date: new Date().toISOString().split('T')[0],
      type: 'Meeting',
      notes: ''
    });
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header section with actions */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button startIcon={<ArrowBack />} onClick={() => history.push('/partners')}>
          Back to Partners
        </Button>
        <Box>
          {!editing ? (
            <>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Edit />} 
                onClick={handleEditToggle}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<Delete />} 
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Save />} 
                onClick={handleEditToggle}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Cancel />} 
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>
      
      {/* Main content */}
      <Grid container spacing={3}>
        {/* Left column - Partner info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            {editing ? (
              // Edit mode
              <Box>
                <Typography variant="h6" gutterBottom>Partner Information</Typography>
                <TextField 
                  fullWidth 
                  label="Partner Name" 
                  value={editedPartner.name} 
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={editedPartner.type}
                    label="Type"
                    onChange={(e) => handleEditChange('type', e.target.value)}
                  >
                    <MenuItem value="Private Sector">Private Sector</MenuItem>
                    <MenuItem value="Government">Government</MenuItem>
                    <MenuItem value="NGO">NGO</MenuItem>
                    <MenuItem value="Academic">Academic</MenuItem>
                    <MenuItem value="UN Agency">UN Agency</MenuItem>
                    <MenuItem value="International Organization">International Organization</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Sector</InputLabel>
                  <Select
                    value={editedPartner.sector}
                    label="Sector"
                    onChange={(e) => handleEditChange('sector', e.target.value)}
                  >
                    <MenuItem value="ICT">ICT</MenuItem>
                    <MenuItem value="Clean Energy">Clean Energy</MenuItem>
                    <MenuItem value="Policy">Policy</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Water">Water</MenuItem>
                    <MenuItem value="Agriculture">Agriculture</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                  </Select>
                </FormControl>
                <TextField 
                  fullWidth 
                  label="Country" 
                  value={editedPartner.country} 
                  onChange={(e) => handleEditChange('country', e.target.value)}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={editedPartner.region}
                    label="Region"
                    onChange={(e) => handleEditChange('region', e.target.value)}
                  >
                    <MenuItem value="Africa">Africa</MenuItem>
                    <MenuItem value="Asia">Asia</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                    <MenuItem value="Latin America">Latin America</MenuItem>
                    <MenuItem value="Middle East">Middle East</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Oceania">Oceania</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editedPartner.status}
                    label="Status"
                    onChange={(e) => handleEditChange('status', e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Planning">Planning</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                <TextField 
                  fullWidth 
                  label="Start Date" 
                  type="date"
                  value={editedPartner.startDate} 
                  onChange={(e) => handleEditChange('startDate', e.target.value)}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField 
                  fullWidth 
                  label="Contact Person" 
                  value={editedPartner.contactPerson} 
                  onChange={(e) => handleEditChange('contactPerson', e.target.value)}
                  margin="normal"
                />
                <TextField 
                  fullWidth 
                  label="Email" 
                  value={editedPartner.email} 
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  margin="normal"
                />
                <TextField 
                  fullWidth 
                  label="Description" 
                  value={editedPartner.description} 
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Box>
            ) : (
              // View mode
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      bgcolor: 'primary.main',
                      mr: 2
                    }}
                  >
                    {partner.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" component="div">
                      {partner.name}
                    </Typography>
                    <Chip 
                      label={partner.status} 
                      color={
                        partner.status === 'Active' ? 'success' :
                        partner.status === 'Planning' ? 'primary' :
                        partner.status === 'On Hold' ? 'warning' : 'default'
                      }
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <InfoItem 
                  icon={<Business />} 
                  label="TYPE"
                  value={partner.type}
                />
                
                <InfoItem 
                  icon={<Assignment />} 
                  label="SECTOR"
                  value={partner.sector}
                />
                
                <InfoItem 
                  icon={<Public />} 
                  label="LOCATION"
                  value={`${partner.country} (${partner.region})`}
                />
                
                <InfoItem 
                  icon={<CalendarToday />} 
                  label="PARTNERSHIP START"
                  value={partner.startDate}
                />
                
                <InfoItem 
                  icon={<Phone />} 
                  label="CONTACT PERSON"
                  value={partner.contactPerson}
                />
                
                <InfoItem 
                  icon={<Email />} 
                  label="EMAIL"
                  value={partner.email}
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  DESCRIPTION
                </Typography>
                <Typography variant="body2" paragraph>
                  {partner.description}
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  SDG ALIGNMENT
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {partner.sdgAlignment?.map(sdgNum => {
                    const sdgInfo = sdgs.find(s => s.number === sdgNum);
                    return (
                      <Chip 
                        key={sdgNum} 
                        label={`SDG ${sdgNum}: ${sdgInfo?.name}`} 
                        size="small" 
                        color="primary"
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Right column - Tabs */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Activity Timeline" />
              <Tab label="Agreements" />
              <Tab label="Projects" />
              <Tab label="Contributions" />
              <Tab label="Connections" />
              <Tab label="Documents" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Partnership Activities</Typography>
                <Button 
                  startIcon={<Add />} 
                  variant="contained"
                  onClick={() => setActivityDialogOpen(true)}
                >
                  Add Activity
                </Button>
              </Box>
              
              {partner.engagements && partner.engagements.length > 0 ? (
                <List>
                  {[...partner.engagements]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((activity, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ pl: 0 }}>
                          <Card sx={{ width: '100%' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" color="primary">
                                  {activity.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                  {activity.date}
                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {activity.notes}
                              </Typography>
                            </CardContent>
                          </Card>
                        </ListItem>
                        {index < partner.engagements.length - 1 && (
                          <Box 
                            sx={{ 
                              height: 30, 
                              borderLeft: '2px dashed', 
                              borderColor: 'primary.light',
                              ml: 3
                            }} 
                          />
                        )}
                      </React.Fragment>
                    ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  No activities recorded yet.
                </Typography>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Partnership Agreements</Typography>
                <Button startIcon={<Add />} variant="contained">
                  Add Agreement
                </Button>
              </Box>
              
              {partner.agreements && partner.agreements.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {partner.agreements.map((agreement, index) => (
                        <TableRow key={index}>
                          <TableCell>{agreement.type}</TableCell>
                          <TableCell>
                            <Chip 
                              label={agreement.status} 
                              color={agreement.status === 'Active' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{agreement.startDate}</TableCell>
                          <TableCell>{agreement.endDate}</TableCell>
                          <TableCell>{agreement.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  No formal agreements recorded yet.
                </Typography>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Projects</Typography>
                <Button startIcon={<Add />} variant="contained">
                  Add Project
                </Button>
              </Box>
              
              {partner.projects && partner.projects.length > 0 ? (
                <Grid container spacing={2}>
                  {partner.projects.map((project, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            ID: {project.id}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            Location: {project.location}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                              Budget: ${project.budget.toLocaleString()}
                            </Typography>
                            <Chip 
                              label={project.status}
                              color={project.status === 'In Progress' ? 'success' : 'primary'}
                              size="small"
                            />
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            {project.sdgs?.map(sdg => (
                              <Chip 
                                key={sdg} 
                                label={`SDG ${sdg}`} 
                                size="small" 
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  No projects recorded yet.
                </Typography>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Financial & In-kind Contributions</Typography>
                <Button startIcon={<Add />} variant="contained">
                  Add Contribution
                </Button>
              </Box>
              
              {partner.contributions && partner.contributions.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Purpose/Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {partner.contributions.map((contribution, index) => (
                        <TableRow key={index}>
                          <TableCell>{contribution.type}</TableCell>
                          <TableCell>{contribution.date}</TableCell>
                          <TableCell>
                            {contribution.type === 'Financial' 
                              ? `${contribution.amount.toLocaleString()} ${contribution.currency}` 
                              : contribution.estimatedValue 
                                ? `~${contribution.estimatedValue.toLocaleString()} ${contribution.currency}`
                                : 'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            {contribution.purpose || contribution.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  No contributions recorded yet.
                </Typography>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Partner Connections</Typography>
                <Button startIcon={<Add />} variant="contained">
                  Add Connection
                </Button>
              </Box>
              
              {partner.connections && partner.connections.length > 0 ? (
                <Grid container spacing={2}>
                  {partner.connections.map(partnerId => {
                    const connectedPartner = partners.find(p => p.id === partnerId);
                    if (!connectedPartner) return null;
                    
                    return (
                      <Grid item xs={12} sm={6} md={4} key={partnerId}>
                        <Card 
                          sx={{ cursor: 'pointer' }}
                          onClick={() => history.push(`/partners/${partnerId}`)}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ bgcolor: 'primary.main', mr: 2 }}
                              >
                                {connectedPartner.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1">
                                  {connectedPartner.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {connectedPartner.type} • {connectedPartner.sector}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Projects in common:
                              </Typography>
                              <Typography variant="body2">
                                Digital Skills for Youth
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  No partner connections recorded.
                </Typography>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Partnership Documents</Typography>
                <Button startIcon={<Add />} variant="contained">
                  Add Document
                </Button>
              </Box>
              <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                No documents uploaded yet.
                </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the partnership with {partner.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      
      {/* Add activity dialog */}
      <Dialog
        open={activityDialogOpen}
        onClose={() => setActivityDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Partnership Activity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={newActivity.date}
                onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={newActivity.type}
                  label="Activity Type"
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                >
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Call">Call</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Workshop">Workshop</MenuItem>
                  <MenuItem value="Field Visit">Field Visit</MenuItem>
                  <MenuItem value="Report">Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                value={newActivity.notes}
                onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivityDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleActivitySubmit} variant="contained" color="primary">Add Activity</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PartnerDetail;
