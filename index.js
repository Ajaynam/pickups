const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes')
const loginRoute = require('./routes/authRoutes')
const quickorderRoutes = require('./routes/quickOrderRoute')
const adminRoute = require('./routes/userRoutes')
const mysql = require('mysql2/promise'); 
const axios = require('axios');



const app = express();


const port = 7000;

app.use(bodyParser.json());
app.use(cors());


app.use(cors({
  // origin: 'http://localhost:3002',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


app.post('/api/getOrderShipmentDetails', async (req, res) => {
  try {
    const response = await axios.post('https://shipway.in/api/getOrderShipmentDetails', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching shipment details');
  }
});



app.use(bodyParser.json());
app.use('/auth', loginRoute);
app.use('/admin' , adminRoute);
app.use('/order', orderRoutes);
app.use('/quickOrder', quickorderRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


