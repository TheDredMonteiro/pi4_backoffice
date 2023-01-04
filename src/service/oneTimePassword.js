const nodemailer = require('nodemailer');
var { Utilizadores, Utilizador_Roles } = require('../model/tabelas')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const sequelize = require('../model/db');
const { Op } = require("sequelize");
let tempOTP;

const emailEnviado = async (emailUtilizador) => {

  const randomOTP = Math.round(Math.random() * 10000).toString(10).padEnd(6, '0'); // Gera número aleatório no intervalo de 0 a 10000
  tempOTP = randomOTP; //Armazena o valor aleatório na variável temporária.

  // Cria um novo transporter usando o SMTP do Gmail.
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "df92db4fc15d4a",
      pass: "1edc7f490d1898"
    }
  });

  // Define os detalhes do email.
  const mailOptions = {
    from: '"Cursar" <cursar.pi4@gmail.com>',
    to: emailUtilizador,
    subject: 'Código de autenticação',
    text: `Olá, o seu código de autenticação é: ${tempOTP} \nEste código tem duração de 1 minuto, após o limite de tempo expirar, o código tornar-se-à inválido, o que vai implicar a reintrodução do endereço de e-mail.\n\nCursar`
  };
  /*await sequelize.sync()
            .then(async () => {
                await Utilizadores
                    .update({
                        codigo: tempOTP
                    }, {
                        where: { email: emailUtilizador }
                    })

            })



            .then(() => res.status(200).json({ success: true, message: "Classificação atualizada" }))*/
  await transporter.sendMail(mailOptions); // Enviar e-mail.

  // Depois de 1 minuto, elimina o valor da variável temporária.
  setTimeout(() => {
    tempOTP = null;
  }, 60000);

  return tempOTP;
}

// Compara o número o número gerado com o código enviado pelo utilizador e retorna um booleano.
const compareCodigo = (codigoConfirmacao) => {
  if (parseInt(tempOTP) === parseInt(codigoConfirmacao)) return true;
  return false;
}

module.exports = { emailEnviado, compareCodigo };