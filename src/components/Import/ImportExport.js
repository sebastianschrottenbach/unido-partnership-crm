import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Button, Box, 
  Stepper, Step, StepLabel, Alert
} from '@mui/material';
import { Upload, Download, Check } from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { exportToExcel, importFromExcel } from '../../utils/excelUtils';

const ImportExport = () => {
  const { partners, importPartners, resetToSampleData } = useData();
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setActiveStep(1);
      // Process file
      importFromExcel(selectedFile)
        .then(data => {
          setPreviewData(data);
          setError(null);
        })
        .catch(err => {
          setError("Error processing file: " + err.message);
          setPreviewData(null);
        });
    }
  };
  
  const handleImport = () => {
    if (previewData) {
      importPartners(previewData);
      setActiveStep(2);
    }
  };
  
  const handleExport = () => {
    exportToExcel(partners, 'unido_partnerships.xlsx');
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setFile(null);
    setPreviewData(null);
    setError(null);
  };
  
  const steps = ['Select file', 'Preview data', 'Import complete'];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Import/Export Partnerships
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Export Current Data
        </Typography>
        <Typography variant="body1" paragraph>
          Download all partnership data as an Excel file. You can use this file as a template for importing new data.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Download />}
            onClick={handleExport}
          >
            Export to Excel
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => resetToSampleData()}
          >
            Reset to Sample Data
          </Button>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Import Partnerships
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {activeStep === 0 && (
          <Box>
            <Typography variant="body1" paragraph>
              Upload an Excel file with partnership data. Make sure it has the correct format.
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<Upload />}
            >
              Select File
              <input
                type="file"
                accept=".xlsx, .xls"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        )}
        
        {activeStep === 1 && (
          <Box>
            <Typography variant="body1" paragraph>
              File selected: <strong>{file?.name}</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Ready to import {previewData?.length} partnership records.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleImport}
              >
                Import Data
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleReset}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
        
        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center' }}>
            <Check sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Import Complete!
            </Typography>
            <Typography variant="body1" paragraph>
              Successfully imported {previewData?.length} partnership records.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleReset}
              >
                Import Another File
              </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ImportExport;
