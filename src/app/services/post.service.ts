import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PostModel } from '../../Post';


@Injectable({
  providedIn: 'root'
})

export class PostService {

  private api_url: string = 'http://localhost:3000/posts'
  private readonly imgbb_API_KEY: string = 'c3b6ed006ceb2788eea9b6ff28b2452a'
  private imgBB_url: string = 'https://api.imgbb.com/1/upload';

  constructor(private http: HttpClient) { }

  // get posts
  getApi(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.api_url).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  // get posts error handler
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  // get post id for edit posts
  getPostID(id: string): Observable<PostModel> {
    const url = `${this.api_url}/${id}`
    return this.http.get<PostModel>(url)
  }

  // create post
  createPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.api_url, post);
  }

  // delete post 
  deletePost(id: string): Observable<PostModel> {
    const url = `${this.api_url}/${id}`
    return this.http.delete<PostModel>(url)
  }


  // edit post
  editPost(post: PostModel): Observable<PostModel> {
    const posturl = `${this.api_url}/${post.id}`
    return this.http.put<PostModel>(posturl, post)
  }

  // upload image url post
  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);

    const params = {
      key: this.imgbb_API_KEY,
    };
    return this.http.post(this.imgBB_url, formData, { params });
  }

}
