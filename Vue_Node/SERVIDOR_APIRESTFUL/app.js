var express = require('express')
var mysql = require('mysql')

//Que el cliente Fronted pueda usar la API
let cors = require('cors')
let app = express()
//Recibir datos JS0N
app.use(express.json())

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

//Base de datos
//Parametros de conexión
let conexion=mysql.createConnection({
    host: 'localhost',
    user: 'pw',//Igualmente se puede usar con el user: 'root', password: ''
    password: '12345678',
    database: 'pw'
})
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log('Conectado a la BD')
    }
})

//Rutas
//Ruta de inicio - raíz
app.get('/', function(req, res){
    res.send('Ruta de inicio de servidor')
})
//Ruta a todos los articulos
app.get('/api/articulos', function(req, res){
    conexion.query("SELECT * FROM articulos", function(error, filas){
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})
//Ruta a un articulos
app.get('/api/articulos/:id', function(req, res){
    conexion.query("SELECT * FROM articulos WHERE id=?",[req.params.id], function(error, fila){//params: comjunto de parametros que vienen en la ruta, en ese codigo, pide el parametro id
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})
//Ruta para agregar un artículo
app.post('/api/articulos',function(req,res){
    let data = {descripcion:req.body.descripcion,
                precio:req.body.precio,
                cantidad:req.body.cantidad}
    let sql="INSERT INTO articulos SET ?"
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//Ruta para actualizar articulo
app.put('/api/articulos/:id', function(req, res){
    let id = req.params.id
    let descripcion = req.body.descripcion
    let precio = req.body.precio
    let cantidad = req.body.cantidad
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, cantidad = ? WHERE id = ?";
    conexion.query(sql,[descripcion, precio, cantidad, id], function(error, results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//Ruta para eliminar un articulo
app.delete('/api/articulos/:id', function(req, res){
    let id = req.params.id
    conexion.query('DELETE FROM articulos WHERE id = ?', [id], function(error, results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    });
})
//Para agregar un nuevo registro es post y para actualizar uno existente es put