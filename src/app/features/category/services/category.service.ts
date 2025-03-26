import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  APIBaseURL = environment.apiBaseUrl + 'Category/';

  constructor(private http: HttpClient) {
  }
  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(this.APIBaseURL+'AddCategory', model);
  }
  getCategories(filterQuery?: string, sortBy?: string, sortDirection?: string,
    pageNumber?:number,pageSize?:number): Observable<Category[]> {
    let params = new HttpParams();
    if (filterQuery) {
      params = params.set('filterQuery', filterQuery)
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy)
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection)
    }
    if (pageNumber) {
      params = params.set('pageNumber', pageNumber)
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize)
    }
    console.log(params)
    console.log('Mounika params')
    // return this.http.get<Category[]>(this.APIBaseURL+'GetCategories?filterQuery='+filterQuery);
    return this.http.get<Category[]>(this.APIBaseURL + 'GetCategories', {
      params: params
    });

  }
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.APIBaseURL+'GetCategoryById/' + categoryId);
  }
  updateCategory(categoryId: string, request: AddCategoryRequest): Observable<Category> {
    return this.http.put<Category>(this.APIBaseURL +'UpdateCategoryById/'+ categoryId, request)
  }
  DeleteCategoryById(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(this.APIBaseURL + 'DeleteCategory/' + categoryId);
  }
  getCategoriesCount():Observable<number>{
    return this.http.get<number>(this.APIBaseURL+'Count');
  }
}
