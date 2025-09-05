import React, { createContext, useContext, useState } from 'react';

// Context para gerenciar dados dos exames complementares
const ExamesComplementaresContext = createContext();

// Provider do Context
export const ExamesComplementaresProvider = ({ children }) => {
    // Estado para armazenar dados dos exames complementares por paciente
    const [examesComplementares, setExamesComplementares] = useState({});

    // Função para salvar dados dos exames complementares
    const salvarExamesComplementares = (pacienteId, dados) => {
        setExamesComplementares(prev => ({
            ...prev,
            [pacienteId]: {
                ...prev[pacienteId],
                ...dados,
                ultimaAtualizacao: new Date().toISOString()
            }
        }));
    };

    // Função para obter dados dos exames complementares
    const getExamesComplementaresData = (pacienteId) => {
        return examesComplementares[pacienteId] || {};
    };

    // Função para limpar dados dos exames complementares
    const limparExamesComplementares = (pacienteId) => {
        setExamesComplementares(prev => {
            const novosDados = { ...prev };
            delete novosDados[pacienteId];
            return novosDados;
        });
    };

    const value = {
        examesComplementares,
        salvarExamesComplementares,
        getExamesComplementaresData,
        limparExamesComplementares
    };

    return (
        <ExamesComplementaresContext.Provider value={value}>
            {children}
        </ExamesComplementaresContext.Provider>
    );
};

// Hook para usar o Context
export const useExamesComplementares = () => {
    const context = useContext(ExamesComplementaresContext);
    if (!context) {
        throw new Error('useExamesComplementares deve ser usado dentro de um ExamesComplementaresProvider');
    }
    return context;
};

export default ExamesComplementaresContext;

