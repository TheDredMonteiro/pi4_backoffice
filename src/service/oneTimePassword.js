const crypto = require('crypto');

const gerarPasswordUsoUnico = (codigoConfirmacao) => {
  const randomNumber = crypto.randomBytes(3).toString('hex');
  const OTP = randomNumber.padStart(6, '0');

  // Armazena a OTP em uma variável temporária
  let tempOTP = OTP;

  // Depois de 30 segundos, elimina o valor da variável temporária
  setTimeout(() => {
    tempOTP = null;
  }, 30000);
  if(codigoConfirmacao === tempOTP){
    return true
  }
  return false;
};

module.exports = {gerarPasswordUsoUnico};