var { Pontos_interesse, Regioes, Tipos_pontos_interesse , Utilizadores,Recompensas, Reservas, Visitas} = require('../model/tabelas')
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

                const data = await Pontos_interesse.findAll({
                   
                    
                    include: [
                        {model: Utilizadores},
                        {model: Regioes},
                        {model: Tipos_pontos_interesse}
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
    addvisita: async (req, res) => {
        if (
            !req.body.data_visita ||
            !req.body.id_ponto_interesse ||
            !req.body.vagas
        ) {
            res.status(400).json({
                success: false,
                message: 'Faltam dados! É preciso regiao, id_utilizador e fotografia_1.'
            })
            return
        }

        const data_visita = req.body.data_visita
        const id_ponto_interesse = req.body.id_ponto_interesse
        const vagas = req.body.vagas

        await sequelize.sync()
            .then(async () => {
                await Visitas
                    .create({
                        data_visita: data_visita,
                        id_ponto_interesse: id_ponto_interesse,
                        id_utilizador: 1,
                        vagas: vagas,
                        N_reservas: 0
                    },)
                    .then(() => res.status(200).json({ success: true, message: "Visita criada" }))
                    .catch(error => { res.status(400); throw new Error(error); });
            })
    },
    listreservas: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'
        const id = req.query.id ?? ''

        await sequelize.sync()
            .then(async () => {

                const data = await Reservas.findAll({
                    where: { id_utilizador: id },
                    include: [
                        {model: Utilizadores}
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
    listvisitas: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'
        const id = req.query.id ?? ''

        await sequelize.sync()
            .then(async () => {

                const data = await Visitas.findAll({
                    where: { id_ponto_interesse: id },
                    include: [
                        {model: Pontos_interesse}
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
    selectvisita: async (req, res) => {
        // para filtrar por estado
        const id = req.query.id ?? ''

        await sequelize.sync()
            .then(async () => {

                const data = await Visitas.findAll({
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
    count: async (req, res) => {
        // para filtrar por estado
        const role = req.query.role ?? ""
        let response = {}

        await sequelize.sync()
            .then(async () => {

                await Pontos_interesse.count({
                    where: { id_tipo_ponto_interesse: role },
                })
                .then(count => { response = { ...response, count: count } })
            })
            res.json(response)
    },
    list1: async (req, res) => {
        // para filtrar por estado
        const id = req.query.id ?? ''
        

        await sequelize.sync()
            .then(async () => {

                const data = await Pontos_interesse.findOne({
                   
                    where: { id: id },
                    include: [
                        {model: Utilizadores},
                        {model: Regioes},
                        {model: Tipos_pontos_interesse}
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
    regiao2: async (req, res) => {
        // para filtrar por estado
        const id = req.query.id ?? ''

        await sequelize.sync()
            .then(async () => {

                const data = await Regioes.findOne({
                    where: { id: id },
                    include: [
                        { model: Utilizadores}
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
    listregiao: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Regioes.findAll({
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
    listtipo: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Tipos_pontos_interesse.findAll({
                   
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
    
}

