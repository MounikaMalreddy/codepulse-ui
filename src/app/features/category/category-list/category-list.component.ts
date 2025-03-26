import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<Category[]>;
  category!: Category;
  totalCount!:number;
  list:number[]=[];
  pageNumber:number=1;
  pageSize:number=5;

  constructor(private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.categoryService.getCategoriesCount().subscribe({
      next:(response=>{
        this.totalCount=response;
        this.list=new Array(Math.ceil(response/this.pageSize));
        console.log(this.list)
      })
    })
    this.categories$ = this.categoryService.getCategories(undefined,undefined,undefined,this.pageNumber,this.pageSize);

  }
  getAllCategories() {
    this.categories$ = this.categoryService.getCategories();
  }
  getCategoryById(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response => {
        this.category = response;
        console.log(response);
      })
    })
  }
  DeleteCategory(categoryId: string) {
    this.categoryService.DeleteCategoryById(categoryId).subscribe({
      next: (response => {
        this.getAllCategories();
      })
    })
  }
  onSearch(searchQuery: string) {
    this.categories$ = this.categoryService.getCategories(searchQuery);
  }
  sort(sortBy: string, sortDirection: string) {
    this.categories$ = this.categoryService.getCategories(undefined, sortBy, sortDirection);
  }
  getPage(pageNumb:number){
    this.pageNumber=pageNumb;
    this.categories$ = this.categoryService.getCategories(undefined,undefined,undefined,
      this.pageNumber,this.pageSize);

  }
  getNextPage(){
    if(this.pageNumber+1>this.list.length){
      return;
    }
    this.pageNumber +=1;
    this.categories$ = this.categoryService.getCategories(undefined,undefined,undefined,
      this.pageNumber,this.pageSize);
  }
  getPrevPage(){
    if(this.pageNumber-1<1){
      return;
    }
    this.pageNumber -=1;
    this.categories$ = this.categoryService.getCategories(undefined,undefined,undefined,
      this.pageNumber,this.pageSize);
  }
}
