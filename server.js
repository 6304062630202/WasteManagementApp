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
    'SELECT * FROM wastes',
    function (err, results, fields) {
        res.json(results);
    },
  );
});

app.get('/api/waste/:param', function (req, res, next) {
  const param = req.params.param;
  const query = `
    SELECT * FROM wastes 
    WHERE waste_name LIKE ? OR waste_no = ? OR detail LIKE ?
  `;
  connection.query(
    query,
    [`%${param}%`, param, `%${param}%`],
    function (err, results) {
      res.json(results);
    },
  );
});

app.post('/login', (req, res) => {
  const sql = "INSERT INTO users (`username`, `password`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password
  ]
  db.query(sql, [values], (err, data) => {
    if(err) {
      return res.json("error")
    }
    return res.json(data);
  })
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000');
});