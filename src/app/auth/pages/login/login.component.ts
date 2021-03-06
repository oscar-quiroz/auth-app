import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.formbuilder.group({
    email: ['Test2@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.log('ralizar loggin');
    console.log(this.miFormulario.value);
    //  console.log(this.miFormulario.valid);

    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).subscribe((res) => {
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
