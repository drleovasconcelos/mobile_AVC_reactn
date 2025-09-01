import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Usuários pré-definidos para demonstração
    const usuarios = [
        {
            id: '1',
            username: 'admin',
            password: 'admin123',
            nome: 'Administrador',
            email: 'admin@sistemaavc.com',
            tipo: 'admin'
        }
    ];

    const login = (username, password) => {
        // Simular validação de credenciais
        const usuario = usuarios.find(
            user => user.username === username && user.password === password
        );

        if (usuario) {
            // Remover senha do objeto do usuário antes de salvar
            const { password: _, ...userWithoutPassword } = usuario;
            setCurrentUser(userWithoutPassword);
            setIsAuthenticated(true);
            return { success: true, user: userWithoutPassword };
        } else {
            return { success: false, message: 'Usuário ou senha inválidos' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    const register = (userData) => {
        // Verificar se o usuário já existe
        const userExists = usuarios.find(user => user.username === userData.username);
        
        if (userExists) {
            return { success: false, message: 'Usuário já existe' };
        }

        // Adicionar novo usuário (em um sistema real, isso seria salvo no banco)
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            tipo: 'usuario'
        };

        // Em um sistema real, você salvaria no banco de dados
        // Por enquanto, apenas simulamos o sucesso
        return { success: true, message: 'Usuário criado com sucesso' };
    };

    const value = {
        isAuthenticated,
        currentUser,
        login,
        logout,
        register,
        usuarios // Para demonstração, mostrar usuários disponíveis
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
