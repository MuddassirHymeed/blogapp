import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { PostService } from '../../services/post.service';



@Component({
  selector: 'app-posts',
  imports: [PostComponent , NgFor],
  providers : [PostService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent implements OnInit{

  Posts : any;
  error : any;

  constructor(private APIService : PostService) {}

 // get post api
  ngOnInit(): void {
    this.APIService.getApi().subscribe(
    (response) => {
      this.Posts = response
      console.log('All Posts => ' , response);
    },
    (throwError) => {
      this.error = throwError
      console.log('error occured' , this.error);
    },
  )
  }

  // delete posts
  OndeletePost(post : any){
    this.APIService.deletePost(post.id).subscribe(() => this.Posts = this.Posts.filter(
      (p : any) => p.id != post.id
      )
    )
    console.log('deleted post id : ',post.id);
  }

 

}
