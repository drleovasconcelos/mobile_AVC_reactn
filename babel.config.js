module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Plugin react-native-web apenas para web
      ...(process.env.EXPO_PLATFORM === 'web' ? [
        ['react-native-web', { 
          commonjs: true,
          platform: 'web'
        }]
      ] : [])
    ],
  };
};
