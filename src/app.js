const express = require('express');
const cors = require('cors');
require('dotenv').config();
const clientesRoutes = require('./routes/clientes.routes')
const vehiculosRoutes = require('./routes/vehiculos.routes');
const authRoutes = require('./routes/auth.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const productosRoutes = require('./routes/productos.routes');
const notificacionRoutes = require('./routes/notificaciones.routes');
const marcasRoutes = require('./routes/marca.routes');
const historialesRoutes = require('./routes/historiales.routes');
const citaRoutes = require('./routes/citas.routes');
const detalleMarcaRoutes = require('./routes/detalle_marca.routes');
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
//Ruta productos
app.use('/api/productos', productosRoutes);
//Ruta notificaciones
app.use('/api/notificaciones', notificacionRoutes);
//Ruta marcas
app.use('/api/marcas', marcasRoutes);
//Ruta historiales
app.use('/api/historiales', historialesRoutes);
//Ruta citas
app.use('/api/citas', citaRoutes);
//Ruta detalles marca
app.use('/api/detalleMarca', detalleMarcaRoutes);

module.exports = app;