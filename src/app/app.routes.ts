import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeroBannerComponent } from './layouts/hero-banner/hero-banner.component';
import { BlogComponent } from './components/blog/blog.component';


export const routes: Routes = [
    {path : '' , redirectTo : '/home', pathMatch : "full"},
    {path : 'home' , component : HomeComponent},
    {path : 'blog' , component : BlogComponent},
    {path : 'contact' , component : ContactComponent},
    {path : 'about' , component : AboutComponent},
    {path : '**' , component : PageNotFoundComponent}
];

export const routingNavigationComponents = [
    HomeComponent, BlogComponent, AboutComponent,
    ContactComponent,HeroBannerComponent,SubscriptionFormComponent,
    PostCardComponent,PageNotFoundComponent,
]
