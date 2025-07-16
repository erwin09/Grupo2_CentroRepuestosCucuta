const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let isClientReady = false; // bandera de conexión

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  console.log('📱 Escanea este código QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Cliente conectado a WhatsApp');
  isClientReady = true;
});

client.on('disconnected', () => {
  console.log('🔌 Cliente desconectado');
  isClientReady = false;
});

client.initialize();

module.exports = {
  client,
  isClientReady: () => isClientReady
};