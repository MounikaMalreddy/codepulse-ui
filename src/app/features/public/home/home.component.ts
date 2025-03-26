import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blogpost/models/BlogPost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  blogPosts$!:Observable<BlogPost[]>;
  constructor(private blogPostService:BlogpostService){

  }
  ngOnInit(): void {
    this.blogPosts$= this.blogPostService.GetAllBlogPosts();
  }
}
