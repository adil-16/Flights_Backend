const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/flight-instances", async (req, res) => {
  try {
    const { arrivalDate, departureDate, arrivalAirport, departureAirport } =
      req.query;
    console.log(arrivalDate, departureDate, arrivalAirport, departureAirport);

    const response = await axios.get("https://api.oag.com/flight-instances/", {
      params: {
        ArrivalDateTime: arrivalDate,
        DepartureDateTime: departureDate,
        ArrivalAirport: arrivalAirport,
        DepartureAirport: departureAirport,
        version: "v2",
        codeType: "IATA,ICAO",
      },
      headers: {
        "Subscription-Key": `${process.env.Subscription_Key}`,
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
