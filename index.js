import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ NSE equity data endpoint
app.get("/nse/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const url = `https://www.nseindia.com/api/quote-equity?symbol=${symbol}`;

  try {
    console.log(`Fetching NSE data for: ${symbol}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.nseindia.com/"
      }
    });

    if (!response.ok) {
      console.error(`❌ NSE returned status ${response.status}`);
      return res.status(response.status).json({
        error: "NSE API error",
        status: response.status
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("❌ Error fetching NSE data:", err);
    res.status(500).json({
      error: "Failed to fetch NSE data",
      details: err.message
    });
  }
});

// ✅ BSE stock data endpoint
app.get("/bse/:code", async (req, res) => {
  const code = req.params.code;
  const url = `https://api.bseindia.com/BseIndiaAPI/api/GetStockReachGraph/w?scripcode=${code}&flag=0`;

  try {
    console.log(`Fetching BSE data for: ${code}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.bseindia.com/"
      }
    });

    if (!response.ok) {
      console.error(`❌ BSE returned status ${response.status}`);
      return res.status(response.status).json({
        error: "BSE API error",
        status: response.status
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("❌ Error fetching BSE data:", err);
    res.status(500).json({
      error: "Failed to fetch BSE data",
      details: err.message
    });
  }
});

// ✅ Default route (instead of "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ Arthiva Proxy is running! Try /nse/RELIANCE or /bse/500325");
});

// Start server (local dev only, Vercel handles prod automatically)
app.listen(3000, () => console.log("🚀 Arthiva Proxy running on port 3000"));
