const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurações específicas para web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configurações para resolver problemas de módulos nativos na web
config.resolver.alias = {
  ...config.resolver.alias,
  // Mapear módulos nativos para versões web quando necessário
};

// Configurações de transformação
config.transformer = {
  ...config.transformer,
  // Ignorar módulos que causam problemas na web
  unstable_allowRequireContext: false,
};

// Configurações para resolver problemas de NativeModule
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Configurações específicas para web - apenas quando for web
if (process.env.EXPO_PLATFORM === 'web') {
  config.resolver.alias = {
    ...config.resolver.alias,
    'react-native': 'react-native-web',
  };
  
  // Configurações específicas para web
  config.resolver.resolverMainFields = ['browser', 'main'];
} else {
  // Configurações para mobile (iOS/Android)
  config.resolver.resolverMainFields = ['react-native', 'main'];
}

module.exports = config;
