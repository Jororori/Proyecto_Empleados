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

app.listen(3001, () => {
    console.log("corriendo el puerto 3001");
});
