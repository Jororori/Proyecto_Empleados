import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  const [proyectosList, setProyectosList] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcionProyecto, setDescripcionProyecto] = useState("");

  const [salariosList, setSalariosList] = useState([]);
  const [salarioEmpleadoId, setSalarioEmpleadoId] = useState("");
  const [salarioMonto, setSalarioMonto] = useState("");
  const [salarioFecha, setSalarioFecha] = useState("");

  const [asignacionesList, setAsignacionesList] = useState([]);
  const [asigEmpleadoId, setAsigEmpleadoId] = useState("");
  const [asigProyectoId, setAsigProyectoId] = useState("");

  const add = () => {
    if (!nombre.trim() || !cargo.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Por favor ingrese al menos el nombre y el cargo'
      });
      return;
    }

    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      correo: correo
    }).then(() => {
      getEmpleados();
      limpiarCampo();
      MySwal.fire({
        title: "¡Registro exitoso!",
        text: "El empleado fue guardado.",
        icon: "success"
      });
    }).catch((err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor (puerto 3001 o MySQL en XAMPP).'
      });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      correo: correo
    }).then(() => {
      getEmpleados();
      limpiarCampo();
      Swal.fire({
        title: "Actualizado",
        text: "Se actualizo Correctamente",
        icon: "success"
      });
    }).catch((err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el empleado'
      });
    });
  };

  const deleteEmple = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar?",
      text: `¿Desea eliminar a ${nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
          getEmpleados();
          limpiarCampo();
          Swal.fire({
            title: "Eliminado",
            text: `${nombre} ha sido eliminado.`,
            icon: "success"
          });
        }).catch((err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al eliminar el empleado'
          });
        });
      }
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setCorreo(val.correo);
    setId(val.id);
  };

  const limpiarCampo = () => {
    setNombre("");
    setEdad("0");
    setPais("");
    setCargo("");
    setCorreo("");
    setId("");
    setEditar(false);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleadosList(response.data);
    }).catch((err) => {
      console.log("No se pudo obtener la lista de empleados:", err);
    });
  };

  const getProyectos = () => {
    Axios.get("http://localhost:3001/proyectos").then((res) => setProyectosList(res.data)).catch(console.error);
  };

  const getSalarios = () => {
    Axios.get("http://localhost:3001/salarios").then((res) => setSalariosList(res.data)).catch(console.error);
  };

  const getAsignaciones = () => {
    Axios.get("http://localhost:3001/empleado-proyectos").then((res) => setAsignacionesList(res.data)).catch(console.error);
  };

  const registrarProyecto = () => {
    if (!nombreProyecto.trim()) return;
    Axios.post("http://localhost:3001/proyectos/create", {
      nombre_proyecto: nombreProyecto,
      descripcion: descripcionProyecto
    }).then(() => {
      getProyectos();
      setNombreProyecto("");
      setDescripcionProyecto("");
      Swal.fire({ icon: 'success', title: 'Proyecto Registrado' });
    });
  };

  const eliminarProyecto = (id) => {
    Swal.fire({
      title: "¿Eliminar proyecto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/proyectos/delete/${id}`).then(() => {
          getProyectos();
          getAsignaciones();
          Swal.fire({ icon: 'success', title: 'Proyecto Eliminado' });
        });
      }
    });
  };

  const registrarSalario = () => {
    if (!salarioEmpleadoId || !salarioMonto) return;
    Axios.post("http://localhost:3001/salarios/create", {
      empleado_id: salarioEmpleadoId,
      monto: salarioMonto,
      fecha_actualizacion: salarioFecha || new Date().toISOString().slice(0, 10)
    }).then(() => {
      getSalarios();
      setSalarioMonto("");
      Swal.fire({ icon: 'success', title: 'Salario Registrado' });
    });
  };

  const asignarEmpleadoProyecto = () => {
    if (!asigEmpleadoId || !asigProyectoId) return;
    Axios.post("http://localhost:3001/empleado-proyectos/create", {
      empleado_id: asigEmpleadoId,
      proyecto_id: asigProyectoId
    }).then(() => {
      getAsignaciones();
      Swal.fire({ icon: 'success', title: 'Asignación Exitosa' });
    }).catch(() => {
      Swal.fire({ icon: 'info', title: 'El empleado ya está asignado a este proyecto' });
    });
  };

  const desasignarEmpleado = (empId, proyId) => {
    Axios.post("http://localhost:3001/empleado-proyectos/delete", {
      empleado_id: empId,
      proyecto_id: proyId
    }).then(() => {
      getAsignaciones();
      Swal.fire({ icon: 'success', title: 'Asignación eliminada' });
    });
  };

  useEffect(() => {
    getEmpleados();
    getProyectos();
    getSalarios();
    getAsignaciones();
  }, []);

  return (
    <div className="container">
      <div className="App">

        <ul className="nav nav-tabs mb-4 justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${tabActiva === 'empleados' ? 'active text-primary' : 'text-secondary'}`}
              onClick={() => setTabActiva('empleados')}
            >
              CRUD Empleados
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tabActiva === 'actividad_grupal' ? 'active text-success' : 'text-secondary'}`}
              onClick={() => setTabActiva('actividad_grupal')}
            >
              Actividad Grupal
            </button>
          </li>
        </ul>

        {tabActiva === 'empleados' && (
          <div>
            <div className="card text-center shadow-sm">
              <div className="card-header bg-primary text-white">
                Registrar de Empleados
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Nombre_:</span>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(event) => { setNombre(event.target.value); }}
                    className="form-control"
                    placeholder="Ingrese el Nombre"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Edad____:</span>
                  <input
                    type="number"
                    value={edad}
                    onChange={(event) => { setEdad(event.target.value); }}
                    className="form-control"
                    placeholder="Ingrese la edad"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Pais____:</span>
                  <input
                    type="text"
                    value={pais}
                    onChange={(event) => { setPais(event.target.value); }}
                    className="form-control"
                    placeholder="Ingrese el Pais"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Cargo___:</span>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(event) => { setCargo(event.target.value); }}
                    className="form-control"
                    placeholder="Ingrese el Cargo"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Correo__:</span>
                  <input
                    type="text"
                    value={correo}
                    onChange={(event) => { setCorreo(event.target.value); }}
                    className="form-control"
                    placeholder="Ingrese el Correo"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>

              <div className="card-footer text-muted">
                {
                  editar ? (
                    <div>
                      <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
                      <button className="btn btn-info m-2" onClick={limpiarCampo}>Cancelar</button>
                    </div>
                  ) : (
                    <button className="btn btn-success" onClick={add}>Registrar</button>
                  )
                }
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-striped table-hover align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Pais</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    empleadosList.map((val, key) => {
                      return (
                        <tr key={val.id}>
                          <th>{val.id}</th>
                          <td>{val.nombre}</td>
                          <td>{val.edad}</td>
                          <td>{val.pais}</td>
                          <td>{val.cargo}</td>
                          <td>{val.correo}</td>
                          <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                              <button
                                type="button"
                                onClick={() => { editarEmpleado(val); }}
                                className="btn btn-info btn-sm text-white"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => { deleteEmple(val.id, val.nombre); }}
                                className="btn btn-danger btn-sm"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              {empleadosList.length === 0 && (
                <div className="text-center p-4 bg-light border rounded">
                  <p className="mb-0 text-muted">
                    No hay empleados registrados o no se ha iniciado la conexión con MySQL en XAMPP.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {tabActiva === 'actividad_grupal' && (
          <div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-dark text-white">
                    Registrar Nuevo Proyecto
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Nombre del Proyecto:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej. Sistema de Facturación"
                        value={nombreProyecto}
                        onChange={(e) => setNombreProyecto(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción:</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Detalles del proyecto..."
                        value={descripcionProyecto}
                        onChange={(e) => setDescripcionProyecto(e.target.value)}
                      ></textarea>
                    </div>
                    <button className="btn btn-primary w-100" onClick={registrarProyecto}>
                      Guardar Proyecto
                    </button>

                    <h6 className="mt-4 border-bottom pb-2">Proyectos Actuales:</h6>
                    <ul className="list-group list-group-flush">
                      {proyectosList.map((p) => (
                        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{p.nombre_proyecto}</strong>
                            <p className="mb-0 text-muted small">{p.descripcion}</p>
                          </div>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProyecto(p.id)}>
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-dark text-white">
                    Asignar Empleado a Proyecto
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Seleccionar Empleado:</label>
                      <select
                        className="form-select"
                        value={asigEmpleadoId}
                        onChange={(e) => setAsigEmpleadoId(e.target.value)}
                      >
                        <option value="">-- Seleccionar --</option>
                        {empleadosList.map((e) => (
                          <option key={e.id} value={e.id}>{e.nombre} ({e.cargo})</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Seleccionar Proyecto:</label>
                      <select
                        className="form-select"
                        value={asigProyectoId}
                        onChange={(e) => setAsigProyectoId(e.target.value)}
                      >
                        <option value="">-- Seleccionar --</option>
                        {proyectosList.map((p) => (
                          <option key={p.id} value={p.id}>{p.nombre_proyecto}</option>
                        ))}
                      </select>
                    </div>
                    <button className="btn btn-success w-100" onClick={asignarEmpleadoProyecto}>
                      Asignar Empleado
                    </button>

                    <h6 className="mt-4 border-bottom pb-2">Asignaciones Existentes:</h6>
                    <div className="table-responsive">
                      <table className="table table-sm table-striped">
                        <thead>
                          <tr>
                            <th>Empleado</th>
                            <th>Proyecto</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {asignacionesList.map((a, idx) => (
                            <tr key={idx}>
                              <td>{a.empleado_nombre}</td>
                              <td>{a.nombre_proyecto}</td>
                              <td>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => desasignarEmpleado(a.empleado_id, a.proyecto_id)}
                                >
                                  Quitar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-dark text-white">
                    Registro de Salario
                  </div>
                  <div className="card-body">
                    <div className="row g-3 align-items-end">
                      <div className="col-md-4">
                        <label className="form-label">Empleado:</label>
                        <select
                          className="form-select"
                          value={salarioEmpleadoId}
                          onChange={(e) => setSalarioEmpleadoId(e.target.value)}
                        >
                          <option value="">-- Seleccionar Empleado --</option>
                          {empleadosList.map((e) => (
                            <option key={e.id} value={e.id}>{e.nombre} ({e.cargo})</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Monto (S/.):</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          placeholder="Ej. 2500.00"
                          value={salarioMonto}
                          onChange={(e) => setSalarioMonto(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Fecha de Actualización:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={salarioFecha}
                          onChange={(e) => setSalarioFecha(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-primary w-100" onClick={registrarSalario}>
                          Guardar
                        </button>
                      </div>
                    </div>

                    <h6 className="mt-4 border-bottom pb-2">Historial de Salarios:</h6>
                    <div className="table-responsive">
                      <table className="table table-striped table-sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Empleado</th>
                            <th>Cargo</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salariosList.map((s) => (
                            <tr key={s.id}>
                              <td>{s.id}</td>
                              <td>{s.empleado_nombre}</td>
                              <td>{s.cargo}</td>
                              <td>S/. {parseFloat(s.monto).toFixed(2)}</td>
                              <td>{s.fecha_actualizacion ? s.fecha_actualizacion.substring(0, 10) : ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
