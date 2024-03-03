'use strict'

let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

//Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//.Env
require('dotenv').config();
let port = process.env.PORT || 4000;

//Static files
app.use(express.static(__dirname + '/public'));

//Views
app.set('view engine', 'ejs'),
    app.set('views', __dirname + '/views/');

//Routes
app.use('/', require('./router/rutas'));
app.use('/chars', require('./router/chars'));

const user = 'ilernabasura';
const password = 'f4TevtWBVa5a44zj';
const dbname = 'GOT';
const uri = `mongodb+srv://${process.env.user}:${process.env.password}@mongodb-f.aqsulkg.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;

//MongoDB
mongoose.connect(uri,
    {}
)

    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

app.use((req, res) => {
    res.status(404).render('404', {
        titulo: "Error 404",
        descripcion: "Página no encontrada"
    })
})

    .listen(port)

console.log('Iniciando Express en el puerto 3000')