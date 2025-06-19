import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { PostService } from '../../services/post.service';
import { PostModel } from '../../../Post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [EditorComponent, FormsModule, CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  EditPostPorperties: PostModel = {
    id: '',
    title: '',
    description: '',
    blogcategory: '',
    image: '',
    blogeditor: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '',
    userDisplayName: ''
  };

  selectedFile: File | null = null;
  selectedFilePreview: string | null = null;
  isUploading = false;
  isLoading = true;
  currentUser: User | null = null;

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  editorConfig = {
    plugins: 'lists link image table code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image'
  };

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    this.route.params.subscribe((params) => {
      this.loadPost(params['id']);
    });
  }

  private loadPost(postId: string): void {
    this.isLoading = true;
    this.postService.getPostID(postId).subscribe({
      next: (retrievedPost) => {
        this.EditPostPorperties = {
          ...retrievedPost,
          updatedAt: new Date()
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        this.router.navigate(['/blog']);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  OnUpdatePost(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.selectedFile) {
      this.uploadImageAndUpdatePost();
    } else {
      this.updatePost();
    }
  }

  private uploadImageAndUpdatePost(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.postService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        if (response?.data?.url) {
          this.EditPostPorperties.image = response.data.url;
          this.updatePost();
        } else {
          throw new Error('Invalid image URL received');
        }
      },
      error: (error) => {
        console.error('Image upload failed:', error);
        this.isUploading = false;
      },
      complete: () => {
        this.resetFileInput();
      }
    });
  }

  private updatePost(): void {
    if (!this.currentUser) return;

    const updatedPost: PostModel = {
      ...this.EditPostPorperties,
      updatedAt: new Date(),
      userId: this.currentUser.uid,
      userDisplayName: this.currentUser.displayName || this.EditPostPorperties.userDisplayName || 'Anonymous'
    };

    this.postService.editPost(updatedPost).subscribe({
      next: () => {
        this.router.navigate(['/blog', updatedPost.id]);
      },
      error: (error) => {
        console.error('Post update failed:', error);
        this.isUploading = false;
      }
    });
  }

  private resetFileInput(): void {
    this.selectedFile = null;
    this.selectedFilePreview = null;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}