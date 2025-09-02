# Componente DatePicker

## Descrição
O `DatePicker` é um componente reutilizável para seleção de datas que encapsula toda a lógica do `DateTimePicker` nativo do React Native.

## Propriedades (Props)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `label` | string | - | Texto do label que aparece acima do botão |
| `value` | string | - | Data atual no formato DD/MM/AAAA |
| `onDateChange` | function | - | Função chamada quando uma data é selecionada |
| `placeholder` | string | '📅 Selecionar Data' | Texto exibido quando não há data selecionada |
| `maximumDate` | Date | null | Data máxima permitida (null = sem limite) |
| `minimumDate` | Date | new Date(1900, 0, 1) | Data mínima permitida |
| `disabled` | boolean | false | Se o componente está desabilitado |
| `style` | object | {} | Estilos adicionais para o container |
| `labelStyle` | object | {} | Estilos adicionais para o label |
| `buttonStyle` | object | {} | Estilos adicionais para o botão |
| `textStyle` | object | {} | Estilos adicionais para o texto do botão |

## Exemplos de Uso

### 1. Data de Avaliação (não permite datas futuras)
```jsx
<DatePicker
    label="Data da avaliação:"
    value={formData.dataAvaliacao}
    onDateChange={handleDataAvaliacaoChange}
    maximumDate={new Date()}
    minimumDate={new Date(1900, 0, 1)}
/>
```

### 2. Data de Nascimento (permite qualquer data passada)
```jsx
<DatePicker
    label="Data de nascimento:"
    value={formData.dataNascimento}
    onDateChange={handleDataNascimentoChange}
    minimumDate={new Date(1900, 0, 1)}
/>
```

### 3. Data com Limites Específicos
```jsx
<DatePicker
    label="Data de início do tratamento:"
    value={formData.dataInicioTratamento}
    onDateChange={handleDataInicioTratamentoChange}
    maximumDate={new Date()}
    minimumDate={new Date(2020, 0, 1)}
/>
```

### 4. Componente Desabilitado
```jsx
<DatePicker
    label="Data de alta:"
    value={formData.dataAlta}
    onDateChange={handleDataAltaChange}
    disabled={true}
/>
```

### 5. Com Estilos Personalizados
```jsx
<DatePicker
    label="Data de consulta:"
    value={formData.dataConsulta}
    onDateChange={handleDataConsultaChange}
    style={{ marginBottom: 20 }}
    labelStyle={{ color: '#e74c3c', fontWeight: 'bold' }}
    buttonStyle={{ backgroundColor: '#e74c3c' }}
    textStyle={{ fontSize: 16 }}
/>
```

## Função de Callback

A função `onDateChange` recebe um parâmetro `formattedDate` no formato string DD/MM/AAAA:

```jsx
const handleDataChange = (formattedDate) => {
    console.log('Data selecionada:', formattedDate); // Ex: "15/12/2024"
    setFormData(prev => ({
        ...prev,
        dataSelecionada: formattedDate
    }));
};
```

## Características Técnicas

- **Formato de Data**: Sempre retorna no formato brasileiro (DD/MM/AAAA)
- **Validação**: Valida automaticamente se a data é válida
- **Plataforma**: Adapta-se automaticamente entre iOS e Android
- **Acessibilidade**: Suporte para leitores de tela
- **Performance**: Otimizado com `useCallback` para evitar re-renders desnecessários

## Dependências

- `@react-native-community/datetimepicker`
- React Native core components

## Notas Importantes

1. **Data Mínima**: Por padrão, permite datas a partir de 1900
2. **Data Máxima**: Se não especificada, permite qualquer data futura
3. **Formato**: Sempre retorna no formato brasileiro, independente da localização do dispositivo
4. **Estado**: O componente gerencia internamente o estado de exibição do picker
5. **Validação**: Valida automaticamente se a data selecionada está dentro dos limites especificados
