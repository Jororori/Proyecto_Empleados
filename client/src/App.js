import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");
  const [empleadosList, setEmpleados] = useState([]);

  return (
    <div className="container App">
      <h2 className="text-center mb-4">GESTIÓN DE EMPLEADOS - SENATI</h2>
      <div className="card">
        <div className="card-header bg-primary text-white">Registro de Empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre:</span>
            <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} className="form-control" placeholder="Ingrese nombre" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Edad:</span>
            <input type="number" onChange={(e) => setEdad(e.target.value)} value={edad} className="form-control" placeholder="Ingrese edad" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">País:</span>
            <input type="text" onChange={(e) => setPais(e.target.value)} value={pais} className="form-control" placeholder="Ingrese país" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cargo:</span>
            <input type="text" onChange={(e) => setCargo(e.target.value)} value={cargo} className="form-control" placeholder="Ingrese cargo" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Correo:</span>
            <input type="email" onChange={(e) => setCorreo(e.target.value)} value={correo} className="form-control" placeholder="Ingrese correo" />
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-success">Registrar Empleado</button>
        </div>
      </div>
    </div>
  );
}

export default App;
