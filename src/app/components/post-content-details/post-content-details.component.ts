import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostModel } from '../../../Post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-content-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './post-content-details.component.html',
  styleUrl: './post-content-details.component.css'
})
export class PostContentDetailsComponent implements OnInit {
  sanitizedContent: SafeHtml | null = null;
  post: PostModel | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
  const postId = this.route.snapshot.paramMap.get('id');
  
  if (!postId) {
    this.error = 'Post ID not found in URL';
    this.isLoading = false;
    this.post = null;
    return;
  }

  this.isLoading = true;
  this.error = null;

  this.postService.getPostID(postId).subscribe({
    next: (post) => {
      if (!post) {
        this.error = 'Post not found';
        this.post = null;
      } else {
        this.post = post;
        this.sanitizedContent = post.blogeditor 
          ? this.sanitizer.bypassSecurityTrustHtml(post.blogeditor)
          : null;
      }
      this.isLoading = false;
    },
    error: (err) => {
      this.error = err.status === 404 
        ? 'Post not found' 
        : 'Failed to load post. Please try again later.';
      this.post = null;
      this.isLoading = false;
    }
  });
}
}