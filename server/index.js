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

app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const correo = req.body.correo;

    db.query(
        'UPDATE empleado SET nombre=?, edad=?, pais=?, cargo=?, correo=? WHERE id=?',
        [nombre, edad, pais, cargo, correo, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send("Empleado Actualizo con exito!!");
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM empleado WHERE id=?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/proyectos", (req, res) => {
    db.query('SELECT * FROM proyectos ORDER BY id ASC', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post("/proyectos/create", (req, res) => {
    const { nombre_proyecto, descripcion } = req.body;
    db.query('INSERT INTO proyectos(nombre_proyecto, descripcion) VALUES(?, ?)', [nombre_proyecto, descripcion], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Proyecto registrado con éxito!");
    });
});

app.delete("/proyectos/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM proyectos WHERE id=?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.get("/salarios", (req, res) => {
    const sql = `
        SELECT s.*, e.nombre AS empleado_nombre, e.cargo 
        FROM salario s 
        JOIN empleado e ON s.empleado_id = e.id 
        ORDER BY s.fecha_actualizacion DESC
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post("/salarios/create", (req, res) => {
    const { empleado_id, monto, fecha_actualizacion } = req.body;
    db.query(
        'INSERT INTO salario(empleado_id, monto, fecha_actualizacion) VALUES(?, ?, ?)',
        [empleado_id, monto, fecha_actualizacion],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send("Salario registrado con éxito!");
        }
    );
});

app.get("/empleado-proyectos", (req, res) => {
    const sql = `
        SELECT ep.empleado_id, ep.proyecto_id, e.nombre AS empleado_nombre, e.cargo, p.nombre_proyecto 
        FROM empleado_proyecto ep
        JOIN empleado e ON ep.empleado_id = e.id
        JOIN proyectos p ON ep.proyecto_id = p.id
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post("/empleado-proyectos/create", (req, res) => {
    const { empleado_id, proyecto_id } = req.body;
    db.query(
        'INSERT INTO empleado_proyecto(empleado_id, proyecto_id) VALUES(?, ?)',
        [empleado_id, proyecto_id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send("Empleado asignado al proyecto exitosamente!");
        }
    );
});

app.post("/empleado-proyectos/delete", (req, res) => {
    const { empleado_id, proyecto_id } = req.body;
    db.query(
        'DELETE FROM empleado_proyecto WHERE empleado_id=? AND proyecto_id=?',
        [empleado_id, proyecto_id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        }
    );
});

app.listen(3001, () => {
    console.log("corriendo el puerto 3001");
});
