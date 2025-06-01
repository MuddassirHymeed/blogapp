import { Component } from '@angular/core';
import { BgBannerComponent } from '../../layouts/bg-banner/bg-banner.component';
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component';

@Component({
  selector: 'app-home',
  imports: [BgBannerComponent , SubscriptionFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
