import { HttpResponse } from '@angular/common/http';
import { FileService } from './file.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'storybook';

  storybook = new FormGroup({
    story: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  format: undefined;
  url: undefined;
  fileToUpload: any;
  imageUrl: any;
  currentFile: any | File;
  imgsrc: string | undefined;
  file: any;
  files: any;
  selectedFiles: any | FileList;
  msg: {} | null | undefined;
  item: null | undefined;

  constructor(private fileService: FileService) { }

  deleteRow(item: any) {
    this.story.splice(item, 1);
  }

  onSubmit() {
    let value = this.storybook.value
    this.story.push(value);
    this.clearForm();
  }

  clearForm() {
    this.storybook.reset();
  };

  selectFile(story: { target: { files: any; }; }) {
    this.story = story.target.files;
  }

  upload() {
    debugger
    this.storybook = this.selectedFiles.item(0);
    this.fileService.uploadFile(this.currentFile).subscribe(response => {
      this.story.value = '';
      if (response instanceof HttpResponse) {
        this.msg = response.body;
        console.log(response.body);
      }
    });
  }

  edit: any = '';
  toDisplay = true;

  editRow(story: any, index: any) {
    this.edit = index
    this.toDisplay = !this.toDisplay;
    this.storybook.patchValue({
      story: story.story,
      date: story.date,
      image: story.image
    })
  }

  onupdate() {
    let value = this.storybook.value
    this.toDisplay = !this.toDisplay;
    this.story[this.edit] = { story: value.story, date: value.date, image: value.image };
    this.clearForm();
  }

  story: any = []

}



  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);

  //   //Show image preview
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  // onChange(story: { target: { files: (string | undefined)[]; }; }) {
  //   this.files = story.target.files[0];
  // }

  // open(story: { srcElement: { files: any[]; }; }) {
  //   const file = story.srcElement.files[0];
  //   this.imgsrc = window.URL.createObjectURL(file);
  // }