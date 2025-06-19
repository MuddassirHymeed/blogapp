import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { routingNavigationComponents } from './app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
    routingNavigationComponents
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  showHeaderFooter(): boolean {
    const route = this.router.routerState.snapshot.root.firstChild;
    return !route?.data?.['hideHeaderFooter'];
  }

  ngOnInit() {}
}
