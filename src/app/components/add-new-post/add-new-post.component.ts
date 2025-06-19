import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { PostModel } from '../../../Post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [EditorComponent, FormsModule, CommonModule],
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css']
})
export class AddNewPostComponent {


  imageUrl: File | null = null;
  uploadResult: any;
  isUploading = false;
  isSubmitting = false;
  currentUser: User | null = null;

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  sinplepostPorperties: Omit<PostModel,
    'id' | 'createdAt' | 'updatedAt' | 'userId' | 'userDisplayName'
  > = {
      title: '',
      description: '',
      blogcategory: '',
      image: '',
      blogeditor: ''
    };

  editorConfig = {
    plugins: 'lists link image table code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image'
  };

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  createnNewPost() {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.isSubmitting = true;

    const newPost: PostModel = {
      ...this.sinplepostPorperties,
      id: this.generatePostId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: this.currentUser.uid,
      userDisplayName: this.currentUser.displayName || 'Anonymous'
    };

    this.postService.createPost(newPost).subscribe({
      next: () => {
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        console.error('Error creating post:', err);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private generatePostId(): string {
    return 'post-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.isUploading = true;
      const file = input.files[0];
      
      this.postService.uploadImage(file).subscribe({
        next: (response) => {
          if (response?.data?.url) {
            this.sinplepostPorperties.image = response.data.url;
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        },
        complete: () => {
          this.isUploading = false;
        }
      });
    }
  }
}