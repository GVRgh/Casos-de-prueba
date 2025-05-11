import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Paciente from '../src/components/Paciente';

// Mock de la funci�n eliminarPaciente
const eliminarPacienteMock = jest.fn();
const setPacienteMock = jest.fn();

// Paciente de ejemplo
const paciente = {
  id: '1',
  nombre: 'Juan P�rez',
  propietario: 'Carlos P�rez',
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

  it('deber�a renderizar correctamente la informaci�n del paciente', () => {
    // Verificar que la informaci�n del paciente est� correctamente renderizada
      expect(screen.getByText(paciente.nombre)).toBeInTheDocument();
      expect(screen.getByText(paciente.propietario)).toBeInTheDocument();
      expect(screen.getByText(paciente.email)).toBeInTheDocument();
      expect(screen.getByText(paciente.fecha)).toBeInTheDocument();
      expect(screen.getByText(paciente.observaciones)).toBeInTheDocument();
  });

  it('deber�a llamar a setPaciente cuando se haga clic en "Editar"', () => {
    // Simular un clic en el bot�n "Editar"
    fireEvent.click(screen.getByText(/Editar/i));

    // Verificar que setPaciente se haya llamado con el paciente correcto
    expect(setPacienteMock).toHaveBeenCalledWith(paciente);
  });

  it('deber�a llamar a eliminarPaciente cuando se haga clic en "Eliminar" y se confirme la eliminaci�n', () => {
    // Mockear la funci�n global confirm
    global.confirm = jest.fn(() => true); // Simula una confirmaci�n de eliminaci�n

    // Simular clic en el bot�n "Eliminar"
    fireEvent.click(screen.getByText(/Eliminar/i));

    // Verificar que confirm haya sido llamada
    expect(global.confirm).toHaveBeenCalledWith('Deseas eliminar este paciente?');
    // Verificar que eliminarPaciente haya sido llamado con el ID correcto
    expect(eliminarPacienteMock).toHaveBeenCalledWith(paciente.id);
  });

});
