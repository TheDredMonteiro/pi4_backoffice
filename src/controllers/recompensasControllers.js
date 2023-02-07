var { Pontos_interesse, Regioes, Recompensas ,Tipos_pontos_interesse , Utilizadores} = require('../model/tabelas')
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

    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Recompensas.findAll({
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
    update_disponivel: async (req, res) => {

        const id = req.body.id
        const disponivel = req.body.disponivel



        await sequelize.sync()
            .then(async () => {
                await Recompensas
                    .update({
                        disponivel: disponivel
                    }, {
                        where: { id: id }
                    })
                    .then(() => res.status(200).json({ success: true, message: "Estado atualizado" }))
                    .catch(error => { res.status(400); throw new Error(error); });
            })


    },
    recompensa: async (req, res) => {
        // para filtrar por estado
        const id = req.query.id ?? ''
   

        await sequelize.sync()
            .then(async () => {

                const data = await Recompensas.findOne({
                    where: { id: id },
                    include: [
                        { model: Utilizadores }
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
    update: async (req, res) => {
        if (
            !req.body.recompensa ||
            !req.body.descricao ||
            !req.body.num_pontos||
            !req.body.fotografia||
            !req.body.id_utilizador||
            !req.body.validade
            
        ) {
            res.status(400).json({
                success: false,
                message: 'Faltam dados!'
            })
            return
        }

        const recompensa = req.body.recompensa
        const id = req.body.id
        const descricao = req.body.descricao
        const num_pontos = req.body.num_pontos
        const disponivel = req.body.disponivel
        const fotografia = req.body.fotografia
        const validade = req.body.validade
        const id_utilizador = req.body.id_utilizador
        await sequelize.sync()
            .then(async () => {
                await Recompensas
                    .update({
                        recompensa: recompensa,
                        descricao: descricao,
                        num_pontos: num_pontos,
                        fotografia: fotografia,
                        id_utilizador: id_utilizador,
                        validade: validade
                    },
                    {
                        where: { id: id }
                    })
                    
                    .then(() => res.status(200).json({ success: true, message: "Recompensa editada" }))
                    .catch(error => { res.status(400); throw new Error(error); });
            })
    },
    add: async (req, res) => {
        if (
            !req.body.recompensa ||
            !req.body.descricao ||
            !req.body.num_pontos||
            !req.body.fotografia||
            !req.body.id_utilizador||
            !req.body.validade
        ) {
            res.status(400).json({
                success: false,
                message: 'Faltam dados!'
            })
            return
        }
        console.log("b")
        const recompensa = req.body.recompensa
        const descricao = req.body.descricao
        const num_pontos = req.body.num_pontos
        const fotografia = req.body.fotografia
        const validade = req.body.validade
        const id_utilizador = req.body.id_utilizador
        await sequelize.sync()
            .then(async () => {
                await Recompensas
                    .create({
                       
                        recompensa: recompensa,
                        descricao: descricao,
                        num_pontos: num_pontos,
                        fotografia: fotografia,
                        id_utilizador: id_utilizador,
                        disponivel: 1,
                        validade: validade
                    },)
                    .then(() => res.status(200).json({ success: true, message: "Recompensa criada" }))
                    .catch(error => { res.status(400); throw new Error(error); });
            })
    },
}

