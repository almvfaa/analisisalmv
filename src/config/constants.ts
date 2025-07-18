import type { Document, Party } from '../types/types';

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
    'evt-real-01': "La oficina legal le pregunta formalmente al almacén: 'Oye, necesito que me digas qué pasó exactamente con estas órdenes de compra.'",
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

export const tourPath = ['evt-intro-01', 'evt-real-01', 'evt-real-03', 'evt-real-02', 'evt-real-04', 'evt-real-05'];

export const tourDescriptions: Record<string, string> = {
    'evt-intro-01': "Empecemos por el principio. Este es el contexto general que da origen a la controversia.",
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
        category: 'Marco Jurídico Específico del Hospital Civil',
        icon: 'fa-hospital-user',
        items: [
            { name: 'Ley Orgánica del OPD Hospital Civil de Guadalajara', articles: ['1, 2, 3, 4', '5', '7', '8', '12', '17', '23'] },
            { name: 'Estatuto Orgánico del OPD Hospital Civil de Guadalajara', articles: ['Definición de atribuciones de Direcciones y Subdirecciones'] },
            { name: 'Reglamento de Adquisiciones, Arrendamientos y Servicios del HCG', articles: ['Análisis completo requerido'] },
        ]
    },
    {
        category: 'Normativa Federal',
        icon: 'fa-landmark',
        items: [
            { name: 'Constitución Política de los Estados Unidos Mexicanos', articles: ['1', '4', '134'] },
            { name: 'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público (LAASSP)', articles: ['1', '17', '18', '22', '25', '26', '26 Bis', '28', '29', '30-32', '33-35', '36-38', '40-47', '50', '56-A'] },
            { name: 'Reglamento de la LAASSP', articles: ['29-31', '35', '39', '41-48', '50-57'] },
            { name: 'Ley General de Salud', articles: ['3 IV', '17', '194 I', '197-198', '210', '212', '215', '368-393', '404 X, XII', '414-420'] },
            { name: 'Ley General de Responsabilidades Administrativas', articles: ['7', '21', '25', '49-52', '54', '57-61', '65-70', '73'] },
            { name: 'Código Civil Federal (Supletorio)', articles: ['1792-1859', '1910', '2104-2118'] },
        ]
    },
    {
        category: 'Normativa Estatal (Jalisco)',
        icon: 'fa-map-marked-alt',
        items: [
            { name: 'Ley de Compras Gubernamentales, Enajenaciones y Contratación de Servicios', articles: ['1, 4, 13, 16', '20-27', '47-64', '73-74', '98-99', '104-111'] },
            { name: 'Reglamento de la Ley de Compras Gubernamentales', articles: ['1, 10, 11', '23, 32', '44-46', '56-59'] },
            { name: 'Ley de Salud del Estado de Jalisco', articles: ['1-3', '248', '253', '256'] },
            { name: 'Ley del Procedimiento Administrativo del Estado de Jalisco', articles: ['1, 2, 11-16', '63-66', '115-121'] },
            { name: 'Ley de Justicia Administrativa del Estado de Jalisco', articles: ['1-4', '9-10', '29-30', '35-36', '71-72', '76'] },
        ]
    },
    {
        category: 'Normas Oficiales Mexicanas (NOMs)',
        icon: 'fa-certificate',
        items: [
            { name: 'NOM-131-SSA1-2012 (Fórmulas Lácteas)', articles: ['5-10'] },
            { name: 'NOM-251-SSA1-2009 (Prácticas de Higiene)', articles: ['5-8'] },
            { name: 'NOM-051-SCFI/SSA1-2010 (Etiquetado General)', articles: ['4-5'] },
        ]
    },
    {
        category: 'Marco Transversal y Supletorio',
        icon: 'fa-cogs',
        items: [
            { name: 'Ley General de los Derechos de Niñas, Niños y Adolescentes', articles: ['2, 6, 13 X', '43, 50 I, IV'] },
            { name: 'Ley de Transparencia y Acceso a la Información (Jalisco)', articles: ['8 V', '23-24'] },
            { name: 'Código Penal Federal', articles: ['212, 214, 215', '221, 222, 222 Bis'] },
            { name: 'Ley General de Archivos', articles: ['1, 4, 6, 11-12, 21'] },
        ]
    }
];
