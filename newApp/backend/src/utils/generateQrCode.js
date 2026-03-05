const QRCode = require('qrcode');

const generateQrCodeDataUrl = async (text) => {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 1,
    scale: 5
  });
};

module.exports = generateQrCodeDataUrl;

