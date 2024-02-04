const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/getItinerary', async (req, res) => {
  try {
    const response = await axios.post('https://api.getknit.ai/v1/router/run', req.body, {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTAxNzQ3NjQwNDQ2MjExNTIxNzQ4In0sImlhdCI6MTcwNjM5NDEwNywiZXhwIjoxNzA3NDc0MTA3fQ.7kNA1fVEi3gS39M1hPmnusjaR6PfUCo96j_s0CNbUDg', // Replace with your actual auth token
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.options('*', cors())
; // Enable CORS for all routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
