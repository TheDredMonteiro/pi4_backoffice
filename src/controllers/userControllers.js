var { Utilizadores, Utilizadores_Roles } = require('../model/tabelas')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const oneTimePassword = require('../service/oneTimePassword');
const sequelize = require('../model/db');
const { Op } = require("sequelize");
const { StatusCodes } = require('http-status-codes');
const { conexaoBaseDados } = require('../../config/database');
const { emailEnviado, compareCodigo } = require('../service/oneTimePassword');
//import OTP from '../service/oneTimePassword'
module.exports = {

    login: async (req, res) => {


        const email = req.query.email ?? 'teste@gmail.com'
        console.log(email)
        let user = await Utilizadores
            .findOne({ where: { email: email } })
            .then(data => { return data })
            .catch(error => { console.log(error) })

        console.log(user)



        if (!!user) {
            emailEnviado(email)
            res.status(200).json({
                success: true,
                message: 'Autenticação realizada com sucesso!'
            });
            return


        }


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
        /*if(user.id_role == 4)
        {
            
            res.status(400).json({
                success: false,
                message: 'Utilizadores não têm acesso a parte de gestão.'
            });
            return
        }
        else if(user.estado == "false")
        {
            res.status(401).json({
                success: false,
                message: 'Esta conta está desativada'
            });
            return
        }
        else
        {*/
        if ((user.id_role != 4) && (user.estado != "false")) {

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
        }

        //}
        res.status(403).json({
            success: false,

            message: 'Dados inválidos.'
        });

    },
    update_password: async (req, res) => {

        const email = req.body.email
        const passA = req.body.passA
        const passN = req.body.passN
        let user = await Utilizadores
            .findOne({ where: { email: email } })
            .then(data => { return data })
            .catch(error => { console.log(error) })

        if (user.password == passA) {

            await sequelize.sync()
                .then(async () => {
                    await Utilizadores
                        .update({
                            password: passN
                        }, {
                            where: { email: email }
                        })
                        .then(() => res.status(200).json({ success: true, message: "Password Atualizada" }))
                        .catch(error => { res.status(400); throw new Error(error); });
                })

        }




    },
    login2: async (req, res) => {

        let email, password = null

        if (!!req.body.email && !!req.body.password) {
            email = req.body.email
            password = req.body.password
        } else {
            res.status(403).json({
                success: false,
                message: 'Dados necessários: email e password'
            });
            return
        }

        let user = await Utilizadores
            .findOne({ where: { email: email } })
            .then(data => { return data })
            .catch(error => { console.log(error) })

        console.log(user)



        if (!!user) {
            console.log("b")
            if (user.password == password) {
                console.log("a")
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
            }
        }

        res.status(403).json({
            success: false,
            message: 'Dados inválidos.'
        });
    },
    verificaCodigo: async (req, res) => {
        console.log("entrou verifica");
        const { otp } = req.body;
        if (compareCodigo(otp)) {
            res.status(StatusCodes.OK).json({ success: true, response: true });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Código incorreto, verifique o seu correio eletrónico!' });
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
    update: async (req, res) => {

        
        const nome = req.body.nome
        const email = req.body.email
        const nif = req.body.nif
        const fotografia = req.body.fotografia
        const pontos = req.body.pontos
        const id_role = req.body.id_role
        const data_nascimento = req.body.data_nascimento
        const password = req.body.password
        const id = req.body.id

        console.log(id);

        await sequelize.sync()
            .then(async () => {
                await Utilizadores
                    .update({
                        nome: nome,
                        email: email,
                        nif: nif,
                        fotografia: fotografia,
                        pontos: pontos,
                        id_role: id_role,
                        data_nascimento: data_nascimento,
                        password: password
                    }, {
                        where: { id: id }
                    })
                    .then(() => res.status(200).json({ success: true, message: "Estado atualizado" }))
                    .catch(error => { res.status(400); throw new Error(error); });
            })


    },
    utilizador: async (req, res) => {
        const id = req.query.id ?? ''

        await sequelize.sync()
            .then(async () => {

                const data = await Utilizadores.findOne({
                    where: { id: id },
                    include: [
                        { model: Utilizadores_Roles}
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
    agente: async (req, res) => {
        // para filtrar por estado
        const id = req.query.id ?? ''

        await sequelize.sync()
            .then(async () => {

                const data = await Utilizadores.findOne({
                    where: { id: id },
                    include: [
                        { model: Utilizadores_Roles}
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
    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Utilizadores.findAll({
                    include: [
                        { model: Utilizadores_Roles }
                    ],
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
    roles: async (req, res) => {
        // para filtrar por estado


        await sequelize.sync()
            .then(async () => {

                const data = await Utilizadores_Roles.findAll({
      
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

