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

  upload(file: any): Observable<any> {
    const storybook = new FormData();
    Array.from(file).forEach((f:any)=> storybook.append('file',f))
    return this.http.post(this.baseApiUrl, storybook);
  }
}