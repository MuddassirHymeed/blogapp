import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-post',
  imports: [CommonModule ,RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit {

  @Input() displayPost : any;
  @Output() OnDeleteBlogPost : EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
  ngOnInit(): void {
    
  }

  deleteblogPost(){
    this.OnDeleteBlogPost.emit(this.displayPost)
    console.log('delete post => ' , this.displayPost);
  }

}
