// src/components/DiseaseClassifier.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Paper } from '@material-ui/core';

const DiseaseClassifier = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState({
        "predicted_class": "miner",
        "recommendations": {
            "Cultural Control": "Regularly prune and destroy infested leaves to reduce the population of miners.",
            "Chemical Control": "Apply insecticides when the infestation begins, focusing on the underside of leaves where miners are active.",
            "Biological Control": "Promote natural enemies such as parasitic wasps, which can effectively control miner populations."
        }
    });
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('https://finalproject-srxb.onrender.com/predict/', formData)
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error('Error uploading the file:', error);
            });
    };
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" gutterBottom>Upload Coffee Leaf Image for Disease Classification</Typography>
            <input type="file" onChange={onFileChange} />
            <Button variant="contained" color="secondary" onClick={onFileUpload} disabled={!selectedFile} style={{ marginTop: '20px' }}>
                Upload and Classify
            </Button>
            {result && (
                <Paper style={{ marginTop: '20px', padding: '20px', width: '50%' }}>
                    <Typography variant="h5">Predicted Class: {result.predicted_class}</Typography>
                    <Typography variant="h6">Recommendations:</Typography>
                    <Typography variant="body1"><strong>Cultural Control:</strong> {result.recommendations['Cultural Control']}</Typography>
                    <Typography variant="body1"><strong>Chemical Control:</strong> {result.recommendations['Chemical Control']}</Typography>
                    <Typography variant="body1"><strong>Biological Control:</strong> {result.recommendations['Biological Control']}</Typography>
                </Paper>
            )}
        </Box>
    );
};

export default DiseaseClassifier;
