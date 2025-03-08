import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container, Typography, Paper, Box, Grid, Button, TextField,
  FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput,
  ListItemText, Checkbox
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { regions, sectors, types, statuses, sdgs } from '../../data/sampleData';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewPartner = () => {
  const history = useHistory();
  const { addPartner } = useData();
  const [newPartner, setNewPartner] = useState({
    name: '',
    type: '',
    sector: '',
    region: '',
    country: '',
    status: 'Planning',
    startDate: new Date().toISOString().split('T')[0],
    contactPerson: '',
    email: '',
    description: '',
    sdgAlignment: [],
    engagements: []
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setNewPartner({
      ...newPartner,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
    addPartner(newPartner);
    history.push('/partners');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button startIcon={<ArrowBack />} onClick={() => history.push('/partners')}>
          Back to Partners
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Partner
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Partner Name"
                value={newPartner.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newPartner.type}
                  label="Type"
                  onChange={(e) => handleChange('type', e.target.value)}
                  required
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sector</InputLabel>
                <Select
                  value={newPartner.sector}
                  label="Sector"
                  onChange={(e) => handleChange('sector', e.target.value)}
                  required
                >
                  {sectors.map((sector) => (
                    <MenuItem key={sector} value={sector}>{sector}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={newPartner.region}
                  label="Region"
                  onChange={(e) => handleChange('region', e.target.value)}
                  required
                >
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                value={newPartner.country}
                onChange={(e) => handleChange('country', e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newPartner.status}
                  label="Status"
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={newPartner.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person"
                value={newPartner.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newPartner.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={newPartner.description}
                onChange={(e) => handleChange('description', e.target.value)}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>SDG Alignment</InputLabel>
                <Select
                  multiple
                  value={newPartner.sdgAlignment}
                  onChange={(e) => handleChange('sdgAlignment', e.target.value)}
                  input={<OutlinedInput label="SDG Alignment" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {sdgs.map((sdg) => (
                    <MenuItem key={sdg.number} value={sdg.number}>
                      <Checkbox checked={newPartner.sdgAlignment.indexOf(sdg.number) > -1} />
                      <ListItemText primary={`SDG ${sdg.number}: ${sdg.name}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              type="submit"
            >
              Save Partner
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewPartner;
