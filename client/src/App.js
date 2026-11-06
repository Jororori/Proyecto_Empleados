import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function App() {
  const [tabActiva, setTabActiva] = useState('empleados');
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("0");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleadosList] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", { nombre, edad, pais, cargo, correo }).then(() => {
      getEmpleados();
      limpiarCampo();
      MySwal.fire({ title: "¡Registro exitoso!", icon: "success", timer: 3000 });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", { id, nombre, edad, pais, cargo, correo }).then(() => {
      getEmpleados();
      limpiarCampo();
      MySwal.fire({ title: "¡Actualización exitosa!", icon: "success", timer: 3000 });
    });
  };

  const deleteEmple = (empId, empNombre) => {
    MySwal.fire({
      title: "¿Desea eliminar?",
      html: "¿Está seguro de eliminar a <strong>" + empNombre + "</strong>?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete("http://localhost:3001/delete/" + empId).then(() => {
          getEmpleados();
          limpiarCampo();
          MySwal.fire("¡Eliminado!", "", "success");
        });
      }
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre); setEdad(val.edad); setPais(val.pais); setCargo(val.cargo); setCorreo(val.correo); setId(val.id);
  };

  const limpiarCampo = () => {
    setNombre(""); setEdad("0"); setPais(""); setCargo(""); setCorreo(""); setId("");
    setEditar(false);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleadosList(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container App">
      <h2 className="text-center mb-4">GESTIÓN DE EMPLEADOS - SENATI</h2>
      
      <ul className="nav nav-tabs mb-4 justify-content-center">
        <li className="nav-item">
          <button className={"nav-link " + (tabActiva === 'empleados' ? 'active bg-primary text-white' : '')} onClick={() => setTabActiva('empleados')}>
            <i className="bi bi-people-fill me-1"></i> Empleados
          </button>
        </li>
        <li className="nav-item">
          <button className={"nav-link " + (tabActiva === 'proyectos' ? 'active bg-primary text-white' : '')} onClick={() => setTabActiva('proyectos')}>
            <i className="bi bi-kanban me-1"></i> Proyectos
          </button>
        </li>
        <li className="nav-item">
          <button className={"nav-link " + (tabActiva === 'salarios' ? 'active bg-primary text-white' : '')} onClick={() => setTabActiva('salarios')}>
            <i className="bi bi-cash-stack me-1"></i> Salarios
          </button>
        </li>
        <li className="nav-item">
          <button className={"nav-link " + (tabActiva === 'asignaciones' ? 'active bg-primary text-white' : '')} onClick={() => setTabActiva('asignaciones')}>
            <i className="bi bi-link-45deg me-1"></i> Asignaciones
          </button>
        </li>
      </ul>

      {tabActiva === 'empleados' && (
        <div>
          <div className="card mb-4 shadow">
            <div className="card-header bg-primary text-white">Registro de Empleados</div>
            <div className="card-body">
              <div className="input-group mb-3"><span className="input-group-text">Nombre:</span><input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} className="form-control" /></div>
              <div className="input-group mb-3"><span className="input-group-text">Edad:</span><input type="number" onChange={(e) => setEdad(e.target.value)} value={edad} className="form-control" /></div>
              <div className="input-group mb-3"><span className="input-group-text">País:</span><input type="text" onChange={(e) => setPais(e.target.value)} value={pais} className="form-control" /></div>
              <div className="input-group mb-3"><span className="input-group-text">Cargo:</span><input type="text" onChange={(e) => setCargo(e.target.value)} value={cargo} className="form-control" /></div>
              <div className="input-group mb-3"><span className="input-group-text">Correo:</span><input type="email" onChange={(e) => setCorreo(e.target.value)} value={correo} className="form-control" /></div>
            </div>
            <div className="card-footer text-muted">
              {editar ? (
                <div><button className="btn btn-warning m-2" onClick={update}>Actualizar</button><button className="btn btn-info m-2" onClick={limpiarCampo}>Cancelar</button></div>
              ) : (
                <button className="btn btn-success" onClick={add}>Registrar</button>
              )}
            </div>
          </div>

          <table className="table table-striped table-bordered text-center shadow">
            <thead className="table-dark">
              <tr>
                <th>#</th><th>Nombre</th><th>Edad</th><th>País</th><th>Cargo</th><th>Correo</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleadosList.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td><td>{val.nombre}</td><td>{val.edad}</td><td>{val.pais}</td><td>{val.cargo}</td><td>{val.correo}</td>
                  <td>
                    <button className="btn btn-info btn-sm m-1" onClick={() => editarEmpleado(val)}>Editar</button>
                    <button className="btn btn-danger btn-sm m-1" onClick={() => deleteEmple(val.id, val.nombre)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
