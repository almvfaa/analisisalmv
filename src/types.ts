export type Party = 'Almacén' | 'Proveedor' | 'CGJ' | 'Análisis';

export interface Document {
  id: string;
  name: string;
  date: string;
  type: 'PDF' | 'Imagen' | 'Oficio' | 'Acta';
  url: string; // Placeholder for the document link/content
}

export interface TimelineEvent {
  id:string;
  date: string;
  title: string;
  description: { 
    label: string; 
    content: string;
  }[];
  documentIds: string[];
  party: Party;
  purchaseOrders?: string[];
  followUp?: {
      eventId: string;
      label: string;
  };
}

export interface CaseFile {
  documents: Document[];
  events: TimelineEvent[];
}