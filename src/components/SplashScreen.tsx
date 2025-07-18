import React from 'react';

interface SplashScreenProps {
  onStart: () => void;
}

const DetailCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex-1 min-w-[280px] bg-gray-800/50 p-4 rounded-lg border border-gray-700">
    <div className="flex items-center gap-3">
      <i className={`fas ${icon} text-teal-400 fa-fw`}></i>
      <h3 className="font-semibold text-gray-300 uppercase tracking-wider text-sm">{title}</h3>
    </div>
    <p className="mt-2 text-gray-400 text-sm">{children}</p>
  </div>
);

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-8 fade-in">
      <div className="w-full max-w-4xl text-center">
        
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Análisis de Controversia
          </h1>
          <div className="mt-6 text-lg md:text-xl text-gray-400 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="font-semibold text-teal-300/80">Almacén de Víveres</span>
            <span className="text-gray-500 font-light text-base hidden md:inline">ENTRE</span>
            <span className="font-semibold text-teal-300/80">Coordinación General Jurídica</span>
          </div>
        </div>

        {/* Case Details */}
        <div className="border-t border-gray-700/50 pt-8 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
                <DetailCard icon="fa-gavel" title="Proceso">
                    Licitación Pública Nacional LPN22/2024
                </DetailCard>
                <DetailCard icon="fa-pills" title="Suministro">
                    Fórmulas Lácteas para el Hospital Civil de Guadalajara
                </DetailCard>
                <DetailCard icon="fa-truck" title="Proveedor">
                    Artículos Médicos y Hospitalarios, SA de CV.
                </DetailCard>
            </div>
        </div>

        {/* Call to Action */}
        <div>
          <button
            onClick={onStart}
            className="px-10 py-4 bg-teal-500 text-gray-900 font-bold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300/50 transform hover:scale-105 transition-all duration-300"
          >
            Iniciar Análisis
          </button>
        </div>

      </div>
      <footer className="absolute bottom-6 text-xs text-gray-600">
        Una Herramienta de Análisis Cognitivo
      </footer>
    </div>
  );
};
