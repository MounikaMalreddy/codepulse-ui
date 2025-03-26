import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/BlogPost.model';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  apiBaseurl = environment.apiBaseUrl + 'BlogPost/';
  constructor(private http: HttpClient) { }

  AddBlogPost(request: AddBlogPostRequest): Observable<void> {
    return this.http.post<void>(this.apiBaseurl, request);
  }
  GetAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiBaseurl);
  }
  GetBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(this.apiBaseurl + id);
  }
  UpdateBlogPost(id: string, request: UpdateBlogPostRequest): Observable<BlogPost> {
    return this.http.put<BlogPost>(this.apiBaseurl + id, request);
  }
  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(this.apiBaseurl + id);
  }
  getBlogPostByUrlHandle(urlHandle:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(this.apiBaseurl+'GetBlogPostByUrlHandle/'+urlHandle);
  }
}
