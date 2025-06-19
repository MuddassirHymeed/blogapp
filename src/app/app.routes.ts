import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostContentDetailsComponent } from './components/post-content-details/post-content-details.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { hideHeaderFooter: true } },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'blog/create', component: AddNewPostComponent, canActivate: [authGuard] },
  { path: 'blog/edit/:id', component: EditPostComponent, canActivate: [authGuard] },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: PostContentDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const routingNavigationComponents = [
  HomeComponent,
  BlogComponent,
  AboutComponent,
  ContactComponent,
  PageNotFoundComponent,
  AddNewPostComponent,
  EditPostComponent,
  PostContentDetailsComponent,
  LoginComponent,
  DashboardComponent
]
