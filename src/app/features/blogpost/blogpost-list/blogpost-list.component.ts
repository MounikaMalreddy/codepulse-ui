import { Component, OnInit } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { BlogpostService } from '../services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/BlogPost.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPosts$!: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogpostService) {
  }
  ngOnInit(): void {
    this.getAllBlogPosts();
  }
  getAllBlogPosts() {
    this.blogPosts$ = this.blogPostService.GetAllBlogPosts();
  }
  DeleteBlogPost(id: string) {
    this.blogPostService.deleteBlogPost(id).subscribe({
      next: (response => {
        this.getAllBlogPosts();

      })
    })
  }
}
