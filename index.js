const express = require("express");
const axios = require("axios");
const corsModule = require("cors");

const app = express();
const cors = corsModule({ origin: true });

// Middleware de CORS
app.use(cors);

// Definir el endpoint que actuará como proxy
app.get("/proxy", async (req, res) => {
  try {
    // URL del servicio que quieres consumir
    const url = "http://190.181.16.28:8080/values";
    
    // Parámetros enviados en la solicitud
    const params = {
      startDate: req.query.startDate,
      node: req.query.node,
      locale: req.query.locale,
      units: req.query.units,
    };

    // Realizar la solicitud GET a la API externa
    const response = await axios.get(url, { params });

    // Responder con los datos obtenidos
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error en la función proxyApi:", error);
    res.status(500).send("Ocurrió un error interno");
  }
});

// Configura el puerto en el que el servidor escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
