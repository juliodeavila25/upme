require("dotenv").config();

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const db = require('./models');
const cors = require("cors");

const upmeRoutes = require("./routes/upme.routes");


app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use("/", upmeRoutes);

db.sequelize.authenticate()  
  .then(() => console.log('Conexión a DB exitosa'))
  .catch(err => console.error('Error conexión:', err));

app.listen(8080, () => console.log('Servidor en puerto 8080'));