import type { Document, Party } from '../types';

// --- CONFIGURACIÓN Y UTILIDADES ---

export const getFileIcon = (type: Document['type']) => {
  const icons: Record<Document['type'], string> = { 'PDF': 'fa-file-pdf', 'Imagen': 'fa-file-image', 'Oficio': 'fa-file-alt', 'Acta': 'fa-file-contract' };
  return icons[type] || 'fa-file';
};

export const getPartyVarName = (party: Party): string => {
    switch(party) {
        case 'Almacén': return 'almacen';
        case 'Análisis': return 'analisis';
        case 'CGJ': return 'cgj';
        case 'Proveedor': return 'proveedor';
    }
};

export const partyColorConfig: Record<Party, { dot: string; text: string; border: string; bg: string; accent:string }> = {
    'CGJ': { dot: 'bg-[var(--party-cgj)]', text: 'text-[var(--party-cgj)]', border: 'border-[var(--party-cgj)]', bg: 'bg-[var(--party-cgj)]/10', accent: 'accent-[var(--party-cgj)]' },
    'Almacén': { dot: 'bg-[var(--party-almacen)]', text: 'text-[var(--party-almacen)]', border: 'border-[var(--party-almacen)]', bg: 'bg-[var(--party-almacen)]/10', accent: 'accent-[var(--party-almacen)]' },
    'Análisis': { dot: 'bg-[var(--party-analisis)]', text: 'text-[var(--party-analisis)]', border: 'border-[var(--party-analisis)]', bg: 'bg-[var(--party-analisis)]/10', accent: 'accent-[var(--party-analisis)]' },
    'Proveedor': { dot: 'bg-[var(--party-proveedor)]', text: 'text-[var(--party-proveedor)]', border: 'border-[var(--party-proveedor)]', bg: 'bg-[var(--party-proveedor)]/10', accent: 'accent-[var(--party-proveedor)]' }
};

export const partyFullNames: Record<Party, string> = {
    'Análisis': 'Contexto General',
    'CGJ': 'COORDINACIÓN GENERAL JURÍDICA',
    'Almacén': 'ALMACÉN DE VÍVERES',
    'Proveedor': 'PROVEEDOR'
};

export const getEventDisplayDetails = (event: { party: Party, title: string }) => {
    const fullTitle = partyFullNames[event.party];
    const titleParts = event.title.split('-');
    const subTitle = titleParts.length > 1 ? `${titleParts[1].charAt(0).toUpperCase() + titleParts[1].slice(1).toLowerCase()} ${titleParts[2] || ''}`.trim() : '';
    return { fullTitle, subTitle };
};

export const simpleExplanations: Record<string, string> = {
    'evt-intro-01': "La <strong>Coordinación General Jurídica</strong> señala al <strong>Almacén de Víveres</strong> como el área responsable de que el procedimiento de conciliación, con número de expediente CONC.05/2024, se encuentre detenido y sin resolución debido a que la información presentada sobre la situación de las órdenes de compra es insuficiente, discordante y en algunos casos nula.",
    'evt-conciliacion-01': "El procedimiento de conciliación se origina por el rechazo físico al proveedor de 4 facturas que intentaba tramitar su pago por la Coordinación General de Finanzas, relativas exclusivamente a la orden de compra 10403580",
    'evt-real-01': "La confusión antes mencionada no fue ni es impedimento para que el Almacen de Viveres proporcione la información con oportunidad, veamos desde cuando se tiene información relativa a las ordenes de compra en cuestión",
    'evt-real-03': "Como pasó el tiempo y no se resolvió, la oficina legal insiste y vuelve a pedir la información sobre un nuevo grupo de órdenes.",
    'evt-real-02': "El almacén contesta la segunda solicitud con un informe detallado para aclarar la situación de cada orden.",
    'evt-real-04': "La oficina legal revisa la respuesta pero no está de acuerdo con cómo se calcularon los retrasos y pide que lo corrijan.",
    'evt-real-05': "Finalmente, el almacén entrega su último informe respondiendo a la solicitud de aclaración sobre las penalizaciones."
};

export const documentGuides: Record<string, { description: string; points: string[] }> = {
    'doc-cgj-01': {
        description: "Este es el primer oficio donde la oficina legal pide cuentas.",
        points: ["La lista de las 11 órdenes de compra solicitadas.", "El plazo de '2 días hábiles' que se da para responder."]
    },
    'doc-cgj-02': {
        description: "Meses después, la oficina legal vuelve a solicitar información sobre un nuevo grupo de órdenes.",
        points: ["La nueva lista de 16 órdenes de compra.", "La fecha, para notar el tiempo que pasó desde la primera solicitud."]
    },
    'doc-almacen-01': {
        description: "El almacén responde adjuntando un formato que ellos mismos diseñaron para dar más detalles.",
        points: ["El formato de tabla que usa el Almacén.", "El estatus reportado para cada orden de compra."]
    },
    'doc-cgj-03': {
        description: "La oficina legal no queda satisfecha y pide una aclaración muy específica.",
        points: ["La mención explícita al 'apartado de penalizaciones'.", "La tabla con los porcentajes de sanción por días de atraso."]
    },
    'doc-almacen-02': {
        description: "Esta es la respuesta final del almacén a la solicitud de aclaración.",
        points: ["La fecha, que muestra la rapidez de la respuesta.", "La argumentación del almacén sobre cómo se debe interpretar el proceso."]
    }
};

