module.exports = function (req, res, next) {
    if(typeof req.headers['authorization'] !== 'undefined') {
        const token = req.headers['authorization'].split(' ')[1]
        req.token = token
        next()
    }
    else {
        res.status(403).send({message: "Token no es valido"})
    }
}