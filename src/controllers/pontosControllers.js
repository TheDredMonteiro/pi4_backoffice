var { Pontos_interesse, Regioes, Tipos_pontos_interesse , Utilizadores} = require('../model/tabelas')
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
                        {model: Utilizadores}
                    ],
                    include: [
                        {model: Regioes}
                    ],
                    include: [
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

