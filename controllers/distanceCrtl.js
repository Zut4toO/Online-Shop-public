const { Client } = require('@googlemaps/google-maps-services-js');

const getDistance = async (req, res) => {
  try {
    const storeAddress = req.query.storeAddress;
    const customerAddress = req.query.customerAddress;
    const client = new Client({});

    const distance = await client.distancematrix({
      params: {
        key: process.env.GOOGLE_MAPS_API,
        origins: [storeAddress],
        destinations: [customerAddress],
        travelMode: 'DRIVING',
        avoidFerries: true,
      },

      timeout: 2000, // milliseconds
    });
    res.json(distance.data.rows[0]?.elements);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { getDistance };
