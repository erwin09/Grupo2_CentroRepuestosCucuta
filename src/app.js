const express = require('express');
const cors = require('cors');
require('dotenv').config();
const clientesRoutes = require('./routes/clientes.routes')
const vehiculosRoutes = require('./routes/vehiculos.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();


app.use(cors());
app.use(express.json());

//Ruta login
app.use('/api/auth', authRoutes);
// Ruta usuarios
app.use('/api/clientes', clientesRoutes);
//Ruta vehiculos
app.use('/api/vehiculos', vehiculosRoutes);


module.exports = app;