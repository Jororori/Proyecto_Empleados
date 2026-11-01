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
      <div className="card text-center">
        <div className="card-header">Panel de Registro</div>
        <div className="card-body">
          <p className="text-muted">Formulario de registro en inicialización...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
