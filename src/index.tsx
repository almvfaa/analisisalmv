import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { caseFileData } from './data/caseFile';
import type { CaseFile, Document, TimelineEvent } from './types/types';
import { DetailsView } from './components/DetailsView';
import { DocumentGuideModal, ThemeSwitcher, GammaModeSwitcher, N170Icon } from './components/UI';
import { partyColorConfig, partyFullNames, getEventDisplayDetails, documentGuides, tourPath, getPartyVarName } from './config/constants';

// --- COMPONENTE PRINCIPAL ---

const App: React.FC<{ data: CaseFile }> = ({ data }) => {
    // --- ESTADO ---
    const [tourStep, setTourStep] = useState(0);
    const [theme, setTheme] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light');
    const [guidedDoc, setGuidedDoc] = useState<Document | null>(null);
    const [gammaMode, setGammaMode] = useState(false);

    const handleRestartTour = () => {
        setTourStep(0);
    };

    const handleSelectEvent = (eventId: string) => {
        const newStep = tourPath.indexOf(eventId);
        if (newStep !== -1) {
            setTourStep(newStep);
        }
    };

    // --- EFECTOS ---
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // --- DATOS MEMORIZADOS ---
    const sortedEvents = useMemo(() => [...data.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), [data.events]);

    const filteredEvents = useMemo(() => {
        const visibleEventIds = tourPath.slice(0, tourStep + 1);
        return sortedEvents.filter(event => visibleEventIds.includes(event.id));
    }, [sortedEvents, tourStep]);

    const selectedEvent = useMemo(() => filteredEvents.find(event => event.id === tourPath[tourStep]) || filteredEvents[0] || null, [tourStep, filteredEvents]);

    // --- MANEJADORES DE EVENTOS ---
    const handleNextStep = () => {
        if (tourStep < tourPath.length - 1) {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
        setTourStep(prev => Math.min(prev + 1, tourPath.length - 1));
    };

    return (
        <>
            <div className="relative flex flex-col h-screen">
                <GammaModeSwitcher isEnabled={gammaMode} setEnabled={setGammaMode} />
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
                <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col flex-grow">

                    <div className="flex flex-col lg:flex-row flex-grow bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                        {/* Panel de Control y Línea de Tiempo */}
                        <aside className="w-full lg:w-1/3 xl:w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                            <div className={`p-6 border-b border-gray-200 dark:border-gray-700 transition-colors ${selectedEvent ? partyColorConfig[selectedEvent.party].bg : 'bg-gray-50 dark:bg-gray-900/25'}`}>
                                {selectedEvent && (
                                    <div className="flex items-center gap-x-3">
                                        <N170Icon className={`w-6 h-6 ${partyColorConfig[selectedEvent.party].text}`} />
                                        <span className={`font-bold text-lg ${partyColorConfig[selectedEvent.party].text}`}>{partyFullNames[selectedEvent.party]}</span>
                                    </div>
                                )}
                            </div>

                            {/* Scrollable List */}
                            <div className="relative flex-grow overflow-y-auto p-6">
                                <div className="absolute top-6 bottom-6 left-9 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                {filteredEvents.length > 0 ? filteredEvents.map(event => {
                                    const colors = partyColorConfig[event.party];
                                    const isSelected = selectedEvent?.id === event.id;
                                    const { fullTitle, subTitle } = getEventDisplayDetails(event);
                                    return (
                                        <div key={event.id} className="relative mb-6 group">
                                            <div 
                                                className={`absolute top-3 left-0 flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white dark:ring-gray-800 transition-all duration-300 transform -translate-x-1/2 ml-9 ${isSelected ? colors.dot : 'bg-gray-300 dark:bg-gray-600'} ${gammaMode && isSelected ? 'gamma-target' : ''}`}
                                                style={(gammaMode && isSelected) ? { '--pulse-color': `var(--party-${getPartyVarName(event.party)})` } as React.CSSProperties : undefined}
                                            >
                                                <N170Icon className={`text-xs ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                                            </div>
                                            <div 
                                                onClick={() => handleSelectEvent(event.id)} 
                                                className={`ml-16 p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${gammaMode && !isSelected ? 'gamma-distractor' : ''} ${
                                                    isSelected 
                                                    ? `${colors.border} ${colors.bg} shadow-md` 
                                                    : 'border-transparent bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                                                    {event.party !== 'Análisis' ? new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Contexto'}
                                                </p>
                                                <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-1 text-base">
                                                    {fullTitle}
                                                </h3>
                                                {subTitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subTitle}</p>}
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="text-center py-10 px-4">
                                        <i className="fas fa-stream text-3xl text-gray-400 dark:text-gray-500 mb-2"></i>
                                        <p className="text-gray-500 dark:text-gray-400">No hay eventos que coincidan con los filtros actuales.</p>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* Panel de Detalles */}
                        <section className="w-full lg:w-2/3 xl:w-3/4 flex flex-col">
                            <div key={selectedEvent?.id || 'empty-view'} className="fade-in flex-grow flex flex-col">
                                <DetailsView
                                    event={selectedEvent}
                                    documents={data.documents}
                                    tourStep={tourStep}
                                    tourSize={tourPath.length}
                                    gammaActive={gammaMode}
                                    onNextStep={handleNextStep}
                                    onSelectDocument={setGuidedDoc}
                                    onRestart={handleRestartTour}
                                />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            {guidedDoc && documentGuides[guidedDoc.id] && (
                <DocumentGuideModal
                    doc={guidedDoc}
                    guide={documentGuides[guidedDoc.id]}
                    onClose={() => setGuidedDoc(null)}
                    onConfirm={() => {
                        window.open(guidedDoc.url, '_blank', 'noopener,noreferrer');
                        setGuidedDoc(null);
                    }}
                />
            )}
        </>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App data={caseFileData} />
        </React.StrictMode>
    );
}
