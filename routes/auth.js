const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')
const router = express.Router()
require('dotenv').config()

/* Almacena los refresh token para volver a generar el token */
/* Usar Redis o almacenar el refresh token en la DB al pasar a produccion */
let refreshTokens = []

router.post('/register', (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role_id: 2
    }
    models.user.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(usuario => {
        if(!usuario) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                models.user.create(userData)
                .then(usuario => {
                    res.status(200).send("User registered!")
                })
                .catch(err => {
                    res.status(400).send({error: err})
                })
            })
        }
        else {
            res.status(409).send("User already exist")
        }
    }).catch(err => {
        res.status(400).send({error: err})
    })
})

router.post('/login', (req, res) => {
    models.user.findOne({
        where: {
            email: req.body.email
        },
        include: [models.role]
    })
    .then(user => {
        if(user) {
            const data = {
                id: user.dataValues.id,
                role_id: user.role.dataValues.id,
                role_name: user.role.dataValues.name,
                name: user.dataValues.name,
                email: user.dataValues.email
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let accessToken = generateToken(data)
                let refreshToken = jwt.sign(data, process.env.JWT_REFRESH_KEY)
                refreshTokens.push(refreshToken)
                res.status(200).send({accessToken: accessToken, refreshToken: refreshToken})
            }
        }
        else {
            res.status(400).send({error: 'Usuario no existe'})
        }
    })
    .catch(err => {
        res.status(400).send({error: err})
    })
})

router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
        if(err) return res.sendStatus(403)
        let accessToken = generateToken(data)
        res.status(200).send({accessToken: accessToken})
    })
})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

function generateToken(user){
    //expiresIn: 1440
    if(user.iat) delete user.iat
    console.log(user)
    return jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: '15s'})
}

module.exports = router;
