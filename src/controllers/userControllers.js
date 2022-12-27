const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const {conexaoBaseDados} = require('../../config/database');

const login = (req, res) => {
    const {email} = req.body;
    if(!email) {
        res.status().json({response: 'É necessário e-mail!'});
    } else {
        const verificarEmail = 'SELECT Email FROM Utilizadores WHERE Email = $1';
        conexaoBaseDados.query(verificarEmail, [email], (erro, resultado) => {
            if(erro){
                res.status().json({response: 'Problema no servidor'});
            } else {
                if(resultado.rowCount > 0){
                    //gera um número aleatório e guarda na variavel otp.
                    const oneTimePassword = ; //OTP - one time password (password de uso único).
                    const 
                } else {
                    const novoUtilizador = 'INSERT INTO Utilizadores (email) VALUES ($1)';
                    conexaoBaseDados.query(novoUtilizador, [email], (erro, resultado) => {
                        if(erro){
                            res.status().json({response: 'Problema no servidor', erro})
                        } else {
                            res.status().json({response: resultado})
                        }
                    });
                }
            };
        });
    };
};

module.exports = {
    login
}

