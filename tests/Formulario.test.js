import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Formulario from '../src/components/Formulario';


// Mock de las funciones
const setPacientesMock = jest.fn();
const setPacienteMock = jest.fn();

// Mock de la función global alert
beforeEach(() => {
    global.alert = jest.fn(); // Mock de alert
});

afterEach(() => {
    jest.restoreAllMocks(); // Restaurar los mocks después de cada prueba
});

describe('Formulario', () => {
    const paciente = {
        id: '1',
        nombre: 'Luna',
        propietario: 'Carlos Perez',
        email: 'carlos@example.com',
        fecha: '2025-12-12',
        observaciones: 'Paciente con buena salud',
    };

    it('debería renderizar el formulario correctamente', () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        expect(screen.getByLabelText(/Nombre Mascota/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre Propietario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fecha de Cita/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Observaciones/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Agregar paciente/i })).toBeInTheDocument();
    });

    it('debería mostrar un error si el campo nombre está vacío y el formulario es enviado', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con los campos vacíos
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/El campo nombre esta vacio/i)).toBeInTheDocument();
        });
    });

    it('debería mostrar un error si el campo propietario está vacío y el formulario es enviado', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con los campos vacíos
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/El campo propietario esta vacio/i)).toBeInTheDocument();
        });
    });

    it('debería mostrar un error si el email está vacío y el formulario es enviado', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con los campos vacíos
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/El campo email esta vacio/i)).toBeInTheDocument();
        });
    });

    it('deberia mostrar un error si el email ingresado no es valido', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={[]}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con el campo de email invalido
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juanexample.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/El email ingresado no es valido/i)).toBeInTheDocument();
        });
    });

    it('debería mostrar un error si la fecha está vacía y el formulario es enviado', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con los campos vacíos
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/El campo fecha esta vacio/i)).toBeInTheDocument();
        });
    });

    it('deberia mostrar un error si la fecha ingresada esta desactualizada', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={[]}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con el campo de email invalido
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2022-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/La fecha no puede ser menor a la fecha actual/i)).toBeInTheDocument();
        });
    });

    it('debería mostrar un error si el campo observaciones está vacío y el formulario es enviado', async () => {
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        // Llenamos el formulario con los campos vacíos
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: '' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(screen.getByText(/El campo observaciones esta vacio/i)).toBeInTheDocument();
        });
    });

    it('debería agregar un nuevo paciente cuando el formulario se llena correctamente', async () => {
        const setPacientesMock = jest.fn();
        render(
            <Formulario
                pacientes={[]}
                setPacientes={setPacientesMock}
                paciente={{}}
                setPaciente={setPacienteMock}
            />
        );

        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Ana Gomez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ana@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Agregar paciente/i }));

        await waitFor(() => {
            expect(setPacientesMock).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({
                    nombre: 'Luna',
                    propietario: 'Ana Gomez',
                    email: 'ana@example.com',
                    fecha: '2025-12-12',
                    observaciones: 'Paciente saludable',
                }),
            ]));
        });
    });

    it('debería editar un paciente existente cuando el formulario se envía', async () => {
        render(
            <Formulario
                pacientes={[paciente]}
                setPacientes={setPacientesMock}
                paciente={paciente}
                setPaciente={setPacienteMock}
            />
        );

        // Editamos el formulario
        fireEvent.change(screen.getByLabelText(/Nombre Mascota/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/Nombre Propietario/i), { target: { value: 'Ana Gomez' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ana@example.com' } });
        fireEvent.change(screen.getByLabelText(/Fecha de Cita/i), { target: { value: '2025-12-12' } });
        fireEvent.change(screen.getByLabelText(/Observaciones/i), { target: { value: 'Paciente saludable' } });

        fireEvent.click(screen.getByRole('button', { name: /Editar paciente/i }));

        await waitFor(() => {
            expect(setPacientesMock).toHaveBeenCalled();
            const llamadas = setPacientesMock.mock.calls;
            const pacientesActualizados = llamadas[0][0];

            expect(pacientesActualizados).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: '1',
                        nombre: 'Luna',
                        propietario: expect.stringMatching(/Ana Gómez|Ana Gomez/i),
                        email: 'ana@example.com',
                        fecha: '2025-12-12',
                        observaciones: 'Paciente saludable',
                }),
            ]));
        });
    });
});
