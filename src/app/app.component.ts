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

  title = 'storybook';

  storybook = new FormGroup({
    story: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  fileUrl: any;
  imageUrl: any;

  // constructor(private fileService: FileService) { }

  constructor(private sanitizer: DomSanitizer) { }

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

  ngOnInit() {
    const data = this.story.image;
    const blob = new Blob([data], { type: this.story.image });
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
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
