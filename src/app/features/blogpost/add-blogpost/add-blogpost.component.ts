import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { Category } from '../../category/models/category.model';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from 'src/app/shared/components/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  addBlogPostRequest!: AddBlogPostRequest;
  categories$!: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectorSubscription!: Subscription;
  addBlogPostSubscription!: Subscription;

  constructor(private blogPostService: BlogpostService, private router: Router,
    private categoryService: CategoryService, private imageService: ImageService
  ) {
    this.addBlogPostRequest = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      dateCreated: new Date(),
      isVisible: true,
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
      next: (response => {
        this.addBlogPostRequest.featuredImageUrl = response.url;
        this.closeImageSelector();
      })
    })
  }
  onSubmit() {
    console.log(this.addBlogPostRequest);
    this.addBlogPostSubscription= this.blogPostService.AddBlogPost(this.addBlogPostRequest).subscribe({
      next: (response => {
        console.log(response);
        this.router.navigateByUrl('/admin/blogposts');
      })
    })
  }
  openImageSelector() {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }


  
  ngOnDestroy(): void {
    this.imageSelectorSubscription.unsubscribe();
    this.addBlogPostSubscription.unsubscribe();
  }
}
