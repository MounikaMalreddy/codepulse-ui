import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private router: Router
  ) { }

  id!: string | null;
  category!: Category;
  getCategoryByIdSubscription!: Subscription;
  activatedRouteSubscription!: Subscription;
  updateCategorySubscription!:Subscription;
  updateCategoryRequest!: AddCategoryRequest;
  ngOnInit(): void {
    this.activatedRouteSubscription = this.route.paramMap.subscribe({
      next: (response => {
        this.id = response.get('id');
      })
    })
    if (this.id) {
      this.getCategoryByIdSubscription = this.categoryService.getCategoryById(this.id).subscribe({
        next: (response => {
          this.category = response;
        })
      })
    }
    
  }

  backToCategory() {
    this.router.navigateByUrl('admin/categories');
  }
  updateCategory() {
    this.updateCategoryRequest = {
      name: this.category.name,
      urlHandle: this.category.urlHandle
    };
    if (this.id) {
      this.updateCategorySubscription=this.categoryService.updateCategory(this.id, this.updateCategoryRequest).subscribe({
        next: (response => {
          console.log(response);
          this.router.navigateByUrl('admin/categories');
        })
      })
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    this.getCategoryByIdSubscription.unsubscribe();
    this.updateCategorySubscription.unsubscribe();
  }
}
