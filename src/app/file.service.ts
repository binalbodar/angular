import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  story: any | undefined;

  baseApiUrl = 'https://file.io';
  User: any;
  append: string | undefined;
  fileService: any;
  bypassSecurityTrustResourceUrl: any;

  constructor(private http: HttpClient) { }

  // Blob!: {
  //   User: any;
  //   new(blobParts?: BlobPart[] | undefined, options?: BlobPropertyBag | undefined): Blob;
  //   prototype: Blob;
  // };

  upload(file: any): Observable<any> {
    // debugger
    const storybook = new FormData();

    storybook.append('story', file, file.name);

    return this.http.post(this.baseApiUrl, storybook);
  }
}

function User(this: any) {
  this.FormData = 'Blob';
  this.append = 'Blob';
}