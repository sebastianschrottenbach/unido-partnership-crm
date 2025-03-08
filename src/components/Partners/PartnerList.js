import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Chip, TextField, InputAdornment,
  Box, Button, Grid, FormControl, InputLabel, Select, MenuItem, Collapse,
  IconButton, Divider, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import {
  Search, GetApp, FilterList, Clear, KeyboardArrowUp, KeyboardArrowDown,
  Add
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { exportToExcel } from '../../utils/excelUtils';
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

const PartnerList = () => {
  const history = useHistory();
  const { partners } = useData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedSdgs, setSelectedSdgs] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const toggleFilterPanel = () => {
    setFilterOpen(!filterOpen);
  };

  const handleMultiSelectChange = (event, setter) => {
    const { value } = event.target;
    setter(typeof value === 'string' ? value.split(',') : value);
  };

  const clearFilters = () => {
    setSelectedRegions([]);
    setSelectedSectors([]);
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSelectedSdgs([]);
    setDateRange({ start: '', end: '' });
  };

  const filteredPartners = partners.filter(partner => {
    // Search term filter
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // Region filter
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(partner.region);

    // Sector filter
    const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(partner.sector);

    // Type filter
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(partner.type);

    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(partner.status);

    // SDG filter
    const matchesSdg = selectedSdgs.length === 0 || 
      selectedSdgs.some(sdg => partner.sdgAlignment?.includes(sdg));

    // Date range filter
    const matchesDateRange = 
      (!dateRange.start || new Date(partner.startDate) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(partner.startDate) <= new Date(dateRange.end));

    return matchesSearch && matchesRegion && matchesSector && matchesType && 
           matchesStatus && matchesSdg && matchesDateRange;
  });

  const displayedPartners = filteredPartners
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleExport = () => {
    exportToExcel(partners);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Partnership Database</Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<GetApp />} 
            onClick={handleExport}
            sx={{ mr: 1 }}
          >
            Export to Excel
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FilterList />} 
            onClick={toggleFilterPanel}
          >
            Filters {filterOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Button>
        </Box>
      </Box>

      <Collapse in={filterOpen}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            {/* Region Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  multiple
                  value={selectedRegions}
                  onChange={(e) => handleMultiSelectChange(e, setSelectedRegions)}
                  input={<OutlinedInput label="Region" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      <Checkbox checked={selectedRegions.indexOf(region) > -1} />
                      <ListItemText primary={region} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Sector Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Sector</InputLabel>
                <Select
                  multiple
                  value={selectedSectors}
                  onChange={(e) => handleMultiSelectChange(e, setSelectedSectors)}
                  input={<OutlinedInput label="Sector" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {sectors.map((sector) => (
                    <MenuItem key={sector} value={sector}>
                      <Checkbox checked={selectedSectors.indexOf(sector) > -1} />
                      <ListItemText primary={sector} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Type Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  multiple
                  value={selectedTypes}
                  onChange={(e) => handleMultiSelectChange(e, setSelectedTypes)}
                  input={<OutlinedInput label="Type" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={selectedTypes.indexOf(type) > -1} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={selectedStatuses}
                  onChange={(e) => handleMultiSelectChange(e, setSelectedStatuses)}
                  input={<OutlinedInput label="Status" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={selectedStatuses.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* SDG Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>SDGs</InputLabel>
                <Select
                  multiple
                  value={selectedSdgs}
                  onChange={(e) => handleMultiSelectChange(e, setSelectedSdgs)}
                  input={<OutlinedInput label="SDGs" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {sdgs.map((sdg) => (
                    <MenuItem key={sdg.number} value={sdg.number}>
                      <Checkbox checked={selectedSdgs.indexOf(sdg.number) > -1} />
                      <ListItemText primary={`SDG ${sdg.number}: ${sdg.name}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Range Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Button 
              variant="outlined" 
              startIcon={<Clear />} 
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Box>
        </Paper>
      </Collapse>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, country, or sector..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>SDGs</TableCell>
              <TableCell>Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPartners.map((partner) => (
              <TableRow
                key={partner.id}
                hover
                onClick={() => history.push(`/partners/${partner.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.type}</TableCell>
                <TableCell>{partner.sector}</TableCell>
                <TableCell>{partner.country}</TableCell>
                <TableCell>
                  <Chip 
                    label={partner.status} 
                    color={
                      partner.status === 'Active' ? 'success' :
                      partner.status === 'Planning' ? 'primary' :
                      partner.status === 'On Hold' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {partner.sdgAlignment?.map(sdg => (
                    <Chip 
                      key={sdg} 
                      label={`SDG ${sdg}`} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>{partner.startDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPartners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default PartnerList;
