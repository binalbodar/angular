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
    task: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })
  url: undefined;
  format: undefined;
  imgsrc: string | undefined;
  file:undefined;
  files:undefined;

  onSubmit() {
    let value = this.storybook.value
    this.story.push(value);
    this.clearForm();
  }

  clearForm() {
    this.storybook.reset();
  };

  open(e: { srcElement: { files: any; }; }){
    const file = e.srcElement.files[0]; 
    this.imgsrc = window.URL.createObjectURL(file);
  }

  story: any = []
  
}
