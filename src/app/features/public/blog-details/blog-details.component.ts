import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blogpost/models/BlogPost.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
  url:string | null =null;
  blogPost$!:Observable<BlogPost>;
  constructor(private route:ActivatedRoute, private blogPostService:BlogpostService){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(response=>{
        this.url= response.get('url');
        
      })
    })
    if(this.url){
      this.blogPost$= this.blogPostService.getBlogPostByUrlHandle(this.url);

      // .subscribe({
      //   next:(response=>{

      //   })
      // })
    }
  }

}
