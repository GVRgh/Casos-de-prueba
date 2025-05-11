import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ListadoPacientes from '../src/components/ListadoPacientes';
import Paciente from '../src/components/Paciente';

jest.mock('../src/components/Paciente', () => ({
  __esModule: true,
  default: ({ paciente, setPaciente, eliminarPaciente }) => (
    <div>
      <p>{paciente.nombre}</p>
      <button onClick={() => setPaciente(paciente)}>Editar</button>
      <button onClick={() => eliminarPaciente(paciente.id)}>Eliminar</button>
    </div>
  )
}));

describe('ListadoPacientes', () => {
  const pacientes = [
    { id: '1', nombre: 'Juan Pérez' },
    { id: '2', nombre: 'Ana Gómez' },
  ];

  const setPacienteMock = jest.fn();
  const eliminarPacienteMock = jest.fn();

  it('debería renderizar la lista de pacientes correctamente', () => {
    render(
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPacienteMock}
        eliminarPaciente={eliminarPacienteMock}
      />
    );

    // Comprobar si el título aparece
    expect(screen.getByText(/Listado Pacientes/i)).toBeInTheDocument();

    // Verificar que los nombres de los pacientes estén en el documento
    pacientes.forEach((paciente) => {
      expect(screen.getByText(paciente.nombre)).toBeInTheDocument();
    });
  });

  it('debería renderizar el mensaje "No hay pacientes" si no hay pacientes', () => {
    render(
      <ListadoPacientes
        pacientes={[]}
        setPaciente={setPacienteMock}
        eliminarPaciente={eliminarPacienteMock}
      />
    );

    // Verificar que el mensaje de "No hay pacientes" esté en el documento
    expect(screen.getByText(/No hay pacientes/i)).toBeInTheDocument();
  });

  it('debería llamar a setPaciente cuando se haga clic en "Editar"', () => {
    render(
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPacienteMock}
        eliminarPaciente={eliminarPacienteMock}
      />
    );

    // Simular clic en el botón "Editar" de un paciente
    fireEvent.click(screen.getAllByText(/Editar/i)[0]);

    // Verificar que se haya llamado a setPaciente con el paciente correcto
    expect(setPacienteMock).toHaveBeenCalledWith(pacientes[0]);
  });

  it('debería llamar a eliminarPaciente cuando se haga clic en "Eliminar"', () => {
    render(
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPacienteMock}
        eliminarPaciente={eliminarPacienteMock}
      />
    );

    // Simular clic en el botón "Eliminar" de un paciente
    fireEvent.click(screen.getAllByText(/Eliminar/i)[0]);

    // Verificar que se haya llamado a eliminarPaciente con el ID correcto
    expect(eliminarPacienteMock).toHaveBeenCalledWith(pacientes[0].id);
  });
});
