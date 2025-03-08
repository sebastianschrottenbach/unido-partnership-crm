import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Container, Box, Drawer, List, 
  ListItem, ListItemIcon, ListItemText, CssBaseline, IconButton 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  People as PeopleIcon, 
  ImportExport as ImportExportIcon,
  Menu as MenuIcon 
} from '@mui/icons-material';

import { DataProvider } from './contexts/DataContext';
import Dashboard from './components/Dashboard/Dashboard';
import PartnerList from './components/Partners/PartnerList';
import ImportExport from './components/Import/ImportExport';
import PartnerDetail from './components/Partners/PartnerDetail';
import NewPartner from './components/Partners/NewPartner'; // Import NewPartner component
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Partnerships', icon: <PeopleIcon />, path: '/partners' },
    { text: 'Import/Export', icon: <ImportExportIcon />, path: '/import-export' },
  ];

  const drawer = (
    <Box>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)', 
        backgroundColor: '#009cdc', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center'
      }}>
        <img 
          src="https://www.unido.org/sites/default/files/2022-12/unido-logo-white.png" 
          alt="UNIDO Logo" 
          style={{ height: '30px', marginRight: '10px' }} 
        />
        <Typography variant="h6" component="div">
          Partnership CRM
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer}>
            <ListItemIcon sx={{ color: '#009cdc' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <DataProvider>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="sticky">
            <Toolbar sx={{ backgroundColor: '#009cdc' }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src="https://www.unido.org/sites/default/files/2022-12/unido-logo-white.png" 
                  alt="UNIDO Logo" 
                  style={{ height: '40px', marginRight: '16px' }} 
                />
                <Typography variant="h6" component="div">
                  Partnership CRM
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>
          
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            {drawer}
          </Drawer>
          
          <Box component="main" sx={{ flexGrow: 1, py: 3, backgroundColor: '#f5f9ff' }}>
            <Switch>
              <Route exact path="/" render={() => (
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              )} />
              <Route exact path="/partners" render={() => (
                <ErrorBoundary>
                  <PartnerList />
                </ErrorBoundary>
              )} />
              <Route path="/partners/new" render={() => (
                <ErrorBoundary>
                  <NewPartner />
                </ErrorBoundary>
              )} />
              <Route path="/partners/:id" render={() => (
                <ErrorBoundary>
                  <PartnerDetail />
                </ErrorBoundary>
              )} />
              <Route path="/import-export" render={() => (
                <ErrorBoundary>
                  <ImportExport />
                </ErrorBoundary>
              )} />
            </Switch>
          </Box>
          
          <Box component="footer" sx={{ py: 2, px: 2, mt: 'auto', backgroundColor: '#009cdc', color: '#ffffff' }}>
            <Container maxWidth="lg">
              <Typography variant="body2" color="inherit" align="center">
                UNIDO Partnership CRM Demo - {new Date().getFullYear()}
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </DataProvider>
  );
}

export default App;
