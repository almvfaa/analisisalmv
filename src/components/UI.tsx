import React from 'react';
import type { Document } from '../types/types';

export const HumanBustIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

export const N170Icon: React.FC<{ className?: string }> = ({ className }) => (
    <div style={{ perspective: '80px' }} className={className}>
        <div style={{ transform: 'rotateY(25deg)', width: '100%', height: '100%' }}>
            <HumanBustIcon />
        </div>
    </div>
);

export const DocumentGuideModal: React.FC<{ doc: Document; guide: { description: string; points: string[] }; onClose: () => void; onConfirm: () => void; }> = ({ doc, guide, onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <div className="p-6">
                <p className="font-semibold text-teal-600 dark:text-teal-400">Guía para el Documento</p>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-1">{doc.name}</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{guide.description}</p>

                <div className="mt-5">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200"><i className="fas fa-search-plus mr-2 text-gray-500"></i>Puntos Clave a Buscar:</h4>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {guide.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-end items-center space-x-3 rounded-b-xl">
                 <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500">Cerrar</button>
                 <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <i className="fas fa-external-link-alt mr-2"></i>Abrir Documento
                 </button>
            </div>
        </div>
    </div>
);

export const ThemeSwitcher: React.FC<{ theme: string; setTheme: (theme: string) => void }> = ({ theme, setTheme }) => (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all" aria-label="Cambiar tema">
      <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} transition-transform duration-300`}></i>
    </button>
);

export const GammaModeSwitcher: React.FC<{ isEnabled: boolean; setEnabled: (enabled: boolean) => void }> = ({ isEnabled, setEnabled }) => (
    <button onClick={() => setEnabled(!isEnabled)} className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all" aria-label="Activar Modo Enfoque Gamma">
      <i className={`fas fa-brain transition-colors duration-300 ${isEnabled ? 'text-[var(--party-analisis)]' : ''}`}></i>
    </button>
);
