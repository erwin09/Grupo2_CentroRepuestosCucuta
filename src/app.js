const express = require('express');
const cors = require('cors');
const {client} = require('./services/whatsapp')
require('dotenv').config();
const clientesRoutes = require('./routes/clientes.routes')
const vehiculosRoutes = require('./routes/vehiculos.routes');
const authRoutes = require('./routes/auth.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const productosRoutes = require('./routes/productos.routes');
const notificacionRoutes = require('./routes/notificaciones.routes');
const marcasRoutes = require('./routes/marca.routes');
const mantenimientoRoutes = require('./routes/mantenimientos.routes');
const citaRoutes = require('./routes/citas.routes');
const detalleMarcaRoutes = require('./routes/detalle_marca.routes');
const detalleNotificacionRoutes = require('./routes/detalle_notificacion.routes');
const detalleProductoRoutes = require('./routes/detalle_producto.routes');
const detalleServicioRoutes = require('./routes/detalle_servicio.routes');
const app = express();

app.use(cors());
app.use(express.json());


const cron = require('node-cron');
const revisarNotificaciones = require('./services/notificador.service');

client.on('ready', () => {
  console.log('⏰ Programando envío de notificaciones cada dia a las 8 am');
  cron.schedule('0 8 * * *', revisarNotificaciones);
});


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
//Ruta mantenimientos
app.use('/api/mantenimientos', mantenimientoRoutes);
//Ruta citas
app.use('/api/citas', citaRoutes);
//Ruta detalles marca
app.use('/api/detalleMarca', detalleMarcaRoutes);
//Ruta detalles notificación
app.use('/api/detallenotificacion', detalleNotificacionRoutes);
//Ruta detalles producto
app.use('/api/detalleproducto', detalleProductoRoutes);
//Ruta detalles servicio
app.use('/api/detalleservicio', detalleServicioRoutes);

module.exports = app;