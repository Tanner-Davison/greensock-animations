const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Define a route to proxy the request
app.get('/proxy', async (req, res) => {
  const searchUrl = req.query.searchUrl;
  const searchExtended = req.query.searchExtendedUrl;
  const {domain} = req.query;
  console.log('HEERREEE', searchUrl, searchExtended);
  
  try {
    // Make a request to the target server
    const response = await axios.get(`https://www.${searchUrl}${domain}/${searchExtended}`);
console.log(response.data)
    // Extract required headers from the original response
    const headers = {
      'content-type': response.headers['content-type'],
      'cache-control': response.headers['cache-control'],

      // Add any other headers you want to forward
    };
    res.set('Access-Control-Allow-Origin','*')

    // Forward the headers along with the HTML content
    res.set(headers).send(response.data);
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