export const tourPath = ['evt-intro-01', 'evt-conciliacion-01', 'evt-real-01', 'evt-real-03', 'evt-real-02', 'evt-real-04', 'evt-real-05'];

export const tourDescriptions: Record<string, string> = {
    'evt-intro-01': "El Almacén de Víveres estima que la Coordinación General Jurídica está realizando una superposición indebida del proceso de penalización por atraso en la entrega, dentro del contexto de una conciliación.",
    'evt-conciliacion-01': "El procedimiento de conciliación se origina por el rechazo físico al proveedor de 4 facturas que intentaba tramitar su pago por la Coordinación General de Finanzas, relativas exclusivamente a la orden de compra 10403580",
    'evt-real-01': "La Coordinación Jurídica (CGJ) inicia el proceso con una primera solicitud de información.",
    'evt-real-03': "Meses después, la CGJ envía una segunda solicitud, indicando que el problema persiste.",
    'evt-real-02': "El Almacén responde a la segunda solicitud, adjuntando un informe detallado. Revísalo y continúa.",
    'evt-real-04': "La CGJ no queda conforme y solicita una aclaración específica sobre el cálculo de penalizaciones.",
    'evt-real-05': "Finalmente, el Almacén emite su respuesta final a la solicitud de aclaración. Has llegado al final de la línea de tiempo."
};

export const KEY_OCS = {
    CONCILIACION: '10403580',
    PENALIZACIONES: ['10401712', '10403544'],
};

export const legalFramework = [
    {
        category: 'Normativa Orgánica Propia del Hospital Civil',
        icon: 'fa-hospital-user',
        items: [
            { name: 'Ley Orgánica del Organismo Público Descentralizado Hospital Civil de Guadalajara' },
            { name: 'Estatuto Orgánico del Organismo Público Descentralizado Hospital Civil de Guadalajara' },
            { name: 'Reglamento de Adquisiciones, Arrendamientos y Contratación de Servicios del Hospital Civil de Guadalajara' },
            { name: 'Manual de Organización y Procedimientos del Hospital Civil de Guadalajara' },
            { name: 'Código de Conducta de los Servidores Públicos del HCG' }
        ]
    },
    {
        category: 'Leyes y Reglamentos de Contrataciones Públicas',
        icon: 'fa-gavel',
        items: [
            { name: 'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público (Federal)' },
            { name: 'Reglamento de la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público' },
            { name: 'Ley de Compras Gubernamentales, Enajenaciones y Contratación de Servicios del Estado de Jalisco' },
            { name: 'Reglamento de la Ley de Compras Gubernamentales de Jalisco' }
        ]
    },
    {
        category: 'Marco Sanitario y de Calidad',
        icon: 'fa-heart-pulse',
        items: [
            { name: 'Ley General de Salud' },
            { name: 'Ley de Salud del Estado de Jalisco' },
            { name: 'Reglamento de Control Sanitario de Productos y Servicios' },
            { name: 'Ley de Infraestructura de la Calidad (Base para NOMs)' },
            { name: 'NOM-131-SSA1-2012: Fórmulas Lácteas' },
            { name: 'NOM-251-SSA1-2009: Prácticas de Higiene' },
            { name: 'NOM-051-SCFI/SSA1-2010: Etiquetado General' }
        ]
    },
    {
        category: 'Responsabilidades y Transparencia',
        icon: 'fa-eye',
        items: [
            { name: 'Ley General de Responsabilidades Administrativas' },
            { name: 'Ley de Transparencia y Acceso a la Información Pública de Jalisco' },
            { name: 'Código Penal Federal (Delitos por Hechos de Corrupción)' }
        ]
    },
    {
        category: 'Normativa Administrativa y Supletoria',
        icon: 'fa-file-signature',
        items: [
            { name: 'Código Civil Federal (Supletorio a la LAASSP)' },
            { name: 'Código Civil del Estado de Jalisco (Supletorio a la Ley de Compras estatal)' },
            { name: 'Ley del Procedimiento Administrativo del Estado de Jalisco' },
            { name: 'Ley de Justicia Administrativa del Estado de Jalisco' }
        ]
    },
    {
        category: 'Normativa Presupuestal y Hacendaria',
        icon: 'fa-hand-holding-dollar',
        items: [
            { name: 'Constitución Política de los Estados Unidos Mexicanos (Artículo 134)' },
            { name: 'Ley Federal de Presupuesto y Responsabilidad Hacendaria' },
            { name: 'Ley del Presupuesto, Contabilidad y Gasto Público de Jalisco' },
            { name: 'Código Fiscal de la Federación' }
        ]
    }
];
