const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/flight-instances", async (req, res) => {
  try {
    console.log(req.body);
    
    const response = await axios.post(
      "https://iy3ngebc2lugdyvham664h4it40livij.lambda-url.us-east-1.on.aws/",
      req.body,
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get("/api/direct-flights", async (req, res) => {
  try {
    const { departureDate, arrivalAirport, departureAirport, after } =
      req.query;
    console.log("aaa", departureDate, arrivalAirport, departureAirport, after);
    const response = await axios.get("https://api.oag.com/flight-instances/", {
      params: {
        DepartureDateTime: departureDate,
        ArrivalAirport: arrivalAirport,
        DepartureAirport: departureAirport,
        version: "v2",
        codeType: "IATA,ICAO",
        After: after,
      },
      headers: {
        "Subscription-Key": `${process.env.Direct_Flight_Key}`,
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
