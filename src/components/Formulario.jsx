import React, { useState, useEffect } from "react";

export const Formulario = ({
  pacientes,
  setPacientes,
  paciente,
  setPaciente,
}) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [observaciones, setObservaciones] = useState("");

    const [error, setError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setObservaciones(paciente.observaciones);
        }
    }, [paciente]);

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    };

    const validarFormulario = () => {
        if (nombre.trim() === "") {
            setMensajeError("El campo nombre esta vacio");
            return false;
        }
        if (propietario.trim() === "") {
            setMensajeError("El campo propietario esta vacio");
            return false;
        }
        if (email.trim() === "") {
            setMensajeError("El campo email esta vacio");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMensajeError("El email ingresado no es valido");
            return false;
        }
        if (fecha.trim() === "") {
            setMensajeError("El campo fecha esta vacio");
            return false;
        }
        const fechaIngresada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fechaIngresada < hoy) {
            setMensajeError("La fecha no puede ser menor a la fecha actual");
            return false;
        }
        if (observaciones.trim() === "") {
            setMensajeError("El campo observaciones esta vacio");
            return false;
        }
        return true;
    };

    const resetFormulario = () => {
        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setObservaciones("");
        setPaciente({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            setError(true);
            return;
        }

        setError(false);
        setMensajeError("");

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            observaciones,
        };

        if (paciente.id) {
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map((pacienteState) =>
                pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            );
            setPacientes(pacientesActualizados);
        } else {
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        resetFormulario();
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mb-10 mx-5">
            <h2 className="font-black text-3xl text-center">Asignar Cita</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y{" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5"
            >
                {error && mensajeError && (
                    <p role="alert" className="text-red-500 font-bold mb-4">
                        {mensajeError}
                    </p>
                )}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="cita" className="block text-gray-700 uppercase font-bold">
                        Fecha de Cita
                    </label>
                    <input
                        id="cita"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="observaciones" className="block text-gray-700 uppercase font-bold">
                        Observaciones
                    </label>
                    <textarea
                        id="observaciones"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe las Observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                    />
                </div>

                <input
                    id="agregar"
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={paciente.id ? "Editar paciente" : "Agregar paciente"}
                />
            </form>
        </div>
    );
};

export default Formulario;