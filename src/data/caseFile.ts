import type { CaseFile } from '../types';

export const caseFileData: CaseFile = {
  documents: [
    {
      id: 'doc-bases-lpn',
      name: 'Bases de la Licitación LPN 22/2024',
      date: '2024-01-01',
      type: 'PDF',
      url: 'https://drive.google.com/file/d/1iy-bppMJG4ERDCQAzq-MzVFoO6elwyxl/view?usp=sharing'
    },
    {
      id: 'doc-contrato-lpn',
      name: 'Contrato LPN22/2024-01',
      date: '2024-01-01',
      type: 'PDF',
      url: 'https://drive.google.com/file/d/11R0qT1hqvmLKFsqLAFXgSRDwE0NL2pFb/view?usp=sharing'
    },
    { 
      id: 'doc-cgj-01', 
      name: 'Oficio CGJ PE/11333/2024', 
      date: '2024-11-05', 
      type: 'Oficio', 
      url: 'https://drive.google.com/file/d/1wvIS1P-eDGe1bDPEOvvbT5mWPHmYCqJ2/view?usp=sharing' 
    },
    { 
      id: 'doc-cgj-02', 
      name: 'Oficio CGJ PE/4676/2025', 
      date: '2025-05-14', 
      type: 'Oficio', 
      url: 'https://drive.google.com/file/d/1Bl5EEWQlyuakYcZLcRx2VOHEgHt9DJyL/view?usp=sharing' 
    },
    {
      id: 'doc-almacen-01',
      name: 'Oficio de Respuesta Almacén',
      date: '2025-05-16',
      type: 'Oficio',
      url: 'https://drive.google.com/file/d/1NF8SJu5c1yf8j11RhsPZPOGJi9QD_SBt/view?usp=sharing'
    },
    { 
      id: 'doc-cgj-03', 
      name: 'Oficio CGJ PE/5204/2025', 
      date: '2025-05-19', 
      type: 'Oficio', 
      url: 'https://drive.google.com/file/d/1R6Bz9MutQMbGMpIIg4Y5kSSbG-BzOnn_/view?usp=sharing' 
    },
    { 
      id: 'doc-almacen-02', 
      name: 'Oficio ALMV/00058/2025', 
      date: '2025-05-22', 
      type: 'Oficio', 
      url: 'https://drive.google.com/file/d/18Vslkd67X_MVHcHNvhZwGGWkGNHmip9i/view?usp=sharing' 
    },
    { 
      id: 'doc-almacen-03', 
      name: 'Oficio ALMV/00061/2025', 
      date: '2025-05-26', 
      type: 'Oficio', 
      url: 'https://drive.google.com/file/d/1Qess65Vsw5ZA4pCrXmQeBAhSCJXFP9NY/view?usp=sharing'
    },
    {
      id: 'doc-conciliacion-inicio',
      name: 'Oficio Inicio de Conciliación',
      date: '2024-11-04',
      type: 'Oficio',
      url: 'https://drive.google.com/file/d/1hxcKax-r7IalHdd91FGVIhntqPWsd1ls/view?usp=sharing'
    }
  ],
  events: [
    {
      id: 'evt-intro-01',
      date: '2024-11-04',
      title: 'INTRODUCCIÓN',
      party: 'Análisis',
      documentIds: ['doc-bases-lpn', 'doc-contrato-lpn'],
      description: [
        { label: '', content: 'Debemos partir el presente análisis de dos premisas concebidas como procesos distintos e independientes uno del otro, y prueba fehaciente de ello es que cada uno tiene su procedimiento que delimita su esfera jurídica y su ámbito de aplicación. Si bien es cierto que esta confusión de procesos pudiera tener sentido debido a que el sujeto y objeto son los mismos, es decir, el mismo proveedor y el mismo contrato son susceptibles de dar inicio a ambos procedimientos, esto no es justificación para pretender ejecutarlos por la misma vía, en atención al principio de especialidad de la ley, al principio de exacta aplicación de la ley, al principio de legalidad, al principio de seguridad jurídica, en el principio prohibitivo de aplicar penas por simple analogía, en el principio de administrar justicia por leyes e instancias previamente establecidas, entre muchos otros más de esta misma jerarquía constitucional, imperativos categóricos que no dan lugar a interpretación contraria alguna.' }
      ],
      followUp: {
        eventId: 'evt-conciliacion-01',
        label: 'Empezar análisis'
      }
    },
    {
      id: 'evt-conciliacion-01',
      date: '2024-11-04',
      title: 'CONCILIACIÓN-CONC. 05/2025',
      party: 'Análisis',
      documentIds: ['doc-conciliacion-inicio'],
      description: []
    },
    {
      id: 'evt-real-01',
      date: '2024-11-05',
      title: 'CGJ-OFICIO 1',
      description: [],
      documentIds: ['doc-cgj-01'],
      party: 'CGJ',
      purchaseOrders: ['10400123', '10400124', '10400125', '10400126', '10400127', '10400128', '10400129', '10400130', '10400131', '10400132', '10401712'],
    },
    {
      id: 'evt-real-03',
      date: '2025-05-14',
      title: 'CGJ-OFICIO 2',
      party: 'CGJ',
      documentIds: ['doc-cgj-02'],
      description: [
        { label: 'Asunto', content: 'Solicitud de información relativa al cumplimiento de las órdenes de compra' },
        { label: '', content: 'Se solicita la información de las siguientes órdenes de compra para efecto de que puedan determinar incumplimientos' },
      ],
      purchaseOrders: ['10400453', '10400492', '10400493', '10400826', '10401014', '10401249', '10401278', '10401700', '10401712', '10402014', '10402297', '10402938', '10403055', '10403136', '10403544', '10403580'],
      followUp: {
        eventId: 'evt-real-02',
        label: 'Ver respuesta del Almacén'
      }
    },
    {
      id: 'evt-real-02',
      date: '2025-05-16',
      title: 'ALMV-RESPUESTA 1',
      description: [
        { label: 'Asunto', content: 'En respuesta del oficio CGJ PE/4676/2025' },
        { label: '', content: 'Se informa la situacion detallada de cada orden de compra solicitada, incluyendo su estatus de entrega, anexando el formato que el Almacén de Víveres diseñó para presentar aún más información de la que se le solicita, para que se tengan la CGJ tenga los elmentos suficientes para emitir su determinación.' },
      ],
      documentIds: ['doc-almacen-01'],
      party: 'Almacén'
    },
    {
      id: 'evt-real-04',
      date: '2025-05-19',
      title: 'CGJ-OFICIO 3',
      party: 'CGJ',
      documentIds: ['doc-cgj-03'],
      description: [
        { label: 'Asunto', content: 'Solicitud de aclaración' },
        { label: '', content: 'Se solicita que rectifique el conteo de días de atraso considerando los criterios establecidos en las bases para el proceso en comento, específicamente el apartado de penalizaciones.' },
        { label: 'Penalización por Atraso en la Entrega', content: '<table><thead><tr><th>DÍAS DE ATRASO (HÁBILES)</th><th>% DE LA SANCIÓN</th></tr></thead><tbody><tr><td>DE 01 HASTA 05</td><td>5%</td></tr><tr><td>DE 06 HASTA 10</td><td>10%</td></tr><tr><td>DE 11 EN ADELANTE</td><td>15%</td></tr></tbody></table>' }
      ],
      followUp: {
        eventId: 'evt-real-05',
        label: 'Ver respuesta del Almacén'
      }
    },
    {
      id: 'evt-real-05',
      date: '2025-05-22',
      title: 'ALMV-RESPUESTA 3',
      party: 'Almacén',
      documentIds: ['doc-almacen-02'],
      description: [
        { label: 'Asunto', content: 'En respuesta a solicitud de aclaración.' },
        { label: '', content: 'Se informa la situación relativa a las órdenes de compra del proveedor Artículos Médicos y Hospitalarios, S.A. de C.V., emitidas durante el proceso de LPN 22/2024.' }
      ]
    },
    {
      id: 'evt-real-06',
      date: '2025-05-26',
      title: 'ALMV-CORRECCIÓN',
      party: 'Almacén',
      documentIds: ['doc-almacen-03'],
      description: [
        { label: 'Asunto', content: 'Alcance y sustitución de soporte documental.' },
        { label: '', content: 'En alcance al oficio CAA ALMV/00058/2025, se sustituye el soporte previamente emitido, anexando la nueva información solicitada referente a la situación de las órdenes de compra del proveedor.' }
      ]
    }
  ]
};