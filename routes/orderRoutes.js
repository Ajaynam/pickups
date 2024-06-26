const express = require("express");
const router = express.Router();

const db = require('../models/db')


// let lastOrderId = 110000;

// const generateRandomOrderId = () => {
//   lastOrderId++;
//   return lastOrderId.toString();
// };

// const isOrderIdUnique = async (orderId) => {
//   const q = "SELECT COUNT(*) as count FROM orders WHERE orderId = ?";
//   const result = await db.queryAsync(q, [orderId]);
//   return result[0].count === 0;
// };


let lastOrderId = 110000;

// Function to check if the orderId is unique
const isOrderIdUnique = async (orderId) => {
  const q = "SELECT COUNT(*) as count FROM orders WHERE orderId = ?";
  const result = await db.queryAsync(q, [orderId]);
  return result[0].count === 0;
};

// Function to generate a unique incremented orderId
const generateUniqueOrderId = async () => {
  let orderId;
  let isUnique = false;

  while (!isUnique) {
    lastOrderId++;
    orderId = lastOrderId.toString();
    isUnique = await isOrderIdUnique(orderId);
  }

  return orderId;
};


router.post("/postBooking", async (req, res) => {
  try {
    const {
      pname,
      pnumber,
      pemail,
      paddress,
      ppin,
      pcity,
      pstate,
      dname,
      dnumber,
      demail,
      daddress,
      dpin,
      dcity,
      dstate,
      packageType,
      weight,
      ChargableWeight,
      shiptype,
      price,
      orderDate,
      trackingNo,
      length,
      width,
      height,
      parcel_value,
      description,
      NoOfPackage,
      gst
    } = req.body;

    // let status = "pending";

    // const orderId = generateRandomOrderId();
    // if (trackingNo) {
    //   status = "picked-up";
    // }


    let status = "pending";

    // Generate a unique orderId
    const orderId = await generateUniqueOrderId();

    if (trackingNo) {
      status = "picked-up";
    }

    // const q = "INSERT INTO orders (orderId, pname, pnumber, pemail, paddress, ppin, pcity, pstate, dname, dnumber, demail, daddress, dpin, dcity, dstate, packageType, weight, ChargableWeight, shiptype, price, orderDate, status, trackingNo ,length, width, height, parcel_value, description, NoOfPackage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const q = "INSERT INTO orders (orderId, pname, pnumber, pemail, paddress, ppin, pcity, pstate, dname, dnumber, demail, daddress, dpin, dcity, dstate, packageType, weight, ChargableWeight, shiptype, price, orderDate, status, trackingNo ,length, width, height, parcel_value, description, NoOfPackage ,gst) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    // const values = [
    //   orderId, pname, pnumber, pemail, paddress, ppin, pcity, pstate, dname, dnumber, demail, daddress, dpin, dcity, dstate, packageType, weight, ChargableWeight, shiptype, price, orderDate, status, trackingNo, length, width, height, parcel_value, description, NoOfPackage
    // ];

    const values = [
      orderId, pname, pnumber, pemail, paddress, ppin, pcity, pstate, dname, dnumber, demail, daddress, dpin, dcity, dstate, packageType, weight, ChargableWeight, shiptype, price, orderDate, status, trackingNo, length, width, height, parcel_value, description, NoOfPackage, gst
    ];


    const data = await db.queryAsync(q, values);

    return res.json({ message: 'Order created successfully', orderId, data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get("/getOrders", async (req, res) => {
  try {
    const q = "SELECT * FROM orders";
    const data = await db.queryAsync(q);

    return res.json({ message: 'Orders retrieved successfully', data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get("/getOrderById/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const q = "SELECT * FROM orders WHERE id = ?";
    const data = await db.queryAsync(q, [orderId]);

    if (data.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ message: 'Order retrieved successfully', data: data[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post("/updateTrackingNo/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { trackingNo } = req.body;

    if (!trackingNo) {
      return res.status(400).json({ message: 'Tracking number is required' });
    }

    const qUpdate = "UPDATE orders SET trackingNo = ?, status = 'picked-up'  WHERE id = ?";
    const valuesUpdate = [trackingNo, orderId];

    const data = await db.queryAsync(qUpdate, valuesUpdate);

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ message: 'Tracking number updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


router.put("/updateOrder/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const {
      pname,
      pnumber,
      pemail,
      paddress,
      ppin,
      pcity,
      pstate,
      dname,
      dnumber,
      demail,
      daddress,
      dpin,
      dcity,
      dstate,
      packageType,
      weight,
      ChargableWeight,
      shiptype,
      price,
      orderDate,
      status,
      trackingNo,
      length,
      width,
      height,
      parcel_value,
      description,
      NoOfPackage,
      gst,
    } = req.body;

    const qUpdate =
      "UPDATE orders SET pname = ?, pnumber = ?, pemail = ?, paddress = ?, ppin = ?, pcity = ?, pstate = ?, dname = ?, dnumber = ?, demail = ?, daddress = ?, dpin = ?, dcity = ?, dstate = ?, packageType = ?, weight = ?, ChargableWeight = ?, shiptype = ?, price = ?, orderDate = ?, status = ?, trackingNo = ?, length = ?, width = ?, height = ?, parcel_value = ?, description = ?, NoOfPackage = ? , gst = ? WHERE id = ?";

    const valuesUpdate = [
      pname, pnumber, pemail, paddress, ppin, pcity, pstate, dname, dnumber, demail, daddress, dpin, dcity, dstate, packageType, weight, ChargableWeight, shiptype, price, orderDate, status, trackingNo, length, width, height, parcel_value, description, NoOfPackage, gst, id
    ];

    const data = await db.queryAsync(qUpdate, valuesUpdate);

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ message: 'Order details updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


router.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    const qDelete = "DELETE FROM orders WHERE id = ?";
    const data = await db.queryAsync(qDelete, [orderId]);

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


router.get("/getTotalOrders", async (req, res) => {
  try {
    const qTotalOrders = "SELECT COUNT(*) as totalOrders FROM orders";
    const totalOrders = await db.queryAsync(qTotalOrders);

    return res.json({ message: 'Total orders retrieved successfully', totalOrders: totalOrders[0].totalOrders });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get("/getTotalPendingOrders", async (req, res) => {
  try {
    const qTotalPendingOrders = "SELECT COUNT(*) as totalPendingOrders FROM orders WHERE status = 'pending'";
    const totalPendingOrders = await db.queryAsync(qTotalPendingOrders);

    return res.json({ message: 'Total pending orders retrieved successfully', totalPendingOrders: totalPendingOrders[0].totalPendingOrders });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// getTotalPickedUpOrders route
router.get("/getTotalPickedUpOrders", async (req, res) => {
  try {
    const qTotalPickedUpOrders = "SELECT COUNT(*) as totalPickedUpOrders FROM orders WHERE status = 'picked-up'";
    const totalPickedUpOrders = await db.queryAsync(qTotalPickedUpOrders);

    return res.json({ message: 'Total picked-up orders retrieved successfully', totalPickedUpOrders: totalPickedUpOrders[0].totalPickedUpOrders });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});






module.exports = router;
