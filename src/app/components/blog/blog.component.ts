import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';


@Component({
  selector: 'app-blog',
  imports: [PostCardComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
