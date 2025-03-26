import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("title", title);
    // Correct URL interpolation
    return this.http.post<BlogImage>(
      `${this.apiBaseUrl}Images?fileName=${fileName}&title=${title}`,
      formData
    );

    //  return this.http.post<BlogImage>($'{this.apiBaseUrl}Images?fileName={fileName}&title={file}', formData);
  }
  getImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(this.apiBaseUrl + 'Images');
  }
  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }
  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
