import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'avaliacoes_fisioterapeuticas';

// Estrutura de dados para uma avaliação
export const createAvaliacaoData = (formData, nomeAvaliacao, pontuacaoTotal, statusGeral) => {
    return {
        id: `avaliacao_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        nomeAvaliacao: nomeAvaliacao || `Avaliação - ${new Date().toLocaleDateString('pt-BR')}`,
        dataCriacao: new Date().toISOString(),
        dadosAvaliacao: { ...formData },
        pontuacaoTotal: pontuacaoTotal || 0,
        statusGeral: statusGeral || 'Regular',
        tipoAvaliacao: 'exames_complementares'
    };
};

// Salvar avaliação
export const salvarAvaliacao = async (avaliacaoData) => {
    try {
        const avaliacoesExistentes = await buscarTodasAvaliacoes();
        const novasAvaliacoes = [...avaliacoesExistentes, avaliacaoData];
        
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasAvaliacoes));
        return { success: true, message: 'Avaliação salva com sucesso!' };
    } catch (error) {
        console.error('Erro ao salvar avaliação:', error);
        return { success: false, message: 'Erro ao salvar. Tente novamente.' };
    }
};

// Buscar todas as avaliações
export const buscarTodasAvaliacoes = async () => {
    try {
        const avaliacoes = await AsyncStorage.getItem(STORAGE_KEY);
        return avaliacoes ? JSON.parse(avaliacoes) : [];
    } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
        return [];
    }
};

// Buscar avaliação por ID
export const buscarAvaliacaoPorId = async (id) => {
    try {
        const avaliacoes = await buscarTodasAvaliacoes();
        return avaliacoes.find(avaliacao => avaliacao.id === id);
    } catch (error) {
        console.error('Erro ao buscar avaliação por ID:', error);
        return null;
    }
};

// Buscar avaliações por nome
export const buscarAvaliacoesPorNome = async (termoBusca) => {
    try {
        const avaliacoes = await buscarTodasAvaliacoes();
        const termo = termoBusca.toLowerCase();
        
        return avaliacoes.filter(avaliacao => 
            avaliacao.nomeAvaliacao.toLowerCase().includes(termo) ||
            avaliacao.statusGeral.toLowerCase().includes(termo)
        );
    } catch (error) {
        console.error('Erro ao buscar avaliações por nome:', error);
        return [];
    }
};

// Deletar avaliação
export const deletarAvaliacao = async (id) => {
    try {
        const avaliacoes = await buscarTodasAvaliacoes();
        const avaliacoesFiltradas = avaliacoes.filter(avaliacao => avaliacao.id !== id);
        
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(avaliacoesFiltradas));
        return { success: true, message: 'Avaliação deletada com sucesso!' };
    } catch (error) {
        console.error('Erro ao deletar avaliação:', error);
        return { success: false, message: 'Erro ao deletar avaliação.' };
    }
};

// Atualizar avaliação
export const atualizarAvaliacao = async (id, dadosAtualizados) => {
    try {
        const avaliacoes = await buscarTodasAvaliacoes();
        const indice = avaliacoes.findIndex(avaliacao => avaliacao.id === id);
        
        if (indice !== -1) {
            avaliacoes[indice] = { ...avaliacoes[indice], ...dadosAtualizados };
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(avaliacoes));
            return { success: true, message: 'Avaliação atualizada com sucesso!' };
        }
        
        return { success: false, message: 'Avaliação não encontrada.' };
    } catch (error) {
        console.error('Erro ao atualizar avaliação:', error);
        return { success: false, message: 'Erro ao atualizar avaliação.' };
    }
};

// Limpar todas as avaliações (para desenvolvimento/teste)
export const limparTodasAvaliacoes = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return { success: true, message: 'Todas as avaliações foram removidas.' };
    } catch (error) {
        console.error('Erro ao limpar avaliações:', error);
        return { success: false, message: 'Erro ao limpar avaliações.' };
    }
};

// Validar dados da avaliação
export const validarDadosAvaliacao = (formData) => {
    const erros = [];
    
    // Verificar se pelo menos um campo foi preenchido
    const camposPreenchidos = Object.values(formData).filter(valor => 
        valor && valor.toString().trim() !== ''
    );
    
    if (camposPreenchidos.length === 0) {
        erros.push('Pelo menos um campo deve ser preenchido para salvar a avaliação.');
    }
    
    return {
        valido: erros.length === 0,
        erros: erros
    };
};

// Formatar data para exibição
export const formatarDataExibicao = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Obter cor do status
export const obterCorStatus = (status) => {
    switch (status.toLowerCase()) {
        case 'excelente':
            return '#28a745';
        case 'bom':
            return '#17a2b8';
        case 'regular':
            return '#ffc107';
        case 'ruim':
            return '#fd7e14';
        case 'crítico':
            return '#dc3545';
        default:
            return '#6c757d';
    }
};
