import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';

const routes: Routes = [
  {path: 'viewer/view/:docId', component: DocumentViewerComponent, data: {input: ['docId']}},
  {path: '', redirectTo: 'viewer/view/1', pathMatch: 'full'},
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding())]
};
