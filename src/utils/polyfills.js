// Polyfills para compatibilidade com web
import { Platform } from 'react-native';

// Polyfill para NativeModules
if (Platform.OS === 'web') {
  // Mock NativeModules para web
  if (typeof global !== 'undefined') {
    global.NativeModules = global.NativeModules || {};
  }
  
  // Mock para módulos específicos que podem causar erro
  const mockNativeModule = {
    addListener: () => {},
    removeListeners: () => {},
    removeAllListeners: () => {},
  };

  // Mock módulos comuns que podem causar erro
  const mockModules = [
    'AsyncStorage',
    'Dimensions',
    'Keyboard',
    'Linking',
    'NetInfo',
    'StatusBar',
    'AppState',
    'DeviceInfo',
    'ExamesComplementares',
    'Anamnese',
    'ExameFisico',
  ];

  mockModules.forEach(moduleName => {
    if (global.NativeModules && !global.NativeModules[moduleName]) {
      global.NativeModules[moduleName] = mockNativeModule;
    }
  });
}

export default {};
