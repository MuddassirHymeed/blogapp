import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { PostService } from '../../services/post.service';
import { PostModel } from '../../../Post';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [EditorComponent, FormsModule, NgIf],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  post: any;
  selectedFile: File | null = null;
  selectedFilePreview: string | ArrayBuffer | null = null;
  isUploading = false;

  EditPostPorperties: PostModel = {
    id: '',
    title: '',
    description: '',
    blogcategory: '',
    image: '',
    blogeditor: ''
  };

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
  };

  constructor(
    private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parameters) => {
      this.postService.getPostID(parameters['id']).subscribe({
        next: (retrivedPost) => {
          this.EditPostPorperties = {
            id: retrivedPost.id,
            title: retrivedPost.title,
            description: retrivedPost.description,
            blogcategory: retrivedPost.blogcategory,
            image: retrivedPost.image,
            blogeditor: retrivedPost.blogeditor
          };
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFilePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  OnUpdatePost() {
    if (this.selectedFile) {
      this.uploadImageAndUpdatePost();
    } else {
      this.updatePost();
    }
  }

  private uploadImageAndUpdatePost(): void {
    this.isUploading = true;
    
    this.postService.uploadImage(this.selectedFile!).subscribe({
      next: (response: any) => {
        this.EditPostPorperties.image = response.data.url;
        this.updatePost();
        
        // Reset file input and preview after successful upload
        this.resetFileInput();
      },
      error: (error) => {
        console.error('Image upload failed:', error);
        this.isUploading = false;
      }
    });
  }

  private updatePost(): void {
    const updatedPost: PostModel = {
      id: this.EditPostPorperties.id,
      title: this.EditPostPorperties.title,
      description: this.EditPostPorperties.description,
      blogcategory: this.EditPostPorperties.blogcategory,
      image: this.EditPostPorperties.image,
      blogeditor: this.EditPostPorperties.blogeditor,

    };

    this.postService.editPost(updatedPost).subscribe({
      next: () => {
        this.router.navigate(['/blog']);
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
    this.fileInput.nativeElement.value = '';
  }
}