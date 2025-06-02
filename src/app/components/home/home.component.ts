import { Component } from '@angular/core';

import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { HeroBannerComponent } from '../../layouts/hero-banner/hero-banner.component';

@Component({
  selector: 'app-home',
  imports: [HeroBannerComponent , SubscriptionFormComponent ,PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
