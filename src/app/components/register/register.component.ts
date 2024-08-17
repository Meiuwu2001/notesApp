import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formReg!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.formReg.valid) {
      this.authService.register(this.formReg.value)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login']);
        })
        .catch(error => console.log(error));
    } else {
      console.log('Formulario no válido');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
