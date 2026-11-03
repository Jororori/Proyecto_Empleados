import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleados] = useState([]);

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre, edad, pais, cargo, correo
    }).then(() => {
      getEmpleados();
      limpiarCampos();
    });
  };

  const limpiarCampos = () => {
    setNombre(""); setEdad(""); setPais(""); setCargo(""); setCorreo(""); setId("");
    setEditar(false);
  };

  return (
    <div className="container App">
      <h2 className="text-center mb-4">GESTIÓN DE EMPLEADOS - SENATI</h2>
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Registro de Empleados</div>
        <div className="card-body">
          <div className="input-group mb-3"><span className="input-group-text">Nombre:</span><input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} className="form-control" placeholder="Ingrese nombre" /></div>
          <div className="input-group mb-3"><span className="input-group-text">Edad:</span><input type="number" onChange={(e) => setEdad(e.target.value)} value={edad} className="form-control" placeholder="Ingrese edad" /></div>
          <div className="input-group mb-3"><span className="input-group-text">País:</span><input type="text" onChange={(e) => setPais(e.target.value)} value={pais} className="form-control" placeholder="Ingrese país" /></div>
          <div className="input-group mb-3"><span className="input-group-text">Cargo:</span><input type="text" onChange={(e) => setCargo(e.target.value)} value={cargo} className="form-control" placeholder="Ingrese cargo" /></div>
          <div className="input-group mb-3"><span className="input-group-text">Correo:</span><input type="email" onChange={(e) => setCorreo(e.target.value)} value={correo} className="form-control" placeholder="Ingrese correo" /></div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-success" onClick={add}>Registrar Empleado</button>
        </div>
      </div>

      <table className="table table-striped table-bordered text-center shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th><th>Nombre</th><th>Edad</th><th>País</th><th>Cargo</th><th>Correo</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td><td>{val.nombre}</td><td>{val.edad}</td><td>{val.pais}</td><td>{val.cargo}</td><td>{val.correo}</td>
              <td><button className="btn btn-info btn-sm m-1">Editar</button><button className="btn btn-danger btn-sm m-1">Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
