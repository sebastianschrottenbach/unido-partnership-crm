import React from 'react';
import { Typography, Paper } from '@mui/material';

// Removed unused Box import

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper sx={{ p: 3, m: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Something went wrong</Typography>
          <Typography variant="body1" sx={{ mt: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </Typography>
        </Paper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
