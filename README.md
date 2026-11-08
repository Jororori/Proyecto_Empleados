# CRUD Empleados - SENATI (React, Node.js y MySQL con XAMPP)

Proyecto Fullstack correspondiente al módulo **"TEMAS III: #REACT #NodeJS #MySQL"** de **SENATI**, incluyendo el CRUD completo de empleados y la estructura de la **Actividad Grupal** (Proyectos y Salarios).

---

## 🛠️ Tecnologías Empleadas
- **Frontend**: React.js (Hooks `useState`, `useEffect`), Axios, Bootstrap 5, SweetAlert2.
- **Backend**: Node.js, Express.js, CORS, MySQL2.
- **Base de Datos y Entorno Local**: MySQL en **XAMPP** (phpMyAdmin).

---

## 📋 Pasos para Ejecutar el Proyecto con XAMPP

### 1. Iniciar los servicios en XAMPP
1. Abre el **Panel de Control de XAMPP**.
2. Presiona **Start** en el módulo **Apache**.
3. Presiona **Start** en el módulo **MySQL**.

---

### 2. Crear e Importar la Base de Datos en phpMyAdmin
1. Abre tu navegador y dirígete a: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Haz clic en la pestaña **Importar** (arriba).
3. Selecciona el archivo SQL ubicado en este proyecto:
   ```
   server/db_empleados.sql
   ```
4. Haz clic en **Continuar** (o Importar).
5. Se creará automáticamente la base de datos `empleados` con las tablas:
   - `empleado` (id, nombre, edad, pais, cargo, correo)
   - `proyectos` (id, nombre_proyecto, descripcion)
   - `empleado_proyecto` (empleado_id, proyecto_id)
   - `salario` (id, empleado_id, monto, fecha_actualizacion)
   *(Además incluye datos de prueba iniciales coincidentes con las diapositivas)*.

---

### 3. Iniciar el Servidor Backend (Node.js)
Abre una terminal en la carpeta `server`:

```bash
cd server
npm install
npm start
```
> El backend quedará corriendo en: `http://localhost:3001` (Mostrando en consola: `corriendo el puerto 3001`).

---

### 4. Iniciar la Aplicación Frontend (React)
Abre otra terminal en la carpeta `client`:

```bash
cd client
npm install
npm start
```
> La interfaz se abrirá automáticamente en tu navegador en: [http://localhost:3000](http://localhost:3000).

---

## 🌟 Funcionalidades Implementadas

### Módulo Principal: CRUD de Empleados (Diapositivas 1 a 67)
- **Registrar Empleado**: Formulario con tarjeta Bootstrap para `Nombre`, `Edad`, `Pais`, `Cargo`, `Correo`. Al registrar, muestra alerta interactiva de SweetAlert2 (`¡Registro exitoso!`).
- **Listar Empleados**: Tabla rayada (`table-striped`) con actualización automática al cargar la vista (`useEffect`).
- **Editar Empleado**: Al hacer clic en "Editar", los campos del formulario se rellenan automáticamente y el botón cambia a "Actualizar" y "Cancelar".
- **Eliminar Empleado**: Al hacer clic en "Eliminar", se despliega un modal de confirmación con SweetAlert2 (`¿Desea eliminar a [nombre]?`). Al confirmar, se elimina del servidor y de la base de datos.

### Módulo Adicional: Actividad Grupal (Diapositiva 68)
- Pestaña para gestionar **Proyectos**, asignación de empleados a proyectos (`empleado_proyecto`) y registro de **Salarios** vinculados con llaves foráneas.
