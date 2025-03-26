import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$!: Observable<BlogImage[]>;
  @ViewChild('form', {static:false}) imageUploadForm!:NgForm;
  constructor(private blogImageService: ImageService) {

  }
  ngOnInit(): void {
    this.getImages();
  }
  private getImages() {
    this.images$ = this.blogImageService.getImages();
  }
  onFileUploadChange(event: Event) {
    var element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  uploadImage() {
    if (this.file && this.fileName != '' && this.title != '') {
      this.blogImageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (response => {
          this.imageUploadForm.reset();
          this.getImages();

        })
      })
    }
  }
  selectImage(image:BlogImage){
    this.blogImageService.selectImage(image);
  }
}
