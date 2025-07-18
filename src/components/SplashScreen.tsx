import React from 'react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8 fade-in">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-teal-300">
          Análisis de Controversia
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Almacén de Víveres vs. Coordinación General Jurídica
        </p>
        <div className="mt-12">
          <button
            onClick={onStart}
            className="px-8 py-3 bg-teal-500 text-gray-900 font-bold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300/50 transform hover:scale-105 transition-all duration-300"
          >
            Iniciar Análisis
          </button>
        </div>
      </div>
      <footer className="absolute bottom-8 text-xs text-gray-500">
        Una Herramienta de Análisis Cognitivo
      </footer>
    </div>
  );
};
