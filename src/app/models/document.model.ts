export interface DocumentPage {
  number: number;
  imageUrl: string;
}

export interface DocumentItem {
  name: string;
  pages: DocumentPage[];
}
