const express = require('express');
const cors = require('cors');
require('dotenv').config();
const clientesRoutes = require('./routes/clientes.routes')
const vehiculosRoutes = require('./routes/vehiculos.routes');
const authRoutes = require('./routes/auth.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const app = express();


app.use(cors());
app.use(express.json());

//Ruta login
app.use('/api/auth', authRoutes);
// Ruta usuarios
app.use('/api/clientes', clientesRoutes);
//Ruta vehiculos
app.use('/api/vehiculos', vehiculosRoutes);
//Ruta servicios
app.use('/api/servicios', serviciosRoutes);
//Ruta proveedores
app.use('/api/proveedores', proveedoresRoutes);

module.exports = app;