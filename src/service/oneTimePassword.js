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
      host: 'mail.cursar.pt',
      port: 465,
      secure: true,
      auth: {
        user: 'geral@cursar.pt',
        pass: 'Cur$@r2022'
      }
    });
  
    // Define os detalhes do email xbpelxeibydzvafd
    const mailOptions = {
      from: '"Cursar" <geral@cursar.pt>',
      to: emailUtilizador,
      subject: 'Código de autenticação',
      text: `Olá, o seu código de autenticação é: ${tempOTP} \nEste código tem duração de 1 minuto, após o limite de tempo expirar, o código tornar-se-à inválido, o que vai implicar a reintrodução do endereço de e-mail.\n\nCursar`
    };
  
  // Enviar o email
  await transporter.sendMail(mailOptions);

  // Depois de 30 segundos, elimina o valor da variável temporária
  setTimeout(() => {
    tempOTP = null;
  }, 60000);

  if(codigoConfirmacao === tempOTP){
    return true;
  } 
  
  return false;

}

module.exports = {enviarCodigoParaEmail};