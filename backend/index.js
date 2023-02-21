const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mysqlConfig = {
  host: "database",
  port: 3306,
  user: "user",
  password: "user@password",
  database: "prova",
};

let con = null;

app.get("/", (req, res) => {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) {
      res.json({ message: "Server is running, db connection error" });
      console.log(err);
    } else {
      res.json({ message: "Server is running correctly, db connnected" });
    }
  });
});

app.get("/brand", (req, res) => {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) {
      res.json({ message: "Server is running, db connection error" });
      console.log(err);
    } else {
      con.query("SELECT * FROM brands", function (err, results, fields) {
        if (err) {
          res.json({ message: "error occurred" });
          console.log(err);
        } else {
          res.json(results);
        }
      });
    }
  });
});

app.post("/brand", (req, res) => {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) {
      res.json({ message: "Server is running, db connection error" });
      console.log(err);
    } else {
      con.query(
        `INSERT INTO brands(brand_name) VALUES(?)`,
        req.body.brand_name.toString(),
        function (err, results, fields) {
          if (err) {
            res.json({ message: "error occurred" });
            console.log(err);
          } else {
            res.json({
              brand_id: results.insertId,
              brand_name: req.body.brand_name,
            });
          }
        }
      );
    }
  });
});

app.put("/brand", (req, res) => {
  con = mysql.createConnection(mysqlConfig);

  con.connect(function (err) {
    if (err) {
      res.json({ message: "Server is running, db connection error" });
      console.log(err);
    } else {
      con.query(
        `UPDATE brands SET brand_name = '${req.body.brand_name}' WHERE brand_id = ${req.body.brand_id}`,
        function (err, results, fields) {
          if (err) {
            res.json({ message: "error occurred" });
            console.log(err);
          } else {
            res.json({
              brand_id: req.body.brand_id,
              brand_name: req.body.brand_name,
            });
          }
        }
      );
    }
  });
});

app.delete("/brand", (req, res) => {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) {
      res.json({ message: "Server is running, db connection error" });
      console.log(err);
    } else {
      con.query(
        `DELETE FROM brands WHERE brand_id = ${req.body.brand_id}`,
        function (err, results, fields) {
          if (err) {
            res.json({ message: false });
            console.log(err);
          } else {
            res.json({ message: true });
          }
        }
      );
    }
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Successfully loaded");
});
