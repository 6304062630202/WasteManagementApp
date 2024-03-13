var express = require('express');
var cors = require('cors');
var app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'u668026124_WasteManage',
});

app.use(cors());

app.get('/api/waste', function (req, res, next) {
  connection.query(
    'SELECT * FROM Wastes',
    function (err, results, fields) {
        res.json(results);
    },
  );
});

app.get('/api/waste/:waste_no', function (req, res, next) {
  const waste_no = req.params.waste_no;
  connection.query(
    'SELECT * FROM Wastes WHERE waste_no = ?',
    [waste_no],
    function (err, results) {
      res.json(results[0]);
    },
  );
});

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000');
});