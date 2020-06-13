const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authToken = require('../middlewares/authToken')
const models = require('../models');

/* Traer todas las tareas (solo administrador) */
router.get('/', authToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
        if(err) {
            res.status(403).send(err)
        }
        else if(decoded.role_name == 'administrador') {
            models.todo.findAll({
                include: [models.todo_status, models.user],
                attributes: {exclude: [models.user.password]}    
            })
            .then(todos => {
                res.send(todos)
            })
            .catch(err => {
                res.send(err)
            })
        }
        else {
            res.status(403).send({message: 'Usted NO es el administrador'})
        }
    })
})

/* Traer tarea en especifico */
router.get('/:id', authToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
        if(err) {
            res.status(403).send(err)
        }
        else {
            models.todo.findOne({
                where: {
                    id: req.params.id,
                    user_id: decoded.id
                },
                include: [models.todo_status, models.user],
                attributes: {exclude: [models.user.password]}    
            })
            .then(todo => {
                if(!todo){
                    res.send(403)
                }
                else {
                    res.send(todo)
                }
            })
            .catch(err => {
                res.send(err)
            })
        }
    })
})

/* Traer todas las tareas del usuario autenticado */
router.get('/user/:id', authToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
        if(decoded.id == req.params.id || decoded.role_name == 'administrador'){
            models.todo.findAll({
                where: {
                    user_id: req.params.id
                },
                include: [models.todo_status],
            })
            .then(todos => {
                res.send(todos)
            })
            .catch(err => {
                res.send(err)
            })
        }
        else if(err){
            res.status(403).send(err)
        }
        else{
            res.status(403).send({message: 'Usted NO es el administrador'})
        }
    })
})

/* Crear nueva tarea (solo administrador) */
router.post('/', authToken, (req,res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
        if(err) {
            res.status(403).send(err)
        }
        else if(decoded.role_name == 'administrador') {
            var data = req.body
            models.todo.create(data)
            .then(todo => {
                res.send("tarea creada exitosamente")
            })
            .catch(err => {
                res.send(err)
            })
        }
        else {
            res.status(403).send({message: 'Usted NO es el administrador'})
        }
    })
})

/* Modificar tarea */
router.put('/:id', authToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
        if(err) {
            res.status(403).send(err)
        }
        else {
            models.todo.findOne({
                where: {
                    id: req.params.id
                },
            })
            .then(todo => {
                todo.update(
                    {   
                        title: req.body.title,
                        status_id: req.body.status_id
                    }
                )
                res.send("tarea actualizada exitosamente")
            })
            .catch(err => {
                res.send(err)
            })
        }
    })
})

/* Eliminar Tarea  (solo administrador) */
router.delete('/:id', authToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
        if(err) {
            res.status(403).send(err)
        }
        else if(decoded.role_name == 'administrador') {
            models.todo.findOne({
                where: {
                    where: {id: req.params.id}
                },
                include: [models.todo_status, models.user],
                attributes: {exclude: [models.user.password]}    
            })
            .then(todo => {
                todo.destroy()
                res.send("tarea eliminada exitosamente")
            })
            .catch(err => {
                res.send(err)
            })
        }
        else{
            res.status(403).send({message: 'Usted NO es el administrador'})
        }
    })
})

// Formato tareas
// id
// titulo
// id estado
// nombre estado
module.exports = router;