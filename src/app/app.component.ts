import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    template: `
        <router-outlet/>`,
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
