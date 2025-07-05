require('dotenv').config();

const handle404Error = require('../middlewares/handle404Error')
const handleError = require('../middlewares/handleError');
const path = require('path');

// Servir arquivos estáticos da pasta public
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')  //Evita erros de Cors (Cross-Origin Resource Sharing)
const server = express()

server.use(express.static(path.join(__dirname, '../../public')));
server.use(cors())

const usuarioRoute = require('../routes/usuario.route');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use('/api/usuarios/', usuarioRoute)
server.use(handle404Error)
server.use(handleError)

server.listen(process.env.PORTA, function() {
    console.log(`BACKEND rodando na porta ${process.env.PORTA}...`)
})
