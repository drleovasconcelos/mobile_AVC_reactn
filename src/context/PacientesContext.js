import React, { createContext, useContext, useState } from 'react';

const PacientesContext = createContext();

export const usePacientes = () => {
    const context = useContext(PacientesContext);
    if (!context) {
        throw new Error('usePacientes deve ser usado dentro de um PacientesProvider');
    }
    return context;
};

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([
        {
            id: '1',
            nome: 'João Silva',
            dataAdmissao: '15/01/2024',
            diagnostico: 'AVC Isquêmico',
            prontuario: '001',
            status: 'Ativo'
        },
        {
            id: '2',
            nome: 'Maria Santos',
            dataAdmissao: '20/01/2024',
            diagnostico: 'AVC Hemorrágico',
            prontuario: '002',
            status: 'Ativo'
        },
        {
            id: '3',
            nome: 'Pedro Oliveira',
            dataAdmissao: '10/02/2024',
            diagnostico: 'AVC Isquêmico',
            prontuario: '003',
            status: 'Alta'
        }
    ]);

    const adicionarPaciente = (novoPaciente) => {
        const pacienteComId = {
            ...novoPaciente,
            id: Date.now().toString(),
            status: 'Ativo'
        };
        setPacientes(prev => [pacienteComId, ...prev]);
    };

    const atualizarPaciente = (id, dadosAtualizados) => {
        setPacientes(prev => 
            prev.map(paciente => 
                paciente.id === id 
                    ? { ...paciente, ...dadosAtualizados }
                    : paciente
            )
        );
    };

    const removerPaciente = (id) => {
        setPacientes(prev => prev.filter(paciente => paciente.id !== id));
    };

    const buscarPacientes = (termo) => {
        if (!termo.trim()) return pacientes;
        
        return pacientes.filter(paciente =>
            paciente.nome.toLowerCase().includes(termo.toLowerCase()) ||
            paciente.prontuario.includes(termo) ||
            paciente.diagnostico.toLowerCase().includes(termo.toLowerCase())
        );
    };

    const value = {
        pacientes,
        adicionarPaciente,
        atualizarPaciente,
        removerPaciente,
        buscarPacientes
    };

    return (
        <PacientesContext.Provider value={value}>
            {children}
        </PacientesContext.Provider>
    );
};
