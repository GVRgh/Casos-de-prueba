import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Paciente from '../src/components/Paciente';

// Mock de la función eliminarPaciente
const eliminarPacienteMock = jest.fn();
const setPacienteMock = jest.fn();

// Paciente de ejemplo
const paciente = {
  id: '1',
  nombre: 'Juan Pérez',
  propietario: 'Carlos Pérez',
  email: 'juan@example.com',
  fecha: '2022-12-12',
  observaciones: 'Paciente en buen estado',
};

describe('Paciente', () => {
  beforeEach(() => {
    render(
      <Paciente
        paciente={paciente}
        setPaciente={setPacienteMock}
        eliminarPaciente={eliminarPacienteMock}
      />
    );
  });

  it('debería renderizar correctamente la información del paciente', () => {
    // Verificar que la información del paciente está correctamente renderizada
      expect(screen.getByText(paciente.nombre)).toBeInTheDocument();
      expect(screen.getByText(paciente.propietario)).toBeInTheDocument();
      expect(screen.getByText(paciente.email)).toBeInTheDocument();
      expect(screen.getByText(paciente.fecha)).toBeInTheDocument();
      expect(screen.getByText(paciente.observaciones)).toBeInTheDocument();
  });

  it('debería llamar a setPaciente cuando se haga clic en "Editar"', () => {
    // Simular un clic en el botón "Editar"
    fireEvent.click(screen.getByText(/Editar/i));

    // Verificar que setPaciente se haya llamado con el paciente correcto
    expect(setPacienteMock).toHaveBeenCalledWith(paciente);
  });

  it('debería llamar a eliminarPaciente cuando se haga clic en "Eliminar" y se confirme la eliminación', () => {
    // Mockear la función global confirm
    global.confirm = jest.fn(() => true); // Simula una confirmación de eliminación

    // Simular clic en el botón "Eliminar"
    fireEvent.click(screen.getByText(/Eliminar/i));

    // Verificar que confirm haya sido llamada
    expect(global.confirm).toHaveBeenCalledWith('Deseas eliminar este paciente?');
    // Verificar que eliminarPaciente haya sido llamado con el ID correcto
    expect(eliminarPacienteMock).toHaveBeenCalledWith(paciente.id);
  });

});
