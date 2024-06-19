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



// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/api/getOrderShipmentDetails', async (req, res) => {
//   try {
//     const response = await axios.post('https://shipway.in/api/getOrderShipmentDetails', req.body);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send('Error fetching shipment details');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// const express = require('express');
// const puppeteer = require('puppeteer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/api/getOrderShipmentDetails', async (req, res) => {
//   const { order_id } = req.body;

//   async function scrapeTrackingInfo(trackingNumber) {
//     const url = `https://smespl.in/Frm_DocTrackWeb.aspx?docno=${trackingNumber}`;
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     const data = await page.evaluate(() => {
//       const trackingData = {};

//       // Consignment Info
//       trackingData.consignmentNo = document.querySelector('span').innerText;
//       trackingData.fromCenter = document.querySelector('td:nth-child(2)').innerText;
//       trackingData.toCenter = document.querySelector('td:nth-child(4)').innerText;
//       trackingData.dateTime = document.querySelector('td:nth-child(6)').innerText;
//       trackingData.consignee = document.querySelector('td:nth-child(8)').innerText;

//       // Transit Details
//       trackingData.transitDetails = [];
//       document.querySelectorAll('#ctl00_ContentPlaceHolder1_gridview1 tbody tr').forEach(row => {
//         const cells = row.querySelectorAll('td');
//         trackingData.transitDetails.push({
//           job: cells[0].innerText,
//           date: cells[1].innerText,
//           route: cells[2].innerText,
//           time: cells[3].innerText,
//         });
//       });

//       // Delivery Details
//       trackingData.deliveryDetails = [];
//       document.querySelectorAll('#ctl00_ContentPlaceHolder1_GridView2 tbody tr').forEach(row => {
//         const cells = row.querySelectorAll('td');
//         trackingData.deliveryDetails.push({
//           dateTime: cells[0].innerText,
//           deliveryBranch: cells[1].innerText,
//           receiver: cells[2].innerText,
//           status: cells[3].innerText,
//         });
//       });

//       return trackingData;
//     });

//     await browser.close();
//     return data;
//   }

//   try {
//     const trackingInfo = await scrapeTrackingInfo(order_id);
//     res.json(trackingInfo);
//   } catch (error) {
//     res.status(500).send('Error fetching shipment details');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const express = require('express');
// const fs = require('fs');
// const axios = require('axios');

// const app = express();
// const port = 5000;

// app.get('/track', async (req, res) => {
//   const trackingUrl = 'https://www.dtdc.com/tracking.php?tracknumber=' + req.query.tracknumber;
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(trackingUrl);

//   const html = await page.content();
//   const $ = cheerio.load(html);

//   const trackingInfo = {};
//   $('div.tracking-info').each((i, element) => {
//     const key = $(element).find('span.key').text();
//     const value = $(element).find('span.value').text();
//     trackingInfo[key] = value;
//   });

//   res.json(trackingInfo);

//   await browser.close();
// });




// async function trackConsignment() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.dtdc.com/tracking.php?tracknumber=P68712472');

//   const html = await page.content();
//   const $ = cheerio.load(html);

//   const trackingInfo = {};
//   $('div.tracking-info').each((i, element) => {
//     const key = $(element).find('span.key').text();
//     const value = $(element).find('span.value').text();
//     trackingInfo[key] = value;
//   });

//   // Now you can use the trackingInfo object
//   console.log(trackingInfo);

//   // Close the browser
//   await browser.close();
// }

// trackConsignment();
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });