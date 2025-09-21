import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// NSE equity data
app.get("/nse/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const url = `https://www.nseindia.com/api/quote-equity?symbol=${symbol}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NSE data" });
  }
});

// BSE stock data (example: Reliance = 500325)
app.get("/bse/:code", async (req, res) => {
  const code = req.params.code;
  const url = `https://api.bseindia.com/BseIndiaAPI/api/GetStockReachGraph/w?scripcode=${code}&flag=0`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch BSE data" });
  }
});

app.listen(3000, () => console.log("Arthiva Proxy running"));
