import React from 'react';

interface SplashScreenProps {
  onStart: () => void;
}

const DetailCard: React.FC<{ icon: string; title: string; children: React.ReactNode; delay: string }> = ({ icon, title, children, delay }) => (
  <div className={`flex-1 min-w-[280px] bg-white p-5 rounded-xl shadow-md border border-gray-200/80 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 ${delay}`}>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
        <i className={`fas ${icon} text-teal-600 fa-fw`}></i>
      </div>
      <div>
        <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs">{title}</h3>
        <p className="text-gray-800 font-medium">{children}</p>
      </div>
    </div>
  </div>
);

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-teal-200/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-blue-200/40 rounded-full filter blur-3xl opacity-50 animate-pulse-slow delay-2s"></div>

      <div className="w-full max-w-5xl text-center z-10">

        {/* Hospital Logo */}
        <div className="mb-8 animate-float">
            <img src="https://fundacionhcgdl.org/wp-content/uploads/HospitalCivilGdl.png" alt="Logo Hospital Civil de Guadalajara" className="mx-auto h-32 object-contain" />
        </div>

        <div className="mb-12 fade-in-up delay-200ms">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
            Análisis de Controversia
          </h1>
          <div className="mt-6 text-lg md:text-xl text-gray-600 flex flex-col md:flex-row items-center justify-center gap-x-4">
            <span className="font-medium text-blue-600">Almacén de Víveres</span>
            <span className="text-gray-400 font-light text-sm hidden md:inline-block">&</span>
            <span className="font-medium text-blue-600">Coordinación General Jurídica</span>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-gray-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-sm fade-in-up delay-400ms">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <DetailCard icon="fa-gavel" title="Proceso" delay="fade-in-up delay-600ms">
                    Licitación Pública Nacional LPN22/2024
                </DetailCard>
                <DetailCard icon="fa-pills" title="Suministro" delay="fade-in-up delay-800ms">
                    Fórmulas Lácteas para el Hospital Civil
                </DetailCard>
                <DetailCard icon="fa-truck" title="Proveedor" delay="fade-in-up delay-1000ms">
                    Artículos Médicos y Hospitalarios, SA de CV.
                </DetailCard>
            </div>
        </div>

        <div className="fade-in-up delay-1200ms">
          <button
            onClick={onStart}
            className="px-12 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Iniciar Análisis
          </button>
        </div>

      </div>
    </div>
  );
};
