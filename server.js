require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [{ role: "user", content: message }]
  },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Mi App IA"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("ERROR BACKEND:", error.response?.data || error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});