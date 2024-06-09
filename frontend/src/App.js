import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFileChange = files => {
    const file = files[0];
    setSelectedFile(file);
    setOriginalImage(URL.createObjectURL(file));
    setResult(null); // Clear the previous prediction result
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    setLoading(true);
    setError(null);
    axios.post('http://localhost:8000/detect/', formData, { responseType: 'blob' })
      .then(response => {
        console.log('Server response:', response); // Log the server's response
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setResult(url);
        setLoading(false);
      })
      .catch(error => {
        console.error('Upload error:', error); // Log any errors that occur
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Router>
      <AppContent
        onFileChange={onFileChange}
        onFileUpload={onFileUpload}
        loading={loading}
        selectedFile={selectedFile}
        originalImage={originalImage}
        result={result}
        error={error}
      />
    </Router>
  );
}

function AppContent({ onFileChange, onFileUpload, loading, selectedFile, originalImage, result, error }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <Dashboard
            onFileChange={onFileChange}
            onFileUpload={onFileUpload}
            loading={loading}
            selectedFile={selectedFile}
            originalImage={originalImage}
            result={result}
            error={error}
          />
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
