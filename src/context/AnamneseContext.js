import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AnamneseContext = createContext();

export const useAnamnese = () => {
    const context = useContext(AnamneseContext);
    if (!context) {
        throw new Error('useAnamnese deve ser usado dentro de um AnamneseProvider');
    }
    return context;
};

export const AnamneseProvider = ({ children }) => {
    const [anamneseData, setAnamneseData] = useState({});

    // Função para salvar dados da anamnese
    const saveAnamneseData = useCallback((pacienteId, data) => {
        setAnamneseData(prev => {
            const currentData = prev[pacienteId] || {};
            const newData = { ...currentData, ...data, lastUpdated: new Date().toISOString() };
            
            // Só atualiza se os dados realmente mudaram
            if (JSON.stringify(currentData) === JSON.stringify(newData)) {
                return prev;
            }
            
            return {
                ...prev,
                [pacienteId]: newData
            };
        });
    }, []);

    // Função para obter dados da anamnese de um paciente
    const getAnamneseData = useCallback((pacienteId) => {
        return anamneseData[pacienteId] || {};
    }, [anamneseData]);

    // Função para limpar dados da anamnese de um paciente
    const clearAnamneseData = useCallback((pacienteId) => {
        setAnamneseData(prev => {
            const newData = { ...prev };
            delete newData[pacienteId];
            return newData;
        });
    }, []);

    // Função para verificar se existem dados para um paciente
    const hasAnamneseData = useCallback((pacienteId) => {
        return !!anamneseData[pacienteId] && Object.keys(anamneseData[pacienteId]).length > 0;
    }, [anamneseData]);

    const value = useMemo(() => ({
        anamneseData,
        saveAnamneseData,
        getAnamneseData,
        clearAnamneseData,
        hasAnamneseData
    }), [anamneseData, saveAnamneseData, getAnamneseData, clearAnamneseData, hasAnamneseData]);

    return (
        <AnamneseContext.Provider value={value}>
            {children}
        </AnamneseContext.Provider>
    );
};
