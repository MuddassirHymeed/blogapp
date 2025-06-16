import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { PostService } from '../../services/post.service';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [PostsComponent , RouterLink],
  providers : [PostService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit{
  constructor() { }

  ngOnInit(): void { }

}
