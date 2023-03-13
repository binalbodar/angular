import { FileService } from './file.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() { }

  title = 'storybook';

  storybook = new FormGroup({
    story: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    shortLink: new FormControl('', [Validators.required]),
  })

  fileUrl: any;
  image: any;
  shortLink: string = '';
  loading: boolean = false;

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

  handleUploadImg(event: any) {
    let files = event.target.files;
    this.loading = !this.loading;
    this.fileService.upload(files).subscribe((item: any) => {
      console.log(item);
      if (typeof item === 'object') {
        this.shortLink = item.link;
        this.loading = false;
      }
    })
  }

  // onUpload() {
  //   if (this.file) {
  //     this.loading = !this.loading;
  //     console.log(this.file);
  //     this.fileUploadService.upload(this.file).subscribe((event: any) => {
  //       if (typeof event === 'object') {
  //         // Short link via api response
  //         this.shortLink = event.link;
  //         this.loading = false; // Flag variable
  //       }
  //     });
  //   }
  // }

  // onChange(story: { target: { storybook: any[]; }; }) {
  //   console.log("Add The Image, Pdf, File, etc.......");
  //   this.story = story.target.storybook[0];
  // }

  // onUpload() {
  //   if (this.story) {
  //     this.loading = !this.loading;
  //     console.log(this.story);
  //     this.fileService.upload(this.story).subscribe((story: any) => {
  //       if (typeof this.story === 'object') {
  //         this.shortLink = story.link;

  //         this.loading = false;
  //       }
  //     });
  //   }
  // }

  // ngOnInit() {
  //   const data = "hgfghfgfg";
  //   const blob = new Blob([data], { type: 'application/octet-stream' });
  //   this.image = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  // }

  edit: any = '';
  toDisplay = true;

  editRow(story: any, index: any) {
    this.edit = index
    this.toDisplay = !this.toDisplay;
    this.storybook.patchValue({
      story: story.story,
      date: story.date,
      shortLink: story.shortLink
    })
  }

  onupdate() {
    let value = this.storybook.value
    this.toDisplay = !this.toDisplay;
    this.story[this.edit] = { story: value.story, date: value.date, shortLink: value.shortLink };
    this.clearForm();
  }

  story: any = []

}
