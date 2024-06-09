import React from 'react';
import { Button, CircularProgress, Typography, Box, Grid, Paper } from '@material-ui/core';
import Dropzone from './Dropzone';
import ImageDisplay from './ImageDisplay';
import './Dashboard.css';

function Dashboard({ onFileChange, onFileUpload, loading, selectedFile, originalImage, result, error }) {
  return (
    <div className="dashboard-container">
      <div className="welcome-banner">
        <h1>Welcome Back, {localStorage.getItem('username')}</h1>
      </div>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="main-content">
        <Typography variant="h4" gutterBottom>Image Processor</Typography>
        <Dropzone onDrop={onFileChange} accept="image/*" />
        <Button variant="contained" color="secondary" onClick={onFileUpload} disabled={loading || !selectedFile} style={{ marginTop: '20px' }}>
          {loading ? <CircularProgress size={24} /> : 'Detect'}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6}>
            <Paper>
              <ImageDisplay title="Original" imageSrc={originalImage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {result && (
              <Paper>
                <ImageDisplay title="Result" imageSrc={result} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
