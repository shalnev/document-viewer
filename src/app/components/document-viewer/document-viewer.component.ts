import { Component, ElementRef, Input, numberAttribute, signal, viewChild, Renderer2 } from '@angular/core';
import * as fabric from 'fabric';
import { DocumentItem } from '../../models/document.model';
import { DocumentService } from '../../services/document/document.service';
import { DocumentToolbarComponent } from "../document-toolbar/document-toolbar.component";
import { afterRender } from '@angular/core';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  imports: [DocumentToolbarComponent]
})
export class DocumentViewerComponent {
  canvasContainerRef = viewChild.required<ElementRef>('canvasContainer');

  fabricCanvases: fabric.Canvas[] = [];
  document = signal<DocumentItem | null>(null);
  @Input({required: true, transform: numberAttribute}) docId!: number;
  private zoomLevel: number = 1;

  constructor(
    private documentService: DocumentService,
    private renderer: Renderer2 // Inject Renderer2
  ) {
    afterRender(() => {
      this.loadDocument(this.docId);
    });
  }

  loadDocument(docId: number) {
    this.documentService.getDocument(docId).pipe(
      tap((doc) => this.document.set(doc)),
      switchMap(() => this.renderPages())
    ).subscribe();
  }

  async renderPages() {
    if (!this.document()) return;

    this.fabricCanvases.forEach(canvas => canvas.dispose());
    this.fabricCanvases = [];

    const container = this.canvasContainerRef().nativeElement;
    container.innerHTML = '';

    for (const page of this.document()!.pages) {
      try {
        const pageContainer = this.renderer.createElement('div');
        this.renderer.addClass(pageContainer, 'page-container');

        const canvasElement = this.renderer.createElement('canvas');
        this.renderer.appendChild(pageContainer, canvasElement);
        this.renderer.appendChild(container, pageContainer);

        const fabricCanvas = new fabric.Canvas(canvasElement, {
          selection: false,
        });

        const fabricImg = await fabric.Image.fromURL(
          `assets/mocks/${page.imageUrl}`,
          { crossOrigin: 'anonymous' },
          {}
        );

        fabricImg.set({
          top: 0,
          left: 0,
          selectable: false,
        });

        fabricCanvas.add(fabricImg);
        fabricCanvas.setDimensions({
          width: (fabricImg.width ?? 800) * this.zoomLevel,
          height: (fabricImg.height ?? 800) * this.zoomLevel,
        });

        fabricCanvas.setZoom(this.zoomLevel);

        this.fabricCanvases.push(fabricCanvas);
      } catch (error) {
        console.error(`Error loading image ${page.imageUrl}:`, error);
      }
    }
  }

  onZoomChange(zoom: number) {
    this.zoomLevel = zoom;
    this.fabricCanvases.forEach((canvas, index) => {
      const center = new fabric.Point(canvas.width! / 2, canvas.height! / 2);
      canvas.zoomToPoint(center, this.zoomLevel);
      canvas.renderAll();
    });
  }
}
