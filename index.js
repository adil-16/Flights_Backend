const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/flight-instances", async (req, res) => {
  try {
    const { departureDate, arrivalAirport, departureAirport, after } =
      req.query;
    console.log(departureDate, arrivalAirport, departureAirport, after);

    const response = await axios.get("https://api.oag.com/flight-instances/", {
      params: {
        // ArrivalDateTime: arrivalDate,
        DepartureDateTime: departureDate,
        ArrivalAirport: arrivalAirport,
        DepartureAirport: departureAirport,
        version: "v2",
        codeType: "IATA,ICAO",
        After: after,
      },
      headers: {
        "Subscription-Key": `4f43fe8a02c14a018d9f367e76be19f7`,
        "Cache-Control": "no-cache",
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
