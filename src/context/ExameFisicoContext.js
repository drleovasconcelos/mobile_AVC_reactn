import React, { createContext, useContext, useState } from 'react';

// Context para gerenciar dados do exame físico
const ExameFisicoContext = createContext();

// Provider do Context
export const ExameFisicoProvider = ({ children }) => {
    // Estado para armazenar dados do exame físico por paciente
    const [examesFisicos, setExamesFisicos] = useState({});

    // Função para salvar dados do exame físico
    const salvarExameFisico = (pacienteId, dados) => {
        setExamesFisicos(prev => ({
            ...prev,
            [pacienteId]: {
                ...prev[pacienteId],
                ...dados,
                ultimaAtualizacao: new Date().toISOString()
            }
        }));
    };

    // Função para obter dados do exame físico
    const getExameFisicoData = (pacienteId) => {
        return examesFisicos[pacienteId] || {};
    };

    // Função para limpar dados do exame físico
    const limparExameFisico = (pacienteId) => {
        setExamesFisicos(prev => {
            const novosDados = { ...prev };
            delete novosDados[pacienteId];
            return novosDados;
        });
    };

    const value = {
        examesFisicos,
        salvarExameFisico,
        getExameFisicoData,
        limparExameFisico
    };

    return (
        <ExameFisicoContext.Provider value={value}>
            {children}
        </ExameFisicoContext.Provider>
    );
};

// Hook para usar o Context
export const useExameFisico = () => {
    const context = useContext(ExameFisicoContext);
    if (!context) {
        throw new Error('useExameFisico deve ser usado dentro de um ExameFisicoProvider');
    }
    return context;
};

export default ExameFisicoContext;

