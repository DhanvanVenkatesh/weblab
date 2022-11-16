const sql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(cors()) normal retrieval
app.use(cors({ origin: "http://127.0.0.1:5500" })); //for displaying in a neat table format
var con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sdetail",
});
app.get("/", function (req, res) {
  console.log("connection created");
});
app.post("/form", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("connection created");
    var query1 = `insert into student VALUES('${req.body.fname}','${req.body.lname}','${req.body.age}')`;
    con.query(query1, function (err) {
      if (err) throw err;
      console.log("inserted");
    });
  });
});
app.post("/form1", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("displaying");

    var query2 = `select * from student`;
    con.query(query2, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});
app.get("/form1", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("displaying");

    var query2 = `select * from student`;
    con.query(query2, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});
app.listen(port, () => {
  console.log("connected");
});
