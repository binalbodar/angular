import { FileService } from './file.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

  title = 'storybook';

  storybook = new FormGroup({
    story: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  file: any;
  files: any;
  msg: {} | null | undefined;
  value: undefined;
  shortLink: string = '';
  loading: boolean | undefined;

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

  onChange(story: { target: { story: any[]; }; }) {
    console.log("Add The Image, Pdf, File, etc.......");
    this.story = story.target.story[0];
  }

  onUpload() {
    if (this.story) {
      this.loading = !this.loading;
      console.log(this.story);
      this.fileService.upload(this.story).subscribe((story: any) => {
        if (typeof story === 'object') {
          this.shortLink = story.link;
          this.loading = false;
        }
      });
    }
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
