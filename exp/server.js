const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var mysql = require('mysql2')
const port = 3000

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hostel'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(cors())

app.get('/',function(req,res){
    console.log("welcome to hostel")
})

app.post('/form',function(req,res){
    con.connect(function(err){
        if (err) throw err
        var query = `INSERT INTO student VALUES('${req.body.name}')`
        con.query(query,function(err){
            if (err) throw err
            console.log("Inserted")
        })
    })
})


app.post('/view',function(req,res){
    con.connect(function(err){
        if (err) throw err
        var query1 = `SELECT * FROM student`
        con.query(query1,function(err,result,fields){
            if (err) throw err
            console.log(result)
            res.send(result)
        })
    })
})

app.listen(port,() => {
    console.log("Listening to port")
})