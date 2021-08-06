import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.formbuilder.group({
    nombre: ['oscar', [Validators.required, Validators.minLength(6)]],
    email: ['tes1@tes1.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formbuilder: FormBuilder) {}

  register() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }
}
