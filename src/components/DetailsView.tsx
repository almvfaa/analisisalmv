import React, { useState, useEffect } from 'react';
import type { Document, TimelineEvent } from '../types/types';
import { partyColorConfig, simpleExplanations, tourDescriptions, KEY_OCS, getFileIcon, legalFramework } from '../config/constants';

// --- Sub-components for Legal Framework ---
const AccordionItem: React.FC<{ category: typeof legalFramework[0], isInitiallyOpen?: boolean }> = ({ category, isInitiallyOpen = false }) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <i className={`fas ${category.icon} w-5 text-center text-teal-600 dark:text-teal-400`}></i>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{category.category}</span>
                </div>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
                    <ul className="space-y-2">
                        {category.items.map((item, index) => (
                             <li key={index} className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


interface DetailsViewProps {
    event: TimelineEvent | null;
    documents: Document[];
    tourStep: number;
    tourSize: number;
    gammaActive: boolean;
    onNextStep: () => void;
    onSelectDocument: (doc: Document) => void;
    onRestart: () => void;
}

type Tab = 'summary' | 'legal' | 'analysis' | 'docs';

export const DetailsView: React.FC<DetailsViewProps> = ({ event, documents, tourStep, tourSize, gammaActive, onNextStep, onSelectDocument, onRestart }) => {
    const [isRevealing, setIsRevealing] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('summary');

    useEffect(() => {
        setIsRevealing(false);
        if (event?.party !== 'Análisis' && activeTab === 'legal') {
            setActiveTab('summary');
        } else if (!activeTab) {
            setActiveTab('summary');
        }
        const timer = setTimeout(() => setIsRevealing(true), 100);
        return () => clearTimeout(timer);
    }, [event?.id, activeTab]);

    if (!event) {
        return (
            <div className="flex-grow flex items-center justify-center text-center p-8">
                <div>
                    <i className="fas fa-search-minus text-5xl text-gray-400 dark:text-gray-500 mb-4"></i>
                    <h2 className="font-bold text-gray-600 dark:text-gray-300">No se encontraron hechos</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Pruebe ajustando los filtros o el término de búsqueda.</p>
                </div>
            </div>
        );
    }

    const colors = partyColorConfig[event.party];
    const eventDocuments = documents.filter(doc => event.documentIds.includes(doc.id));
    const isAnalisis = event.party === 'Análisis';
    const progressPercentage = (tourStep / (tourSize - 1)) * 100;

    const TabButton: React.FC<{tab: Tab, label: string, icon: string}> = ({ tab, label, icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-sm font-semibold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === tab 
                ? `${colors.border} ${colors.text}` 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
        >
            <i className={`fas ${icon} fa-fw`}></i>
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className={`flex-grow flex flex-col bg-white dark:bg-gray-800/50 ${isAnalisis ? `border-t-2 ${colors.border}` : `border-t-4 ${colors.border}`} ${isRevealing ? 'is-revealing' : ''} ${gammaActive && event ? 'gamma-target' : ''}`}
             style={(gammaActive && event) ? { '--pulse-color': `var(--party-${event.party.toLowerCase()})` } as React.CSSProperties : {}}>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5">
                <div className={`h-1.5 rounded-r-full ${colors.bg.replace('/10', '')}`} style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>

            <div className="flex flex-col flex-grow min-h-0">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <TabButton tab="summary" label="Resumen" icon="fa-lightbulb" />
                    {isAnalisis && <TabButton tab="legal" label="Marco Normativo" icon="fa-scale-balanced" />}
                    <TabButton tab="analysis" label="Análisis del Hecho" icon="fa-file-alt" />
                    <TabButton tab="docs" label="Documentos" icon="fa-paperclip" />
                </div>

                <div className="flex-grow overflow-y-auto">
                    <div key={activeTab} className="fade-in p-6 lg:p-8">
                        {activeTab === 'summary' && (
                            <div className="bg-[var(--focus-cognitive)] border-l-4 border-[var(--focus-cognitive-border)] p-4 rounded-r-lg">
                                <p className="text-[var(--text-main)] opacity-90" dangerouslySetInnerHTML={{ __html: simpleExplanations[event.id] }}></p>
                            </div>
                        )}

                        {activeTab === 'legal' && isAnalisis && (
                           <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                               {legalFramework.map((category, index) => (
                                   <AccordionItem key={index} category={category} isInitiallyOpen={false} />
                               ))}
                           </div>
                        )}
                        
                        {activeTab === 'analysis' && (
                            <div>
                                <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-950/50 border-l-4 border-teal-500 text-teal-800 dark:text-teal-200 rounded-r-lg italic">
                                  <p>{tourDescriptions[event.id]}</p>
                                </div>
                                <dl className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {event.description.map((item, index) => (
                                        <div key={index}>
                                            {item.label && <dt className="font-semibold text-gray-800 dark:text-gray-100"><i className="fas fa-file-alt mr-2 text-gray-500"></i>{item.label}</dt>}
                                            <dd className={`whitespace-pre-line ${item.label ? 'pl-1' : ''}`} dangerouslySetInnerHTML={{ __html: item.content }}></dd>
                                        </div>
                                    ))}
                                </dl>
                                {event.party === 'CGJ' && event.purchaseOrders && event.purchaseOrders.length > 0 && (
                                    <div className="mt-8 space-y-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-100"><i className="fas fa-list-ol mr-2 text-gray-500"></i>Órdenes de compra solicitadas:</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {event.purchaseOrders.map(oc => {
                                                let cellClasses = 'p-3 rounded-lg text-center font-mono text-sm font-semibold transition-colors duration-200';
                                                if (oc === KEY_OCS.CONCILIACION) cellClasses += ' bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 ring-2 ring-offset-2 ring-blue-300 dark:ring-offset-gray-900';
                                                else if (KEY_OCS.PENALIZACIONES.includes(oc)) cellClasses += ' bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 ring-2 ring-offset-2 ring-purple-300 dark:ring-offset-gray-900';
                                                else cellClasses += ' bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
                                                return <div key={oc} className={cellClasses}>{oc}</div>;
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'docs' && (
                             <div>
                                {eventDocuments.length > 0 ? (
                                    <ul className="space-y-3">
                                        {eventDocuments.map(doc => (
                                            <li key={doc.id}>
                                                <button onClick={() => onSelectDocument(doc)} className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-all duration-200 text-left group">
                                                    <i className={`fas ${getFileIcon(doc.type)} text-xl text-teal-500 dark:text-teal-400 mr-4 w-6 text-center`}></i>
                                                    <div className="flex-grow">
                                                        <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-teal-800 dark:group-hover:text-white flex-grow">{doc.name}</span>
                                                        <div className="flex items-center gap-x-3 mt-1">
                                                            <time className="text-xs text-gray-500 dark:text-gray-400">{new Date(doc.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">{doc.type}</span>
                                                        </div>
                                                    </div>
                                                    <i className="fas fa-external-link-alt text-gray-400 dark:text-gray-500 ml-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-transform transform group-hover:scale-110"></i>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="pt-4 text-gray-500 dark:text-gray-400 italic">No hay documentos de soporte para este hecho.</p>}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    {tourStep < tourSize - 1 ? (
                        <button onClick={onNextStep} className={`w-full flex items-center p-4 font-bold rounded-lg text-left group text-lg text-white ${colors.dot} transition-opacity hover:opacity-90`}>
                            <span className="flex-grow">Siguiente Hecho</span>
                            <i className="fas fa-arrow-right ml-2 transition-transform transform group-hover:translate-x-2"></i>
                        </button>
                    ) : (
                        <div className="text-center p-2">
                            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">Has llegado al final de la línea de tiempo.</p>
                            <button onClick={onRestart} className="flex items-center justify-center w-full sm:w-auto sm:mx-auto px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                <i className="fas fa-redo-alt mr-2"></i>
                                Reiniciar Análisis
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
