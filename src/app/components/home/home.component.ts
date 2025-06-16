import { Component, OnInit } from '@angular/core';
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component';
import { HeroBannerComponent } from '../../layouts/hero-banner/hero-banner.component';
import { PostsComponent } from '../posts/posts.component';
@Component({
  selector: 'app-home',
  imports: [ HeroBannerComponent ,
            SubscriptionFormComponent ,
            PostsComponent , 
            SubscriptionFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
  }

}
