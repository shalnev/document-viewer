import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentItem } from '../../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  getDocument(id: number): Observable<DocumentItem> {
    return this.http.get<DocumentItem>(`/assets/mocks/${id}.json`);
  }
}
