import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.formbuilder.group({
    name: ['oscar', [Validators.required, Validators.minLength(6)]],
    email: ['tes1@tes1.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formbuilder: FormBuilder, private router: Router, private authService:AuthService) {}

  register() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);


    const { name, email, password } = this.miFormulario.value;
    this.authService.register(name, email, password).subscribe((res) => {
      console.log(res);
      if (res === true) {
        this.router.navigateByUrl('/dash');
      } else {
        Swal.fire({
          title: 'error',
          text:res,
          icon:'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    });
  }
}
