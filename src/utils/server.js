const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); // Import Cheerio for parsing HTML

const app = express();
const PORT = 5000;

// Define a route to proxy the request
app.get('/proxy', async (req, res) => {
  try {
    // Make a request to the target server
    const response = await axios.get('https://vasion.com/');

    // Use Cheerio to load the HTML content
    const $ = cheerio.load(response.data);

    // Get the HTML content
    const htmlContent = $.html();

    // Forward the HTML content back to the frontend
    
    res.send(htmlContent);
  } catch (error) {
    // Handle errors
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});