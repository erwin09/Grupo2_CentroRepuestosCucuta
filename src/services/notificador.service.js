const notificacionesModel = require('../models/notifcaciones.model');
const { client, isClientReady } = require('../services/whatsapp');

const revisarNotificaciones = async () => {
  try {
    if (!isClientReady()) {
      console.log('❌ Cliente WhatsApp no está listo aún');
      return;
    }

    const rows = await notificacionesModel.getAllNotificador();
    console.log('🔍 Resultado de la consulta:', rows);

    if (!rows || rows.length === 0) {
      console.log('📭 No hay notificaciones para hoy.');
      return;
    }

    for (const noti of rows) {
      const numero = `57${noti.telefono}@c.us`;
      const mensaje = `📆 Recuerda tu mantenimiento para el vehículo ${noti.placa}: ${noti.mensaje}`;
      console.log(`📤 Enviando a ${numero}: ${mensaje}`);
      try {
        await client.sendMessage(numero, mensaje);
        console.log(`✅ Mensaje enviado a ${numero}`);
      } catch (error) {
        console.error(`❌ Error al enviar mensaje a ${numero}:`, error.message);
      }
    }

  } catch (error) {
    console.error('❌ Error al enviar notificaciones:', error);
  }
};

const NotificarCita = async (datos) => {
  try {
    if (!isClientReady()) {
      console.log('❌ Cliente WhatsApp no está listo aún');
      return;
    }
    const numero = `57${datos.telefono}@c.us`;
    const mensaje = `📆 Sr(a) ${datos.nombre_usuario}, Centro Repuestos Cúcuta le informa que se asigno para el dia ${datos.fecha} la cita del vehiculo: ${datos.ID_vehiculo}, para: ${datos.nombre}`;
    console.log(`📤 Enviando a ${numero}: ${mensaje}`);

    await client.sendMessage(numero, mensaje);
    console.log(`✅ Mensaje enviado a ${numero}`);

  } catch (error) {
    console.error('❌ Error al enviar notificaciones:', error);
  }
};

const enviarCodigoRecuperacion = (numeroTelefono, codigo) => {
  console.log("esta whatsapp enviando el codigo");
  
  return new Promise((resolve, reject) => {
    const numeroFormateado = `57${numeroTelefono}@c.us`;
    const mensaje = `🔐 Hola, tu código de recuperación es: *${codigo}*\nEste código es válido por 10 minutos.`;

    client.sendMessage(numeroFormateado, mensaje)
      .then(response => {
        console.log('✅ Código enviado con éxito:', response.id.id);
        resolve(true);
      })
      .catch(err => {
        console.error('❌ Error al enviar código por WhatsApp:', err);
        reject(err);
      });
  });
};

module.exports = {
  revisarNotificaciones,
  NotificarCita,
  enviarCodigoRecuperacion
} 