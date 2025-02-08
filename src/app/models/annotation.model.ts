export interface Annotation {
  id: string;
  type: AnnotationType
  left: number;
  top: number;
  content?: string;
  imageUrl?: string;
}

export enum AnnotationType {
  TEXT = 'text',
  IMAGE = 'image',
}
