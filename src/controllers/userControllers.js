var { Utilizadores, Utilizador_Roles } = require('../model/tabelas')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const oneTimePassword = require('../service/oneTimePassword');
const sequelize = require('../model/db');
const { Op } = require("sequelize");
const {StatusCodes} = require('http-status-codes');
const {conexaoBaseDados} = require('../../config/database');
const { emailEnviado, compareCodigo } = require('../service/oneTimePassword');
//import OTP from '../service/oneTimePassword'
module.exports = {

    login: async (req, res) => {
        console.log("usercontrollers login");
        const {email} = req.body;
        if(!email) {
            res.status(StatusCodes.BAD_REQUEST).json({response: 'É necessário e-mail!'});
        } else {
            const verificarEmail = 'SELECT Email FROM Utilizadores WHERE Email = $1';
            conexaoBaseDados.query(verificarEmail, [email], (erro, resultado) => {
                if(erro){
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({erro: 'Problema no servidor! Houve algum erro ao verificar o correio eletrónico.'});
                } else {
                    if(resultado.rowCount > 0){
                        if(emailEnviado(email)){
                           res.status(StatusCodes.OK).json({ resultado });
                        } else {
                            res.status(StatusCodes.FORBIDDEN).json({response: 'Problema no envio do código de confirmação!'});
                        }
                    } else {
                        const novoUtilizador = 'INSERT INTO Utilizadores (email) VALUES ($1)';
                        conexaoBaseDados.query(novoUtilizador, [email], (erro, resultado) => {
                            if(erro){
                                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({response: 'Problema no servidor, não foi possível fazer o registo!', erro});
                            } else {
                                res.status(StatusCodes.OK).json({ resultado });
                            };
                        });
                    };
                };
            });
        };
    },

    login1: async (req, res) => {

        let email = null
        let codigo = null

        if (!!req.body.email) {
            email = req.body.email
        } else {
            res.status(403).json({
                success: false,
                message: 'Dados necessários: email'
            });
            return
        }

        let user = await Utilizadores
            .findOne({ where: { email: email } })
            .then(data => { return data })
            .catch(error => { console.log(error) })

        console.log(user)

            let token = jwt.sign({ email: email }, config.JWT_SECRET,
                // { expiresIn: '24h' }
            );

            res.status(200).json({
                success: true,
                message: 'Autenticação realizada com sucesso!',
                token: token,
                username: user.nome,
                role: user.id_role,
                id: user.id,
                email: user.email
            });
            return
        
    },
    verificaCodigo: async (req, res) => {
        console.log("entrou verifica");
        const { otp } = req.body;
        if(compareCodigo(otp)){
            res.status(StatusCodes.OK).json({success: true, response: true });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Código incorreto, verifique o seu correio eletrónico!'});
        }
    },
    update_estado: async (req, res) => {
       
        const id = req.body.id 
        const estado = req.body.estado 

    

        await sequelize.sync()
            .then(async () => {
                await Utilizadores
                .update({
                    estado: estado
                }, {
                    where: { id: id }
                })
                .then(() => res.status(200).json({ success: true, message: "Estado atualizado" }))
                .catch(error => { res.status(400); throw new Error(error); });
            })


    },
    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Utilizadores.findAll({
                    order: [
                        [filtro, ordem]
                    ]
                })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
            })
    },
   /* list: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await User
                    .findAll({
                        attributes: ['username', 'email'],
                        include: {
                            model: UserRole,
                            attributes: ['descricao', 'obs']
                        }
                    })
                    .then(data => { res.json({ success: true, data }) })
                    .catch(error => { return error })
            })

    },*/

    register: async (req, res) => {
        if (
            !req.body.username ||
            !req.body.email ||
            !req.body.password ||
            !req.body.role
        ) {
            res.status(400).json({
                success: false,
                message: 'Faltam dados! É preciso username, email, password, e role.'
            })
            return
        }

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const role = req.body.role

        await sequelize.sync()
            .then(async () => {

                let userJaExiste = await UserIncommun
                    .findOne({
                        where: {
                            [Op.or]: [
                                { email: email },
                                { username: username }
                            ]
                        }
                    })

                if (userJaExiste) {
                    res.json({
                        success: false,
                        message: 'Utilizador com esse email já existe.'
                    })
                    return
                }

                await UserIncommun
                    .create({
                        username: username,
                        email: email,
                        password: password,
                        role_id: role
                    })
                    .then(data => {
                        res.status(200).json({
                            success: true,
                            message: "Utilizador registado com sucesso!",
                            data
                        });
                    })
                    .catch(error => { throw new Error(error) })

            })
    },

    delete: async (req, res) => {
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'Faltam dados! É preciso email.'
            })
            return
        }

        const email = req.body.email

        await sequelize.sync()
            .then(async () => {
                await UserIncommun
                    .findOne({ where: { email: email } })
                    .then(async found => {
                        if (!!found) {
                            await UserIncommun
                                .destroy({ where: { email: email } })


                                .then(destroyed => {
                                    res.json({
                                        success: true,
                                        message: 'Utilizador eliminado.'
                                    })
                                })
                        }

                        else {
                            res.json({
                                success: false,
                                message: 'Utilizador não encontrado.'
                            })
                        }
                    })
            })
    },
}

