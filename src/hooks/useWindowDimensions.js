import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

// Função para obter dimensões de forma segura
const getSafeDimensions = () => {
  try {
    if (Platform.OS === 'web') {
      return {
        width: typeof window !== 'undefined' ? window.innerWidth : 375,
        height: typeof window !== 'undefined' ? window.innerHeight : 667
      };
    } else {
      // Para mobile, usar Dimensions de forma segura
      const { Dimensions } = require('react-native');
      return Dimensions.get('window');
    }
  } catch (error) {
    console.warn('Erro ao obter dimensões:', error);
    return { width: 375, height: 667 };
  }
};

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(() => getSafeDimensions());

  useEffect(() => {
    let subscription = null;
    
    // Para web, usar listener de resize
    if (Platform.OS === 'web') {
      const handleResize = () => {
        setDimensions(getSafeDimensions());
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
      }
      
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
      };
    } else {
      // Para mobile, usar Dimensions listener
      try {
        const { Dimensions } = require('react-native');
        subscription = Dimensions.addEventListener('change', ({ window }) => {
          setDimensions({ width: window.width, height: window.height });
        });
      } catch (error) {
        console.warn('Erro ao adicionar listener de dimensões:', error);
      }
      
      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    }
  }, []);

  return dimensions;
};
