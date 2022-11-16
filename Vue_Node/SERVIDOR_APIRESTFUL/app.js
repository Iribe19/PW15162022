var express = require('express')
var mysql = require('mysql')

var app = express()

app.get('/', function(req, res){
    res.send('Ruta de inicio de servidor')
})

app.listen('3000', function(){
    console.log('servidor en linea... Ok en el Puerto 3000')
})


// let express = require('express')
// let mysql = require('mysql')
// let app = express()
// let puerto = 3000
// app.listen(puerto, function(){
//     console.log("Servidor en línea")
// })