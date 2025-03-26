import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  requestModel: AddCategoryRequest = {
    name: '',
    urlHandle: ''
  };
  private addCategorySubscription!: Subscription;
  constructor(private categoryService: CategoryService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addCategory() {
    this.addCategorySubscription = this.categoryService.addCategory(this.requestModel).subscribe({
      next: (response => {
        this.router.navigateByUrl('/admin/categories');
      })
    })
  }
  backToCategories(){
    this.router.navigateByUrl('/admin/categories');
  }
  ngOnDestroy(): void {
    this.addCategorySubscription.unsubscribe();
  }
}
