import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from '../models/BlogPost.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.model';
import { ImageService } from 'src/app/shared/components/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id!: string | null;
  routeSubscription!: Subscription;
  getBlogPostByIdSubscription!: Subscription;
  blogPost!: BlogPost;
  categories$!: Observable<Category[]>;
  selectedCategories!: string[];
  updateBlogPostRequest!:UpdateBlogPostRequest;
  updateBlogPostSubscription!:Subscription;
  isImageSelectorVisible:boolean=false;
  imageSelectSubscription!:Subscription;
  constructor(private route: ActivatedRoute, private blogPostService: BlogpostService,
    private categoryService: CategoryService, private router:Router,
  private blogImageService:ImageService)
  {
    this.updateBlogPostRequest={
      title:'',
      shortDescription:'',
      content:'',
      featuredImageUrl:'',
      urlHandle:'',
      author:'',
      dateCreated:new Date(),
      isVisible:true,
      categories:this.selectedCategories
    }
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (response => {
        this.id = response.get('id');
      })
    })
    if (this.id) {
      this.getBlogPostByIdSubscription = this.blogPostService.GetBlogPostById(this.id).subscribe({
        next: (response => {
          this.blogPost = response;
          console.log(this.blogPost)
          this.selectedCategories = response.categories.map(x => x.id);
        })
      })
    }
    this.imageSelectSubscription= this.blogImageService.onSelectImage().subscribe({
      next:(response=>{
        if(this.blogPost){
          this.blogPost.featuredImageUrl=response.url;
          this.isImageSelectorVisible=false;
        }
      })
    })
    this.categories$ = this.categoryService.getCategories();
  }
  onBlogPostUpdate() {
    if (this.id && this.blogPost) {
      var updateBlogPost: UpdateBlogPostRequest={
        title:this.blogPost.title,
        shortDescription:this.blogPost.shortDescription,
        content:this.blogPost.content,
        featuredImageUrl:this.blogPost.featuredImageUrl,
        urlHandle:this.blogPost.urlHandle,
        author:this.blogPost.author,
        dateCreated:this.blogPost.dateCreated,
        isVisible:this.blogPost.isVisible,
        categories:this.selectedCategories??[]
      }
      this.updateBlogPostSubscription= this.blogPostService.UpdateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }

  }
  openImageSelector(){
    this.isImageSelectorVisible=true;
  }
  closeImageSelector(){
    this.isImageSelectorVisible=false;
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.getBlogPostByIdSubscription.unsubscribe();
    this.updateBlogPostSubscription.unsubscribe();
    this.imageSelectSubscription.unsubscribe();
  }
}
