const express = require("express");
const bodyParser = require('body-parser');

const client = require('./connection');
const { query } = require("express");
const { Query } = require("pg");

const app = express();

const port = 1300;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server berjalan di port : ', port);
});

client.connect(err => {
    if (err) {
        console.log('Error', err.message);
    } else {
        console.log('Connected');
    }
});

app.get('/', (req, res) => {
    console.log('Sekarang berada pada halaman root');
    res.send({
        message: 'Sekarang berada pada halaman root'
    });
});

app.get('/getmhs', (req, res) => {
    client.query('SELECT * FROM mahasiswa', (err, result) => {
        if (err) {
            console.log('Terjadi error', err.message);
        } else {
            res.send(result.rows);
            console.log(result.rows);
        }
    });
});

app.get('/getmhs/:nim_mahasiswa', (req, res) => {
    const { nim_mahasiswa } = req.params;

    client.query(`SELECT * FROM mahasiswa WHERE nim_mahasiswa='${nim_mahasiswa}'`, (err, result) => {
        if (err) {
            console.log('Terjadi error', err.message);
        } else {
            res.send(result.rows);
            console.log(result.rows)
        }
    });
});

app.post("/postmhs", (req, res) => {
    const { nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa } = req.body;

    client.query(`INSERT INTO mahasiswa (nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa) VALUES
    ( '${nim_mahasiswa}', '${nama_mahasiswa}', '${alamat_mahasiswa}')`, (err, result) => {
        if (!err) {
            console.log('Insert Success', result);
            res.send({
                message: "Insert Success"
            });
        } else {
            console.log('Terjadi error', err.message);
            res.send({ message: "Error" })
        }
    });
});

app.put("/putmhs/:nim_mahasiswa", (req, res) => {
    const { nim_mahasiswa } = req.params;
    const { nama_mahasiswa, alamat_mahasiswa } = req.body;

    client.query(`UPDATE mahasiswa SET nama_mahasiswa = '${nama_mahasiswa}', alamat_mahasiswa = '${alamat_mahasiswa}'
    WHERE nim_mahasiswa= '${nim_mahasiswa}'`, (err, result) => {
        if (!err) {
            console.log('Update Success', result);
            res.send({
                message: "Update Success"
            });
        } else {
            console.log('Terjadi error', err.message);
        }
    });
});

app.delete("/deletemhs/:nim_mahasiswa", (req, res) => {
    const { nim_mahasiswa } = req.params;

    client.query(`DELETE FROM mahasiswa WHERE nim_mahasiswa= '${nim_mahasiswa}'`, (err, result) => {
        if (!err) {
            console.log('Delete Success', result);
            res.send({
                message: "Delete Success"
            });
        } else {
            console.log("Terjadi Error", err.message);
        }
    });
});
