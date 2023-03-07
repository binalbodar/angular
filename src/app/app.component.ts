import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'storybook';
  format: undefined;
  url: undefined;

  storybook = new FormGroup({
    task: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  constructor(public _d: DomSanitizer) { }

  imgsrc: string | undefined;
  file: undefined;
  // files: undefined;

  onSubmit() {
    let value = this.storybook.value
    this.story.push(value);
    this.clearForm();
  }

  clearForm() {
    this.storybook.reset();
  };

  open(story: { srcElement: { story: any; }; }) {
    const file = story.srcElement.story[0];
    this.imgsrc = window.URL.createObjectURL(file);
  }

  story: any = []

}
