const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {conexaoBaseDados} = require('../../config/database');
const { gerarPasswordUsoUnico } = require('../service/oneTimePassword');

const login = (req, res) => {
    const {email} = req.body;
    if(!email) {
        res.status(401).json({response: 'É necessário e-mail!'});
    } else {
        const verificarEmail = 'SELECT Email FROM Utilizadores WHERE Email = $1';
        conexaoBaseDados.query(verificarEmail, [email], (erro, resultado) => {
            if(erro){
                res.status(500).json({response: 'Problema no servidor'});
            } else {
                if(resultado.rowCount > 0){
                    //gera um número aleatório e guarda na variavel otp.
                    if(gerarPasswordUsoUnico(oneTimePassword)){
                        res.status(200).json({resultado});
                    } else {
                        res.status(401).json({response: 'Código de confirmação inválido, verifique ou tente novamente!'});
                    }
                } else {
                    const novoUtilizador = 'INSERT INTO Utilizadores (email) VALUES ($1)';
                    conexaoBaseDados.query(novoUtilizador, [email], (erro, resultado) => {
                        if(erro){
                            res.status(500).json({response: 'Problema no servidor', erro})
                        } else {
                            res.status(200).json({response: resultado})
                        };
                    });
                }
            };
        });
    };
};

module.exports = {
    login
}

