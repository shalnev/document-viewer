import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: 'app-document-toolbar',
  templateUrl: './document-toolbar.component.html',
  styleUrl: './document-toolbar.component.scss',
})
export class DocumentToolbarComponent {
  @Input() fabricCanvases!: fabric.Canvas[];
  @Output() zoomChange = new EventEmitter<number>();
  private zoomLevel: number = 1;



  zoomIn(): void {
    this.zoomLevel *= 1.1;
    this.zoomChange.emit(this.zoomLevel);
  }


  zoomOut(): void {
    this.zoomLevel /= 1.1;
    this.zoomChange.emit(this.zoomLevel);
  }


  addTextAnnotation(): void {
    const textbox = new fabric.Textbox('New Text', {
      left: 100,
      top: 100,
      width: 150,
      fontSize: 16,
      fill: 'black',
      backgroundColor: 'yellow',
      editable: true,
    });

    this.fabricCanvases[0].add(textbox);
  }

  addImageAnnotation(imageUrl: string): void {
    fabric.util.loadImage(imageUrl, {crossOrigin: 'anonymous'}).then((img) => {
      if (!img) return;

      const fabricImg = new fabric.FabricImage(img, {
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });

      this.fabricCanvases[0].add(fabricImg); // Добавляем изображение на первый канвас
    }).catch((error) => {
      console.error(`Error loading image: ${imageUrl}`, error);
    });
  }

  removeSelectedAnnotation(): void {
    this.fabricCanvases.forEach((canvas) => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
      }
    });
  }

  saveAnnotations(): void {
    const annotations = this.fabricCanvases.map((canvas) => canvas.toJSON());
    console.log('Saved annotations:', annotations);
  }
}
