const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
var mysql = require("mysql2");

const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usersreg",
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/", function (req, res) {
  res.send("Welcome to the server");
});

app.post("/add", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    var query = `INSERT INTO fun VALUES('${req.body.name}')`;
    con.query(query, function (err, result, fileds) {
      if (err) throw err;
      console.log("Inserted");
      res.send("Value Inserted");
    });
  });
});

app.post("/find", function (req, res) {
  var memList = [];
  con.connect(function (err) {
    if (err) throw err;
    var query = `SELECT * FROM fun where name LIKE '${req.body.name}%'`;
    con.query(query, function (err, result, fileds) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        var mem = {
          name: result[i].name,
        };

        memList.push(mem);
      }
      console.log(memList);
      res.render("show.pug", { memList: memList });
    });
  });
});

app.post("/show", function (req, res) {
  var memList = [];
  con.connect(function (err) {
    if (err) throw err;
    var query = `SELECT * FROM fun`;
    con.query(query, function (err, result, fileds) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        var mem = {
          name: result[i].name,
        };

        memList.push(mem);
      }
      console.log(memList);
      //res.send(result);
      res.render("show.pug", { memList: memList });
    });
  });
});

app.get("/showing", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    var query = `SELECT * FROM fun`;
    con.query(query, function (err, result, fileds) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.post("/show1", function (req, res) {
  var data = req.body.val;
  console.log(data);
  res.send(data);
});

app.listen(port, () => {
  console.log("connected to port");
});
