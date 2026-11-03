const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "empleados",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("⚠️ Error conectando a MySQL en XAMPP:", err.message);
        console.log("Asegúrate de que Apache y MySQL estén iniciados en el Panel de Control de XAMPP.");
    } else {
        console.log("✅ Conexión exitosa a la base de datos 'empleados' en XAMPP.");
        connection.release();
    }
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const correo = req.body.correo;

    db.query(
        'INSERT INTO empleado(nombre,edad,pais,cargo,correo) VALUES(?,?,?,?,?)',
        [nombre, edad, pais, cargo, correo],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send("Empleado registrado con exito!!");
            }
        }
    );
});

app.get("/empleados", (req, res) => {
    db.query('SELECT * FROM empleado ORDER BY id ASC', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("corriendo el puerto 3001");
});
