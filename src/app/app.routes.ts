import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostContentDetailsComponent } from './components/post-content-details/post-content-details.component';


export const routes: Routes = [
    {
        path : '' , redirectTo : '/home' , pathMatch : 'full'
    },
    {
        path : '' , component : HomeComponent
    },
    {
        path : 'home' , component : HomeComponent
    },
    {
        path : 'blog' , component : BlogComponent
    },
    {
        path : 'blog/create', component : AddNewPostComponent
    },
    {
        path : 'blog/:id' , component : PostContentDetailsComponent
    },
    {
        path : 'blog/edit/:id' , component : EditPostComponent
    },
    {
        path : 'contact' , component : ContactComponent
    },
    {
        path : 'about' , component : AboutComponent
    },
    {
        path : '**' , component : PageNotFoundComponent
    },
];

export const routingNavigationComponents = [
    HomeComponent, BlogComponent, AboutComponent,
    ContactComponent, PageNotFoundComponent ,
    AddNewPostComponent,EditPostComponent,PostContentDetailsComponent
]
