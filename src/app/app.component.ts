import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';
  loginForm= new FormGroup(
    {
      email : new FormControl(''),
      password: new FormControl('')
    }
  )
  loginUser(){
    console.warn(this.loginForm.value)
  }
}
