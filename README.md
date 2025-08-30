# Sistema AVC - React Native

Sistema de gerenciamento de pacientes com Acidente Vascular Cerebral (AVC) desenvolvido em React Native com Expo.

## 🚀 Funcionalidades

### ✅ **Tela de Login**
- Autenticação de usuários
- Validação de campos obrigatórios
- Redirecionamento automático após login

### ✅ **Tela de Cadastro**
- Cadastro de novos pacientes
- Validação completa de formulários
- Campos: Nome, Data de Admissão, Diagnóstico, Prontuário

### ✅ **Tela de Lista de Pacientes**
- Visualização de todos os pacientes cadastrados
- Busca por nome, prontuário ou diagnóstico
- Estatísticas (Total, Ativos, Altas)
- Botão flutuante para adicionar novos pacientes
- Funcionalidade de logout

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para APIs

## 📱 Estrutura do Projeto

```
src/
├── components/          # Componentes compartilhados
├── context/            # Contextos React (PacientesContext)
├── screens/            # Telas da aplicação
│   ├── Login.js       # Tela de autenticação
│   ├── Cadastro.js    # Tela de cadastro de pacientes
│   └── ListaPacientes.js # Tela principal com lista de pacientes
└── assets/             # Recursos estáticos (imagens, ícones)
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI instalado globalmente

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar o projeto
npm start
```

### Comandos Disponíveis
```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa na web
```

## 🔧 Configuração

### Arquivos de Configuração
- `babel.config.js` - Configuração do Babel
- `metro.config.js` - Configuração do Metro bundler
- `app.json` - Configurações do Expo
- `package.json` - Dependências e scripts

### Dependências Principais
```json
{
  "@react-navigation/native": "^7.1.17",
  "@react-navigation/stack": "^7.4.7",
  "axios": "^1.11.0",
  "expo": "~53.0.22",
  "react": "^19.0.0",
  "react-native": "^0.79.6"
}
```

## 📊 Funcionalidades da Lista de Pacientes

### Busca e Filtros
- Busca em tempo real
- Filtro por nome, prontuário ou diagnóstico
- Resultados instantâneos

### Estatísticas
- Contador total de pacientes
- Contador de pacientes ativos
- Contador de pacientes com alta

### Gestão de Pacientes
- Visualização de detalhes
- Status visual (Ativo/Alta)
- Navegação para cadastro de novos pacientes

## 🎨 Interface do Usuário

### Design System
- Cores consistentes (#007bff, #28a745, #6c757d)
- Tipografia hierárquica
- Espaçamentos padronizados
- Sombras e elevações para profundidade

### Componentes
- Cards de paciente com informações organizadas
- Botões com estados visuais
- Campos de entrada com validação visual
- Indicadores de status coloridos

## 🔐 Segurança e Validação

### Validações Implementadas
- Campos obrigatórios
- Feedback visual de erros
- Prevenção de dados vazios
- Sanitização de entrada

### Navegação Segura
- Controle de acesso entre telas
- Prevenção de navegação indesejada
- Confirmação para ações críticas

## 🚧 Funcionalidades Futuras

### Planejadas
- [ ] Edição de pacientes existentes
- [ ] Exclusão de pacientes
- [ ] Histórico de alterações
- [ ] Relatórios e estatísticas avançadas
- [ ] Integração com backend real
- [ ] Autenticação com JWT
- [ ] Persistência local com AsyncStorage

### Melhorias Técnicas
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] CI/CD pipeline
- [ ] Documentação de API
- [ ] Monitoramento de performance

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através de:
- Issues do GitHub
- Email: [seu-email@exemplo.com]

---

**Desenvolvido com ❤️ usando React Native e Expo**
