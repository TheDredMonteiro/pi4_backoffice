const crypto = require('crypto');
const nodemailer = require('nodemailer');

const enviarCodigoParaEmail = async (emailUtilizador, codigoConfirmacao) => {
  if(!emailUtilizador || !codigoConfirmacao) return 'Verifique o teu correio eletrónico!';

  /* Gerar código de confirmação. */

  const randomNumber = crypto.randomBytes(3).toString('hex');
  const OTP = randomNumber.padStart(6, '0');

  // Armazena a OTP em uma variável temporária
  let tempOTP = OTP;

    // Cria um novo transporter usando o SMTP do Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'vossoemailaqui@gmail.com',
        pass: 'vossasenhaaqui'
      }
    });
  
    // Define os detalhes do email
    const mailOptions = {
      from: '"Cursar" <cursar@gmail.com>',
      to: emailUtilizador,
      subject: 'One Time Password',
      text: `Seu código de confirmação é: ${tempOTP}`
    };
  
    // Enviar o email
    await transporter.sendMail(mailOptions);

  // Depois de 30 segundos, elimina o valor da variável temporária
  setTimeout(() => {
    tempOTP = null;
  }, 30000);

  if(codigoConfirmacao === tempOTP){
    return true;
  } 
  
  return false;

}

module.exports = {enviarCodigoParaEmail};