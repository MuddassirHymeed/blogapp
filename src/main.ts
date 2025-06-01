import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then((bootstrapApplicationData) => console.log(bootstrapApplicationData))
  .catch((err) => console.error(err))
