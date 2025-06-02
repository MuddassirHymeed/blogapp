import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layouts/footer/footer.component';
import { routingNavigationComponents } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,HeaderComponent,CommonModule,
    FooterComponent,RouterModule,
    routingNavigationComponents,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
