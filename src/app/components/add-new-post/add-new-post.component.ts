import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { PostModel } from '../../../Post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-new-post',
  imports: [
    EditorComponent,
    FormsModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './add-new-post.component.html',
  styleUrl: './add-new-post.component.css'
})

export class AddNewPostComponent implements OnInit {

  imageUrl: File | null = null
  uploadResult: any;

  sinplepostPorperties: PostModel = {
    id: '',
    title: '',
    description: '',
    blogcategory: '',
    image: '',
    blogeditor: ''
  }


  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
  };

  constructor(private postService: PostService, private route: Router) { }

  ngOnInit(): void { }

  // create new a post
  createnNewPost() {
    const newPost: PostModel = {
      id: this.sinplepostPorperties.id,
      title: this.sinplepostPorperties.title,
      description: this.sinplepostPorperties.description,
      blogcategory: this.sinplepostPorperties.blogcategory,
      image: this.sinplepostPorperties.image,
      blogeditor: this.sinplepostPorperties.blogeditor
    }
    this.postService.createPost(newPost).subscribe(() => this.route.navigate(['/blog']))
  }

  // image file selected 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.postService.uploadImage(file).subscribe(
        (response) => {
          this.sinplepostPorperties.image = response.data.url;
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

}
