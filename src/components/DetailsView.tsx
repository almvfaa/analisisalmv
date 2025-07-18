import React, { useState, useEffect } from 'react';
import type { Document, TimelineEvent } from '../types/types';
import { partyColorConfig, simpleExplanations, tourDescriptions, KEY_OCS, getFileIcon } from '../config/constants';

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

export const DetailsView: React.FC<DetailsViewProps> = ({ event, documents, tourStep, tourSize, gammaActive, onNextStep, onSelectDocument, onRestart }) => {

    const [isRevealing, setIsRevealing] = useState(false);

    useEffect(() => {
        setIsRevealing(false); // Reset on new event
        const timer = setTimeout(() => {
            setIsRevealing(true);
        }, 100); // Short delay to trigger animation correctly
        return () => clearTimeout(timer);
    }, [event?.id]);

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

    const handleDocumentClick = (doc: Document) => {
        onSelectDocument(doc);
    };

    const containerStyle = (gammaActive && event)
        ? { '--pulse-color': `var(--party-${event.party.toLowerCase()})` } as React.CSSProperties
        : {};

    return (
        <div
            className={`flex-grow overflow-y-auto bg-white dark:bg-gray-800/50 ${isAnalisis ? `border-t-2 ${colors.border}` : `border-t-4 ${colors.border}`} ${isRevealing ? 'is-revealing' : ''} ${gammaActive && event ? 'gamma-target' : ''}`}
            style={containerStyle}
        >
            <div className="p-6 lg:p-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">

                    <div className="py-6 reveal-item delay-1">
                        <div className="bg-[var(--focus-cognitive)] border-l-4 border-[var(--focus-cognitive-border)] p-4 rounded-r-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-lightbulb text-[var(--text-main)] text-xl"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="font-semibold text-[var(--text-main)]">En Palabras Simples</p>
                                    <p className="mt-1 text-[var(--text-main)] opacity-90">
                                        {simpleExplanations[event.id]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 reveal-item delay-2">
                        <div className="mt-2 mb-6 p-4 bg-teal-50 dark:bg-teal-950/50 border-l-4 border-teal-500 text-teal-800 dark:text-teal-200 rounded-r-lg italic">
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
                    </div>

                    {event.party === 'CGJ' && event.purchaseOrders && event.purchaseOrders.length > 0 && (
                        <div className="py-8 reveal-item delay-3">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-100"><i className="fas fa-list-ol mr-2 text-gray-500"></i>Ordenes de compra solicitadas:</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {event.purchaseOrders.map(oc => {
                                        let cellClasses = 'p-3 rounded-lg text-center font-mono text-sm font-semibold transition-colors duration-200';
                                        if (oc === KEY_OCS.CONCILIACION) {
                                            cellClasses += ' bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 ring-2 ring-offset-2 ring-blue-300 dark:ring-offset-gray-900';
                                        } else if (KEY_OCS.PENALIZACIONES.includes(oc)) {
                                            cellClasses += ' bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 ring-2 ring-offset-2 ring-purple-300 dark:ring-offset-gray-900';
                                        } else {
                                            cellClasses += ' bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
                                        }
                                        return <div key={oc} className={cellClasses}>{oc}</div>;
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="reveal-item delay-4">
                        {(event.documentIds.length > 0) && (
                            <div className="py-8 space-y-8">
                                <div>
                                    <h3 className={`font-bold text-gray-700 dark:text-gray-200 border-b-2 ${colors.border} pb-2`}><i className="fas fa-paperclip mr-2 text-gray-500"></i>Soporte Documental ({eventDocuments.length})</h3>
                                    {eventDocuments.length > 0 ? (
                                        <ul className="space-y-3 pt-4">
                                            {eventDocuments.map(doc => (
                                                <li key={doc.id}><button onClick={() => handleDocumentClick(doc)} className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-all duration-200 text-left group"><i className={`fas ${getFileIcon(doc.type)} text-xl text-teal-500 dark:text-teal-400 mr-4 w-6 text-center`}></i><div className="flex-grow"><span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-teal-800 dark:group-hover:text-white flex-grow">{doc.name}</span><div className="flex items-center gap-x-3 mt-1"><time className="text-xs text-gray-500 dark:text-gray-400">{new Date(doc.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">{doc.type}</span></div></div><i className="fas fa-external-link-alt text-gray-400 dark:text-gray-500 ml-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-transform transform group-hover:scale-110"></i></button></li>
                                            ))}
                                        </ul>
                                    ) : <p className="pt-4 text-gray-500 dark:text-gray-400 italic">No hay documentos de soporte para este hecho.</p>}
                                </div>
                            </div>
                        )}

                        <div className="py-8">
                            {tourStep < tourSize - 1 ? (
                                <button onClick={onNextStep} className="neuro-button w-full flex items-center p-4 font-bold rounded-lg text-left group text-lg">
                                    <span className="flex-grow">Siguiente Hecho</span>
                                    <i className="fas fa-arrow-right ml-2 transition-transform transform group-hover:translate-x-2"></i>
                                </button>
                            ) : (
                                <div className="text-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">Has llegado al final de la línea de tiempo.</p>
                                    <button onClick={onRestart} className="flex items-center justify-center w-full sm:w-auto sm:mx-auto px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <i className="fas fa-redo-alt mr-2"></i>
                                        Reiniciar Análisis
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
