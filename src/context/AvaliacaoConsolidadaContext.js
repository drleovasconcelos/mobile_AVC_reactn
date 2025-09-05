import React, { createContext, useContext, useState } from 'react';

// Context para gerenciar dados de avaliação consolidada
const AvaliacaoConsolidadaContext = createContext();

// Provider do Context
export const AvaliacaoConsolidadaProvider = ({ children }) => {
    // Estado para armazenar dados consolidados de avaliação
    const [avaliacaoConsolidada, setAvaliacaoConsolidada] = useState(null);

    // Função para salvar dados consolidados de avaliação
    const salvarAvaliacaoConsolidada = (dados) => {
        setAvaliacaoConsolidada(dados);
    };

    // Função para limpar dados consolidados
    const limparAvaliacaoConsolidada = () => {
        setAvaliacaoConsolidada(null);
    };

    // Função para coletar dados de todas as telas e consolidar
    const consolidarDadosAvaliacao = (dadosAnamnese, dadosExamesComplementares, dadosExameFisico, paciente) => {
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const horaAtual = new Date().toLocaleTimeString('pt-BR');

        // Consolidar todos os dados em um bloco de texto único
        const blocoConsolidado = `
AVALIAÇÃO FISIOTERAPÊUTICA CONSOLIDADA
=====================================

PACIENTE: ${paciente.nome}
PRONTUÁRIO: ${paciente.prontuario}
DATA: ${dataAtual} às ${horaAtual}
DIAGNÓSTICO: ${paciente.diagnostico}

═══════════════════════════════════════════════════════════════════════════════

ANAMNESE
═══════════════════════════════════════════════════════════════════════════════

${dadosAnamnese}

═══════════════════════════════════════════════════════════════════════════════

EXAME FÍSICO
═══════════════════════════════════════════════════════════════════════════════

${dadosExameFisico}

═══════════════════════════════════════════════════════════════════════════════

EXAMES COMPLEMENTARES
═══════════════════════════════════════════════════════════════════════════════

${dadosExamesComplementares}

═══════════════════════════════════════════════════════════════════════════════

FIM DA AVALIAÇÃO
═══════════════════════════════════════════════════════════════════════════════
        `.trim();

        // Criar objeto com dados consolidados
        const dadosConsolidados = {
            id: `avaliacao_${Date.now()}`,
            paciente: paciente,
            dataCriacao: dataAtual,
            horaCriacao: horaAtual,
            blocoConsolidado: blocoConsolidado,
            dadosOriginais: {
                anamnese: dadosAnamnese,
                exameFisico: dadosExameFisico,
                examesComplementares: dadosExamesComplementares
            }
        };

        return dadosConsolidados;
    };

    // Função para formatar dados de anamnese
    const formatarDadosAnamnese = (formData) => {
        let dadosFormatados = '';

        // Dados básicos
        if (formData.dataAvaliacao) {
            dadosFormatados += `Data da Avaliação: ${formData.dataAvaliacao}\n`;
        }

        // Limitações funcionais
        if (formData.limitacoesFuncionais) {
            dadosFormatados += `Limitações Funcionais: ${formData.limitacoesFuncionais}\n`;
        }

        // Dispositivos auxiliares
        if (formData.dispositivosAuxiliares && formData.dispositivosAuxiliares.length > 0) {
            dadosFormatados += `Dispositivos Auxiliares: ${formData.dispositivosAuxiliares.join(', ')}\n`;
        }

        // Alterações na marcha
        if (formData.alteracoesMarcha && formData.alteracoesMarcha.length > 0) {
            dadosFormatados += `Alterações na Marcha: ${formData.alteracoesMarcha.join(', ')}\n`;
        }

        // Observações
        if (formData.observacoes) {
            dadosFormatados += `Observações: ${formData.observacoes}\n`;
        }

        return dadosFormatados || 'Nenhum dado de anamnese preenchido.';
    };

    // Função para formatar dados de exame físico
    const formatarDadosExameFisico = (formData) => {
        let dadosFormatados = '';

        // Impressão geral
        if (formData.impressaoGeral && formData.impressaoGeral.length > 0) {
            dadosFormatados += `Impressão Geral: ${formData.impressaoGeral.join(', ')}\n`;
        }

        // Localização da dor
        if (formData.localizacaoDor && formData.localizacaoDor.length > 0) {
            dadosFormatados += `Localização da Dor: ${formData.localizacaoDor.join(', ')}\n`;
        }

        // Tipo de dor
        if (formData.tipoDor && formData.tipoDor.length > 0) {
            dadosFormatados += `Tipo de Dor: ${formData.tipoDor.join(', ')}\n`;
        }

        // Intensidade da dor
        if (formData.intensidadeDor) {
            dadosFormatados += `Intensidade da Dor: ${formData.intensidadeDor}/10\n`;
        }

        // Frequência e duração
        if (formData.frequenciaDuracao && formData.frequenciaDuracao.length > 0) {
            dadosFormatados += `Frequência e Duração: ${formData.frequenciaDuracao.join(', ')}\n`;
        }

        // Irradiação
        if (formData.irradiacao && formData.irradiacao.length > 0) {
            dadosFormatados += `Irradiação: ${formData.irradiacao.join(', ')}\n`;
        }

        // Fatores que agravam
        if (formData.fatoresAgravam && formData.fatoresAgravam.length > 0) {
            dadosFormatados += `Fatores que Agravam: ${formData.fatoresAgravam.join(', ')}\n`;
        }

        // Fatores que aliviam
        if (formData.fatoresAliviam && formData.fatoresAliviam.length > 0) {
            dadosFormatados += `Fatores que Aliviam: ${formData.fatoresAliviam.join(', ')}\n`;
        }

        // Observações da dor
        if (formData.observacoesDor) {
            dadosFormatados += `Observações da Dor: ${formData.observacoesDor}\n`;
        }

        // Sinais vitais
        if (formData.pressaoArterial || formData.frequenciaCardiaca || formData.frequenciaRespiratoria || formData.temperatura || formData.saturacaoOxigenio) {
            dadosFormatados += `\nSINAIS VITAIS:\n`;
            if (formData.pressaoArterial) dadosFormatados += `- Pressão Arterial: ${formData.pressaoArterial}\n`;
            if (formData.frequenciaCardiaca) dadosFormatados += `- Frequência Cardíaca: ${formData.frequenciaCardiaca} bpm\n`;
            if (formData.frequenciaRespiratoria) dadosFormatados += `- Frequência Respiratória: ${formData.frequenciaRespiratoria} rpm\n`;
            if (formData.temperatura) dadosFormatados += `- Temperatura: ${formData.temperatura}°C\n`;
            if (formData.saturacaoOxigenio) dadosFormatados += `- Saturação de Oxigênio: ${formData.saturacaoOxigenio}%\n`;
        }

        // Exames fisioterapêuticos
        if (formData.inspecaoPostural && formData.inspecaoPostural.length > 0) {
            dadosFormatados += `\nEXAMES FISIOTERAPÊUTICOS:\n`;
            dadosFormatados += `- Inspeção Postural: ${formData.inspecaoPostural.join(', ')}\n`;
        }

        if (formData.palpacao && formData.palpacao.length > 0) {
            dadosFormatados += `- Palpação: ${formData.palpacao.join(', ')}\n`;
        }

        if (formData.amplitudeMovimento && formData.amplitudeMovimento.length > 0) {
            dadosFormatados += `- Amplitude de Movimento: ${formData.amplitudeMovimento.join(', ')}\n`;
        }

        if (formData.forcaMuscular && formData.forcaMuscular.length > 0) {
            dadosFormatados += `- Força Muscular: ${formData.forcaMuscular.join(', ')}\n`;
        }

        if (formData.tonusMuscular && formData.tonusMuscular.length > 0) {
            dadosFormatados += `- Tônus Muscular: ${formData.tonusMuscular.join(', ')}\n`;
        }

        if (formData.coordenacao && formData.coordenacao.length > 0) {
            dadosFormatados += `- Coordenação: ${formData.coordenacao.join(', ')}\n`;
        }

        if (formData.equilibrio && formData.equilibrio.length > 0) {
            dadosFormatados += `- Equilíbrio: ${formData.equilibrio.join(', ')}\n`;
        }

        if (formData.reflexosSuperiores && formData.reflexosSuperiores.length > 0) {
            dadosFormatados += `- Reflexos Superiores: ${formData.reflexosSuperiores.join(', ')}\n`;
        }

        if (formData.reflexosInferiores && formData.reflexosInferiores.length > 0) {
            dadosFormatados += `- Reflexos Inferiores: ${formData.reflexosInferiores.join(', ')}\n`;
        }

        if (formData.reflexosPatologicosExame && formData.reflexosPatologicosExame.length > 0) {
            dadosFormatados += `- Reflexos Patológicos: ${formData.reflexosPatologicosExame.join(', ')}\n`;
        }

        if (formData.manobrasDeficitarias && formData.manobrasDeficitarias.length > 0) {
            dadosFormatados += `- Manobras Deficitárias: ${formData.manobrasDeficitarias.join(', ')}\n`;
        }

        if (formData.marcha && formData.marcha.length > 0) {
            dadosFormatados += `- Marcha: ${formData.marcha.join(', ')}\n`;
        }

        if (formData.sensibilidadeSuperficial && formData.sensibilidadeSuperficial.length > 0) {
            dadosFormatados += `- Sensibilidade Superficial: ${formData.sensibilidadeSuperficial.join(', ')}\n`;
        }

        if (formData.sensibilidadeProfunda && formData.sensibilidadeProfunda.length > 0) {
            dadosFormatados += `- Sensibilidade Profunda: ${formData.sensibilidadeProfunda.join(', ')}\n`;
        }

        // Avaliação respiratória
        if (formData.inspecaoToracica && formData.inspecaoToracica.length > 0) {
            dadosFormatados += `\nAVALIAÇÃO RESPIRATÓRIA:\n`;
            dadosFormatados += `- Inspeção Torácica: ${formData.inspecaoToracica.join(', ')}\n`;
        }

        if (formData.palpacaoRespiratoria && formData.palpacaoRespiratoria.length > 0) {
            dadosFormatados += `- Palpação Respiratória: ${formData.palpacaoRespiratoria.join(', ')}\n`;
        }

        if (formData.auscultaRespiratoria && formData.auscultaRespiratoria.length > 0) {
            dadosFormatados += `- Ausculta Respiratória: ${formData.auscultaRespiratoria.join(', ')}\n`;
        }

        if (formData.percussao && formData.percussao.length > 0) {
            dadosFormatados += `- Percussão: ${formData.percussao.join(', ')}\n`;
        }

        if (formData.parametrosResp && formData.parametrosResp.length > 0) {
            dadosFormatados += `- Parâmetros Respiratórios: ${formData.parametrosResp.join(', ')}\n`;
        }

        if (formData.observacoesClinicas) {
            dadosFormatados += `- Observações Clínicas: ${formData.observacoesClinicas}\n`;
        }

        if (formData.ventilacaoMecanica && formData.ventilacaoMecanica.length > 0) {
            dadosFormatados += `- Ventilação Mecânica: ${formData.ventilacaoMecanica.join(', ')}\n`;
        }

        // Avaliação dos sistemas
        if (formData.sistemaRespiratorio || formData.sistemaCardiovascular || formData.sistemaGastrointestinal || 
            formData.sistemaNeurologico || formData.sistemaGeniturinario || formData.sistemaMusculoesqueletico || 
            formData.sistemaDermatologico) {
            dadosFormatados += `\nAVALIAÇÃO DOS SISTEMAS:\n`;
            if (formData.sistemaRespiratorio) dadosFormatados += `- Sistema Respiratório: ${formData.sistemaRespiratorio}\n`;
            if (formData.sistemaCardiovascular) dadosFormatados += `- Sistema Cardiovascular: ${formData.sistemaCardiovascular}\n`;
            if (formData.sistemaGastrointestinal) dadosFormatados += `- Sistema Gastrointestinal: ${formData.sistemaGastrointestinal}\n`;
            if (formData.sistemaNeurologico) dadosFormatados += `- Sistema Neurológico: ${formData.sistemaNeurologico}\n`;
            if (formData.sistemaGeniturinario) dadosFormatados += `- Sistema Geniturinário: ${formData.sistemaGeniturinario}\n`;
            if (formData.sistemaMusculoesqueletico) dadosFormatados += `- Sistema Musculoesquelético: ${formData.sistemaMusculoesqueletico}\n`;
            if (formData.sistemaDermatologico) dadosFormatados += `- Sistema Dermatológico: ${formData.sistemaDermatologico}\n`;
        }

        // Conduta fisioterapêutica
        if (formData.objetivosCurtoPrazo || formData.objetivosLongoPrazo || formData.planoTratamento || 
            formData.frequenciaSessoes || formData.observacoesConduta) {
            dadosFormatados += `\nCONDUTA FISIOTERAPÊUTICA:\n`;
            if (formData.objetivosCurtoPrazo) dadosFormatados += `- Objetivos a Curto Prazo: ${formData.objetivosCurtoPrazo}\n`;
            if (formData.objetivosLongoPrazo) dadosFormatados += `- Objetivos a Longo Prazo: ${formData.objetivosLongoPrazo}\n`;
            if (formData.planoTratamento) dadosFormatados += `- Plano de Tratamento: ${formData.planoTratamento}\n`;
            if (formData.frequenciaSessoes && formData.frequenciaSessoes.length > 0) {
                dadosFormatados += `- Frequência das Sessões: ${formData.frequenciaSessoes.join(', ')}\n`;
            }
            if (formData.observacoesConduta) dadosFormatados += `- Observações: ${formData.observacoesConduta}\n`;
        }

        // Observações da evolução
        if (formData.observacoesEvolucao) {
            dadosFormatados += `\nOBSERVAÇÕES DA EVOLUÇÃO:\n${formData.observacoesEvolucao}\n`;
        }

        return dadosFormatados || 'Nenhum dado de exame físico preenchido.';
    };

    // Função para formatar dados de exames complementares
    const formatarDadosExamesComplementares = (formData) => {
        console.log('🔍 Formatando dados dos exames complementares:', formData);
        let dadosFormatados = '';

        // Exames laboratoriais
        const examesLaboratoriais = [];
        if (formData.hemogramaDataRealizacao || formData.hemogramaResultadosObtidos || formData.hemogramaStatus) {
            let exame = 'Hemograma';
            if (formData.hemogramaDataRealizacao) exame += ` (${formData.hemogramaDataRealizacao})`;
            if (formData.hemogramaResultadosObtidos) exame += ` - Resultados: ${formData.hemogramaResultadosObtidos}`;
            if (formData.hemogramaStatus) exame += ` - Status: ${formData.hemogramaStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.glicemiaDataRealizacao || formData.glicemiaResultadosObtidos || formData.glicemiaStatus) {
            let exame = 'Glicemia';
            if (formData.glicemiaDataRealizacao) exame += ` (${formData.glicemiaDataRealizacao})`;
            if (formData.glicemiaResultadosObtidos) exame += ` - Resultados: ${formData.glicemiaResultadosObtidos}`;
            if (formData.glicemiaStatus) exame += ` - Status: ${formData.glicemiaStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.colesterolDataRealizacao || formData.colesterolResultadosObtidos || formData.colesterolStatus) {
            let exame = 'Colesterol';
            if (formData.colesterolDataRealizacao) exame += ` (${formData.colesterolDataRealizacao})`;
            if (formData.colesterolResultadosObtidos) exame += ` - Resultados: ${formData.colesterolResultadosObtidos}`;
            if (formData.colesterolStatus) exame += ` - Status: ${formData.colesterolStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.triglicerideosDataRealizacao || formData.triglicerideosResultadosObtidos || formData.triglicerideosStatus) {
            let exame = 'Triglicerídeos';
            if (formData.triglicerideosDataRealizacao) exame += ` (${formData.triglicerideosDataRealizacao})`;
            if (formData.triglicerideosResultadosObtidos) exame += ` - Resultados: ${formData.triglicerideosResultadosObtidos}`;
            if (formData.triglicerideosStatus) exame += ` - Status: ${formData.triglicerideosStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.ureiaCreatininaDataRealizacao || formData.ureiaCreatininaResultadosObtidos || formData.ureiaCreatininaStatus) {
            let exame = 'Ureia e Creatinina';
            if (formData.ureiaCreatininaDataRealizacao) exame += ` (${formData.ureiaCreatininaDataRealizacao})`;
            if (formData.ureiaCreatininaResultadosObtidos) exame += ` - Resultados: ${formData.ureiaCreatininaResultadosObtidos}`;
            if (formData.ureiaCreatininaStatus) exame += ` - Status: ${formData.ureiaCreatininaStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.transaminasesDataRealizacao || formData.transaminasesResultadosObtidos || formData.transaminasesStatus) {
            let exame = 'Transaminases';
            if (formData.transaminasesDataRealizacao) exame += ` (${formData.transaminasesDataRealizacao})`;
            if (formData.transaminasesResultadosObtidos) exame += ` - Resultados: ${formData.transaminasesResultadosObtidos}`;
            if (formData.transaminasesStatus) exame += ` - Status: ${formData.transaminasesStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.pcrDataRealizacao || formData.pcrResultadosObtidos || formData.pcrStatus) {
            let exame = 'PCR';
            if (formData.pcrDataRealizacao) exame += ` (${formData.pcrDataRealizacao})`;
            if (formData.pcrResultadosObtidos) exame += ` - Resultados: ${formData.pcrResultadosObtidos}`;
            if (formData.pcrStatus) exame += ` - Status: ${formData.pcrStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.vhsDataRealizacao || formData.vhsResultadosObtidos || formData.vhsStatus) {
            let exame = 'VHS';
            if (formData.vhsDataRealizacao) exame += ` (${formData.vhsDataRealizacao})`;
            if (formData.vhsResultadosObtidos) exame += ` - Resultados: ${formData.vhsResultadosObtidos}`;
            if (formData.vhsStatus) exame += ` - Status: ${formData.vhsStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.eletrolitosDataRealizacao || formData.eletrolitosResultadosObtidos || formData.eletrolitosStatus) {
            let exame = 'Eletrólitos';
            if (formData.eletrolitosDataRealizacao) exame += ` (${formData.eletrolitosDataRealizacao})`;
            if (formData.eletrolitosResultadosObtidos) exame += ` - Resultados: ${formData.eletrolitosResultadosObtidos}`;
            if (formData.eletrolitosStatus) exame += ` - Status: ${formData.eletrolitosStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.examesHormonaisDataRealizacao || formData.examesHormonaisResultadosObtidos || formData.examesHormonaisStatus) {
            let exame = 'Exames Hormonais';
            if (formData.examesHormonaisDataRealizacao) exame += ` (${formData.examesHormonaisDataRealizacao})`;
            if (formData.examesHormonaisResultadosObtidos) exame += ` - Resultados: ${formData.examesHormonaisResultadosObtidos}`;
            if (formData.examesHormonaisStatus) exame += ` - Status: ${formData.examesHormonaisStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.urinaTipoIDataRealizacao || formData.urinaTipoIResultadosObtidos || formData.urinaTipoIStatus) {
            let exame = 'Urina Tipo I';
            if (formData.urinaTipoIDataRealizacao) exame += ` (${formData.urinaTipoIDataRealizacao})`;
            if (formData.urinaTipoIResultadosObtidos) exame += ` - Resultados: ${formData.urinaTipoIResultadosObtidos}`;
            if (formData.urinaTipoIStatus) exame += ` - Status: ${formData.urinaTipoIStatus}`;
            examesLaboratoriais.push(exame);
        }
        if (formData.uroculturaDataRealizacao || formData.uroculturaResultadosObtidos || formData.uroculturaStatus) {
            let exame = 'Urocultura';
            if (formData.uroculturaDataRealizacao) exame += ` (${formData.uroculturaDataRealizacao})`;
            if (formData.uroculturaResultadosObtidos) exame += ` - Resultados: ${formData.uroculturaResultadosObtidos}`;
            if (formData.uroculturaStatus) exame += ` - Status: ${formData.uroculturaStatus}`;
            examesLaboratoriais.push(exame);
        }

        if (examesLaboratoriais.length > 0) {
            dadosFormatados += `EXAMES LABORATORIAIS:\n${examesLaboratoriais.join('\n')}\n\n`;
        }

        // Exames de imagem
        const examesImagem = [];
        if (formData.radiografiaDataRealizacao || formData.radiografiaResultadosObtidos || formData.radiografiaStatus) {
            let exame = 'Radiografia (Raio-X)';
            if (formData.radiografiaDataRealizacao) exame += ` (${formData.radiografiaDataRealizacao})`;
            if (formData.radiografiaResultadosObtidos) exame += ` - Resultados: ${formData.radiografiaResultadosObtidos}`;
            if (formData.radiografiaStatus) exame += ` - Status: ${formData.radiografiaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.ultrassonografiaDataRealizacao || formData.ultrassonografiaResultadosObtidos || formData.ultrassonografiaStatus) {
            let exame = 'Ultrassonografia (USG)';
            if (formData.ultrassonografiaDataRealizacao) exame += ` (${formData.ultrassonografiaDataRealizacao})`;
            if (formData.ultrassonografiaResultadosObtidos) exame += ` - Resultados: ${formData.ultrassonografiaResultadosObtidos}`;
            if (formData.ultrassonografiaStatus) exame += ` - Status: ${formData.ultrassonografiaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.tomografiaDataRealizacao || formData.tomografiaResultadosObtidos || formData.tomografiaStatus) {
            let exame = 'Tomografia Computadorizada (TC)';
            if (formData.tomografiaDataRealizacao) exame += ` (${formData.tomografiaDataRealizacao})`;
            if (formData.tomografiaResultadosObtidos) exame += ` - Resultados: ${formData.tomografiaResultadosObtidos}`;
            if (formData.tomografiaStatus) exame += ` - Status: ${formData.tomografiaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.ressonanciaDataRealizacao || formData.ressonanciaResultadosObtidos || formData.ressonanciaStatus) {
            let exame = 'Ressonância Magnética (RM)';
            if (formData.ressonanciaDataRealizacao) exame += ` (${formData.ressonanciaDataRealizacao})`;
            if (formData.ressonanciaResultadosObtidos) exame += ` - Resultados: ${formData.ressonanciaResultadosObtidos}`;
            if (formData.ressonanciaStatus) exame += ` - Status: ${formData.ressonanciaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.densitometriaOsseaDataRealizacao || formData.densitometriaOsseaResultadosObtidos || formData.densitometriaOsseaStatus) {
            let exame = 'Densitometria Óssea';
            if (formData.densitometriaOsseaDataRealizacao) exame += ` (${formData.densitometriaOsseaDataRealizacao})`;
            if (formData.densitometriaOsseaResultadosObtidos) exame += ` - Resultados: ${formData.densitometriaOsseaResultadosObtidos}`;
            if (formData.densitometriaOsseaStatus) exame += ` - Status: ${formData.densitometriaOsseaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.mamografiaDataRealizacao || formData.mamografiaResultadosObtidos || formData.mamografiaStatus) {
            let exame = 'Mamografia';
            if (formData.mamografiaDataRealizacao) exame += ` (${formData.mamografiaDataRealizacao})`;
            if (formData.mamografiaResultadosObtidos) exame += ` - Resultados: ${formData.mamografiaResultadosObtidos}`;
            if (formData.mamografiaStatus) exame += ` - Status: ${formData.mamografiaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.ecocardiogramaDataRealizacao || formData.ecocardiogramaResultadosObtidos || formData.ecocardiogramaStatus) {
            let exame = 'Ecocardiograma';
            if (formData.ecocardiogramaDataRealizacao) exame += ` (${formData.ecocardiogramaDataRealizacao})`;
            if (formData.ecocardiogramaResultadosObtidos) exame += ` - Resultados: ${formData.ecocardiogramaResultadosObtidos}`;
            if (formData.ecocardiogramaStatus) exame += ` - Status: ${formData.ecocardiogramaStatus}`;
            examesImagem.push(exame);
        }
        if (formData.dopplerVascularDataRealizacao || formData.dopplerVascularResultadosObtidos || formData.dopplerVascularStatus) {
            let exame = 'Doppler Vascular';
            if (formData.dopplerVascularDataRealizacao) exame += ` (${formData.dopplerVascularDataRealizacao})`;
            if (formData.dopplerVascularResultadosObtidos) exame += ` - Resultados: ${formData.dopplerVascularResultadosObtidos}`;
            if (formData.dopplerVascularStatus) exame += ` - Status: ${formData.dopplerVascularStatus}`;
            examesImagem.push(exame);
        }

        if (examesImagem.length > 0) {
            dadosFormatados += `EXAMES DE IMAGEM:\n${examesImagem.join('\n')}\n\n`;
        }

        // Exames cardiológicos
        const examesCardiologicos = [];
        if (formData.ecgDataRealizacao || formData.ecgResultadosObtidos || formData.ecgStatus) {
            let exame = 'Eletrocardiograma (ECG)';
            if (formData.ecgDataRealizacao) exame += ` (${formData.ecgDataRealizacao})`;
            if (formData.ecgResultadosObtidos) exame += ` - Resultados: ${formData.ecgResultadosObtidos}`;
            if (formData.ecgStatus) exame += ` - Status: ${formData.ecgStatus}`;
            examesCardiologicos.push(exame);
        }
        if (formData.testeErgometricoDataRealizacao || formData.testeErgometricoResultadosObtidos || formData.testeErgometricoStatus) {
            let exame = 'Teste Ergométrico (Teste de Esforço)';
            if (formData.testeErgometricoDataRealizacao) exame += ` (${formData.testeErgometricoDataRealizacao})`;
            if (formData.testeErgometricoResultadosObtidos) exame += ` - Resultados: ${formData.testeErgometricoResultadosObtidos}`;
            if (formData.testeErgometricoStatus) exame += ` - Status: ${formData.testeErgometricoStatus}`;
            examesCardiologicos.push(exame);
        }
        if (formData.holterDataRealizacao || formData.holterResultadosObtidos || formData.holterStatus) {
            let exame = 'Holter 24h';
            if (formData.holterDataRealizacao) exame += ` (${formData.holterDataRealizacao})`;
            if (formData.holterResultadosObtidos) exame += ` - Resultados: ${formData.holterResultadosObtidos}`;
            if (formData.holterStatus) exame += ` - Status: ${formData.holterStatus}`;
            examesCardiologicos.push(exame);
        }
        if (formData.mapaDataRealizacao || formData.mapaResultadosObtidos || formData.mapaStatus) {
            let exame = 'MAPA (Monitorização Ambulatorial da PA)';
            if (formData.mapaDataRealizacao) exame += ` (${formData.mapaDataRealizacao})`;
            if (formData.mapaResultadosObtidos) exame += ` - Resultados: ${formData.mapaResultadosObtidos}`;
            if (formData.mapaStatus) exame += ` - Status: ${formData.mapaStatus}`;
            examesCardiologicos.push(exame);
        }
        if (formData.ecocardiogramaDopplerDataRealizacao || formData.ecocardiogramaDopplerResultadosObtidos || formData.ecocardiogramaDopplerStatus) {
            let exame = 'Ecocardiograma com Doppler';
            if (formData.ecocardiogramaDopplerDataRealizacao) exame += ` (${formData.ecocardiogramaDopplerDataRealizacao})`;
            if (formData.ecocardiogramaDopplerResultadosObtidos) exame += ` - Resultados: ${formData.ecocardiogramaDopplerResultadosObtidos}`;
            if (formData.ecocardiogramaDopplerStatus) exame += ` - Status: ${formData.ecocardiogramaDopplerStatus}`;
            examesCardiologicos.push(exame);
        }

        if (examesCardiologicos.length > 0) {
            dadosFormatados += `EXAMES CARDIOLÓGICOS:\n${examesCardiologicos.join('\n')}\n\n`;
        }

        // Exames respiratórios
        const examesRespiratorios = [];
        if (formData.espirometriaDataRealizacao || formData.espirometriaResultadosObtidos || formData.espirometriaStatus) {
            let exame = 'Espirometria';
            if (formData.espirometriaDataRealizacao) exame += ` (${formData.espirometriaDataRealizacao})`;
            if (formData.espirometriaResultadosObtidos) exame += ` - Resultados: ${formData.espirometriaResultadosObtidos}`;
            if (formData.espirometriaStatus) exame += ` - Status: ${formData.espirometriaStatus}`;
            examesRespiratorios.push(exame);
        }
        if (formData.gasometriaDataRealizacao || formData.gasometriaResultadosObtidos || formData.gasometriaStatus) {
            let exame = 'Gasometria Arterial';
            if (formData.gasometriaDataRealizacao) exame += ` (${formData.gasometriaDataRealizacao})`;
            if (formData.gasometriaResultadosObtidos) exame += ` - Resultados: ${formData.gasometriaResultadosObtidos}`;
            if (formData.gasometriaStatus) exame += ` - Status: ${formData.gasometriaStatus}`;
            examesRespiratorios.push(exame);
        }
        if (formData.oximetriaDataRealizacao || formData.oximetriaResultadosObtidos || formData.oximetriaStatus) {
            let exame = 'Oximetria de Pulso';
            if (formData.oximetriaDataRealizacao) exame += ` (${formData.oximetriaDataRealizacao})`;
            if (formData.oximetriaResultadosObtidos) exame += ` - Resultados: ${formData.oximetriaResultadosObtidos}`;
            if (formData.oximetriaStatus) exame += ` - Status: ${formData.oximetriaStatus}`;
            examesRespiratorios.push(exame);
        }
        if (formData.radiografiaToraxDataRealizacao || formData.radiografiaToraxResultadosObtidos || formData.radiografiaToraxStatus) {
            let exame = 'Radiografia de Tórax';
            if (formData.radiografiaToraxDataRealizacao) exame += ` (${formData.radiografiaToraxDataRealizacao})`;
            if (formData.radiografiaToraxResultadosObtidos) exame += ` - Resultados: ${formData.radiografiaToraxResultadosObtidos}`;
            if (formData.radiografiaToraxStatus) exame += ` - Status: ${formData.radiografiaToraxStatus}`;
            examesRespiratorios.push(exame);
        }
        if (formData.testeCaminhadaDataRealizacao || formData.testeCaminhadaResultadosObtidos || formData.testeCaminhadaStatus) {
            let exame = 'Teste de Caminhada de 6 Minutos';
            if (formData.testeCaminhadaDataRealizacao) exame += ` (${formData.testeCaminhadaDataRealizacao})`;
            if (formData.testeCaminhadaResultadosObtidos) exame += ` - Resultados: ${formData.testeCaminhadaResultadosObtidos}`;
            if (formData.testeCaminhadaStatus) exame += ` - Status: ${formData.testeCaminhadaStatus}`;
            examesRespiratorios.push(exame);
        }

        if (examesRespiratorios.length > 0) {
            dadosFormatados += `EXAMES RESPIRATÓRIOS:\n${examesRespiratorios.join('\n')}\n\n`;
        }

        // Exames neurológicos
        const examesNeurologicos = [];
        if (formData.eegDataRealizacao || formData.eegResultadosObtidos || formData.eegStatus) {
            let exame = 'Eletroencefalograma (EEG)';
            if (formData.eegDataRealizacao) exame += ` (${formData.eegDataRealizacao})`;
            if (formData.eegResultadosObtidos) exame += ` - Resultados: ${formData.eegResultadosObtidos}`;
            if (formData.eegStatus) exame += ` - Status: ${formData.eegStatus}`;
            examesNeurologicos.push(exame);
        }
        if (formData.enmgDataRealizacao || formData.enmgResultadosObtidos || formData.enmgStatus) {
            let exame = 'Eletroneuromiografia (ENMG)';
            if (formData.enmgDataRealizacao) exame += ` (${formData.enmgDataRealizacao})`;
            if (formData.enmgResultadosObtidos) exame += ` - Resultados: ${formData.enmgResultadosObtidos}`;
            if (formData.enmgStatus) exame += ` - Status: ${formData.enmgStatus}`;
            examesNeurologicos.push(exame);
        }
        if (formData.ressonanciaCerebralDataRealizacao || formData.ressonanciaCerebralResultadosObtidos || formData.ressonanciaCerebralStatus) {
            let exame = 'Ressonância Magnética Cerebral';
            if (formData.ressonanciaCerebralDataRealizacao) exame += ` (${formData.ressonanciaCerebralDataRealizacao})`;
            if (formData.ressonanciaCerebralResultadosObtidos) exame += ` - Resultados: ${formData.ressonanciaCerebralResultadosObtidos}`;
            if (formData.ressonanciaCerebralStatus) exame += ` - Status: ${formData.ressonanciaCerebralStatus}`;
            examesNeurologicos.push(exame);
        }
        if (formData.tomografiaCerebralDataRealizacao || formData.tomografiaCerebralResultadosObtidos || formData.tomografiaCerebralStatus) {
            let exame = 'Tomografia Cerebral';
            if (formData.tomografiaCerebralDataRealizacao) exame += ` (${formData.tomografiaCerebralDataRealizacao})`;
            if (formData.tomografiaCerebralResultadosObtidos) exame += ` - Resultados: ${formData.tomografiaCerebralResultadosObtidos}`;
            if (formData.tomografiaCerebralStatus) exame += ` - Status: ${formData.tomografiaCerebralStatus}`;
            examesNeurologicos.push(exame);
        }
        if (formData.potenciaisEvocadosDataRealizacao || formData.potenciaisEvocadosResultadosObtidos || formData.potenciaisEvocadosStatus) {
            let exame = 'Potenciais Evocados';
            if (formData.potenciaisEvocadosDataRealizacao) exame += ` (${formData.potenciaisEvocadosDataRealizacao})`;
            if (formData.potenciaisEvocadosResultadosObtidos) exame += ` - Resultados: ${formData.potenciaisEvocadosResultadosObtidos}`;
            if (formData.potenciaisEvocadosStatus) exame += ` - Status: ${formData.potenciaisEvocadosStatus}`;
            examesNeurologicos.push(exame);
        }

        if (examesNeurologicos.length > 0) {
            dadosFormatados += `EXAMES NEUROLÓGICOS:\n${examesNeurologicos.join('\n')}\n\n`;
        }

        // Exames ortopédicos
        const examesOrtopedicos = [];
        if (formData.radiografiasEspecificasDataRealizacao || formData.radiografiasEspecificasResultadosObtidos || formData.radiografiasEspecificasStatus) {
            let exame = 'Radiografias Específicas';
            if (formData.radiografiasEspecificasDataRealizacao) exame += ` (${formData.radiografiasEspecificasDataRealizacao})`;
            if (formData.radiografiasEspecificasResultadosObtidos) exame += ` - Resultados: ${formData.radiografiasEspecificasResultadosObtidos}`;
            if (formData.radiografiasEspecificasStatus) exame += ` - Status: ${formData.radiografiasEspecificasStatus}`;
            examesOrtopedicos.push(exame);
        }
        if (formData.ressonanciaArticularDataRealizacao || formData.ressonanciaArticularResultadosObtidos || formData.ressonanciaArticularStatus) {
            let exame = 'Ressonância Magnética Articular';
            if (formData.ressonanciaArticularDataRealizacao) exame += ` (${formData.ressonanciaArticularDataRealizacao})`;
            if (formData.ressonanciaArticularResultadosObtidos) exame += ` - Resultados: ${formData.ressonanciaArticularResultadosObtidos}`;
            if (formData.ressonanciaArticularStatus) exame += ` - Status: ${formData.ressonanciaArticularStatus}`;
            examesOrtopedicos.push(exame);
        }
        if (formData.ultrassonografiaMusculoesqueleticaDataRealizacao || formData.ultrassonografiaMusculoesqueleticaResultadosObtidos || formData.ultrassonografiaMusculoesqueleticaStatus) {
            let exame = 'Ultrassonografia Musculoesquelética';
            if (formData.ultrassonografiaMusculoesqueleticaDataRealizacao) exame += ` (${formData.ultrassonografiaMusculoesqueleticaDataRealizacao})`;
            if (formData.ultrassonografiaMusculoesqueleticaResultadosObtidos) exame += ` - Resultados: ${formData.ultrassonografiaMusculoesqueleticaResultadosObtidos}`;
            if (formData.ultrassonografiaMusculoesqueleticaStatus) exame += ` - Status: ${formData.ultrassonografiaMusculoesqueleticaStatus}`;
            examesOrtopedicos.push(exame);
        }
        if (formData.avaliacaoPosturalDataRealizacao || formData.avaliacaoPosturalResultadosObtidos || formData.avaliacaoPosturalStatus) {
            let exame = 'Avaliação Postural por Fotogrametria';
            if (formData.avaliacaoPosturalDataRealizacao) exame += ` (${formData.avaliacaoPosturalDataRealizacao})`;
            if (formData.avaliacaoPosturalResultadosObtidos) exame += ` - Resultados: ${formData.avaliacaoPosturalResultadosObtidos}`;
            if (formData.avaliacaoPosturalStatus) exame += ` - Status: ${formData.avaliacaoPosturalStatus}`;
            examesOrtopedicos.push(exame);
        }
        if (formData.baropodometriaDataRealizacao || formData.baropodometriaResultadosObtidos || formData.baropodometriaStatus) {
            let exame = 'Baropodometria (Análise da Pisada)';
            if (formData.baropodometriaDataRealizacao) exame += ` (${formData.baropodometriaDataRealizacao})`;
            if (formData.baropodometriaResultadosObtidos) exame += ` - Resultados: ${formData.baropodometriaResultadosObtidos}`;
            if (formData.baropodometriaStatus) exame += ` - Status: ${formData.baropodometriaStatus}`;
            examesOrtopedicos.push(exame);
        }

        if (examesOrtopedicos.length > 0) {
            dadosFormatados += `EXAMES ORTOPÉDICOS E FUNCIONAIS:\n${examesOrtopedicos.join('\n')}\n\n`;
        }

        // Exames urológicos e ginecológicos
        const examesUrologicos = [];
        if (formData.exameUrinaDataRealizacao || formData.exameUrinaResultadosObtidos || formData.exameUrinaStatus) {
            let exame = 'Exame de Urina';
            if (formData.exameUrinaDataRealizacao) exame += ` (${formData.exameUrinaDataRealizacao})`;
            if (formData.exameUrinaResultadosObtidos) exame += ` - Resultados: ${formData.exameUrinaResultadosObtidos}`;
            if (formData.exameUrinaStatus) exame += ` - Status: ${formData.exameUrinaStatus}`;
            examesUrologicos.push(exame);
        }
        if (formData.ultrassonografiaPelvicaDataRealizacao || formData.ultrassonografiaPelvicaResultadosObtidos || formData.ultrassonografiaPelvicaStatus) {
            let exame = 'Ultrassonografia Pélvica/Transvaginal';
            if (formData.ultrassonografiaPelvicaDataRealizacao) exame += ` (${formData.ultrassonografiaPelvicaDataRealizacao})`;
            if (formData.ultrassonografiaPelvicaResultadosObtidos) exame += ` - Resultados: ${formData.ultrassonografiaPelvicaResultadosObtidos}`;
            if (formData.ultrassonografiaPelvicaStatus) exame += ` - Status: ${formData.ultrassonografiaPelvicaStatus}`;
            examesUrologicos.push(exame);
        }
        if (formData.psaDataRealizacao || formData.psaResultadosObtidos || formData.psaStatus) {
            let exame = 'PSA (Antígeno Prostático Específico)';
            if (formData.psaDataRealizacao) exame += ` (${formData.psaDataRealizacao})`;
            if (formData.psaResultadosObtidos) exame += ` - Resultados: ${formData.psaResultadosObtidos}`;
            if (formData.psaStatus) exame += ` - Status: ${formData.psaStatus}`;
            examesUrologicos.push(exame);
        }
        if (formData.papanicolauDataRealizacao || formData.papanicolauResultadosObtidos || formData.papanicolauStatus) {
            let exame = 'Papanicolau';
            if (formData.papanicolauDataRealizacao) exame += ` (${formData.papanicolauDataRealizacao})`;
            if (formData.papanicolauResultadosObtidos) exame += ` - Resultados: ${formData.papanicolauResultadosObtidos}`;
            if (formData.papanicolauStatus) exame += ` - Status: ${formData.papanicolauStatus}`;
            examesUrologicos.push(exame);
        }
        if (formData.colposcopiaDataRealizacao || formData.colposcopiaResultadosObtidos || formData.colposcopiaStatus) {
            let exame = 'Colposcopia';
            if (formData.colposcopiaDataRealizacao) exame += ` (${formData.colposcopiaDataRealizacao})`;
            if (formData.colposcopiaResultadosObtidos) exame += ` - Resultados: ${formData.colposcopiaResultadosObtidos}`;
            if (formData.colposcopiaStatus) exame += ` - Status: ${formData.colposcopiaStatus}`;
            examesUrologicos.push(exame);
        }

        if (examesUrologicos.length > 0) {
            dadosFormatados += `EXAMES UROLÓGICOS E GINECOLÓGICOS:\n${examesUrologicos.join('\n')}\n\n`;
        }

        // Evolução do Paciente
        if (formData.observacoesEvolucao || formData.medicoSolicitante) {
            dadosFormatados += `EVOLUÇÃO DO PACIENTE:\n`;
            if (formData.observacoesEvolucao) {
                dadosFormatados += `Observações da Evolução: ${formData.observacoesEvolucao}\n`;
            }
            if (formData.medicoSolicitante) {
                dadosFormatados += `Médico Solicitante: ${formData.medicoSolicitante}\n`;
            }
            dadosFormatados += `\n`;
        }

        // Observações gerais
        if (formData.observacoes) {
            dadosFormatados += `OBSERVAÇÕES GERAIS:\n${formData.observacoes}\n`;
        }

        console.log('📋 Dados formatados dos exames complementares:', dadosFormatados);
        return dadosFormatados || 'Nenhum exame complementar preenchido.';
    };

    const value = {
        avaliacaoConsolidada,
        salvarAvaliacaoConsolidada,
        limparAvaliacaoConsolidada,
        consolidarDadosAvaliacao,
        formatarDadosAnamnese,
        formatarDadosExameFisico,
        formatarDadosExamesComplementares
    };

    return (
        <AvaliacaoConsolidadaContext.Provider value={value}>
            {children}
        </AvaliacaoConsolidadaContext.Provider>
    );
};

// Hook para usar o Context
export const useAvaliacaoConsolidada = () => {
    const context = useContext(AvaliacaoConsolidadaContext);
    if (!context) {
        throw new Error('useAvaliacaoConsolidada deve ser usado dentro de um AvaliacaoConsolidadaProvider');
    }
    return context;
};

export default AvaliacaoConsolidadaContext;
