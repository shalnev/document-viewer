import { Injectable } from '@angular/core';
import { Annotation } from '../../models/annotation.model';

@Injectable({
  providedIn: 'root',
})
export class AnnotationService {
  private annotations: Annotation[] = [];

  addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation);
  }

  getAnnotations(): Annotation[] {
    return this.annotations;
  }

  removeAnnotation(id: string) {
    this.annotations = this.annotations.filter((a) => a.id !== id);
  }

  clearAnnotations() {
    this.annotations = [];
  }
}
