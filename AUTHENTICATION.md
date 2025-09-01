# Sistema de Autenticação - Sistema AVC

## 📋 Visão Geral

O sistema de autenticação foi implementado para funcionar sem banco de dados, utilizando Context API do React para gerenciar o estado de autenticação.

## 🔐 Usuários Pré-definidos

O sistema possui 1 usuário pré-configurado para demonstração:

### 👨‍💼 Administrador
- **Usuário:** `admin`
- **Senha:** `admin123`
- **Nome:** Administrador
- **Tipo:** admin

## 🏗️ Estrutura do Sistema

### Contexto de Autenticação (`src/context/AuthContext.js`)

```javascript
// Estados gerenciados
- isAuthenticated: boolean
- currentUser: object | null

// Funções disponíveis
- login(username, password): object
- logout(): void
- register(userData): object
```

### Telas de Autenticação

1. **Login** (`src/screens/Login.js`)
   - Formulário de login
   - Validação de campos
   - Exibição de credenciais de teste
   - Navegação para cadastro

2. **Cadastro de Usuário** (`src/screens/CadastroUsuario.js`)
   - Formulário de registro
   - Validação completa de campos
   - Integração com contexto de autenticação

## 🔄 Fluxo de Autenticação

1. **Login:**
   - Usuário preenche credenciais
   - Sistema valida contra usuários pré-definidos
   - Se válido: salva estado de autenticação e navega para ListaPacientes
   - Se inválido: exibe mensagem de erro

2. **Logout:**
   - Limpa estado de autenticação
   - Navega de volta para tela de Login

3. **Cadastro:**
   - Valida se usuário já existe
   - Simula criação de conta (sem persistência)
   - Redireciona para Login após sucesso

## 🎨 Interface do Usuário

### Tela de Login
- Design limpo e moderno
- Seção de credenciais de teste (ocultável)
- Validação em tempo real
- Mensagens de erro claras

### Tela de Cadastro
- Formulário completo com validação
- Campos obrigatórios marcados
- Feedback visual de erros
- Navegação intuitiva

### Header da Lista de Pacientes
- Exibe informações do usuário logado
- Ícone baseado no tipo de usuário
- Botão de logout funcional

## 🛡️ Segurança

### Validações Implementadas
- Campos obrigatórios
- Formato de email válido
- Senha com mínimo de caracteres
- Confirmação de senha
- Nome de usuário único

### Limitações (Devido à ausência de banco)
- Senhas armazenadas em texto plano
- Usuários fixos (não podem ser alterados)
- Sem persistência de dados
- Sem recuperação de senha

## 🚀 Como Usar

1. **Acesse a tela de Login**
2. **Use uma das credenciais de teste:**
   - Clique em "Mostrar Credenciais de Teste"
   - Escolha um usuário
   - Digite usuário e senha
3. **Clique em "Entrar"**
4. **Acesse o sistema como usuário autenticado**

## 🔧 Personalização

### Adicionar Novos Usuários
Edite o arquivo `src/context/AuthContext.js`:

```javascript
const usuarios = [
    // ... usuários existentes
    {
        id: '4',
        username: 'novo_usuario',
        password: 'nova_senha',
        nome: 'Nome do Usuário',
        email: 'email@exemplo.com',
        tipo: 'medico' // ou 'admin', 'enfermeiro'
    }
];
```

### Modificar Validações
Edite as funções de validação nas telas de Login e Cadastro para ajustar as regras de negócio.

## 📝 Notas Importantes

- Este é um sistema de demonstração
- Não use em produção sem implementar banco de dados
- As senhas devem ser criptografadas em ambiente real
- Implemente persistência de dados para uso real
- Adicione recuperação de senha e outras funcionalidades de segurança
