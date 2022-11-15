const express = require("express");
const app = express();
var alert = require("alert");
var fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.post("/login", function (req, res) {
  console.log(`${req.body.email}`);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfully");
    var sql = `SELECT * FROM sign WHERE email='${req.body.email}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;

      if (result.length != 0) {
        var row = result[0];
        var pswd = row.pswd;
        if (`${req.body.pswd}` == pswd) {
          console.log("Login successfull");
          console.log(pswd);
          alert("LOGIN SUCCESSFULL");
        } else {
          console.log("INCORRECT CREDENTIALS");
          alert("INCORRECT CREDENTIALS");
        }
      }
    });
  });
});

app.get("/find", (req, res) => {
  con.query("select * from fun;", function (err, results, fields) {
    if (err) throw err;
    res.send(results);
    //     fs.writeFile('table.json', JSON.stringify(results), function (err) {
    //       if (err) throw err;
    //       console.log('Saved!');
    //     });
    // res.send(results);
    // res.send("GET Request Called")
  });
});

app.post("/signup", function (req, res) {
  console.log(`${req.body.user}`);
  console.log(`${req.body.email}`);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected Successfully");
    var sql = `INSERT INTO sign VALUES('${req.body.user}','${req.body.email}','${req.body.pswd}')`;
    con.query(sql, function (err) {
      if (err) throw err;
      console.log("Inserted Successfully!");
      alert("INSERTED SUCCESSFULLY");
    });
  });
});

app.listen(port, () => {
  console.log(`server is running in port ${port}.`);
});
