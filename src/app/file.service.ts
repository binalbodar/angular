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

  constructor(private http: HttpClient) { }

  upload(file: any): Observable<any> {
    const storybook = new FormData();
  
    storybook.append('story', file, file.name);

    return this.http.post(this.baseApiUrl, storybook);
  }
}

// function User(this: any) {
//   this.FormData = 'Blob';
//   this.append = 'Blob';
// }