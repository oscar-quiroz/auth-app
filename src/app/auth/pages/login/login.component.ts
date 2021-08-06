import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.formbuilder.group({
    email: ['tes1@tes1.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formbuilder: FormBuilder) {}

  login() {
    console.log("ralizar loggin");
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);


  }
}
