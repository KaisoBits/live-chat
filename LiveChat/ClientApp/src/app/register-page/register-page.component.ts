import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationResponseModel } from 'src/models/user-registration-response.model';
import { UserRegistrationModel } from 'src/models/user-registration.model';
import { AuthService } from 'src/services/auth.service';


interface RegisterFormModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;

  registering = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _snackbar: MatSnackBar, private _router: Router) {
    this.initializeForm();
  }

  public ngOnInit(): void {}

  public formSubmit(): void {
    if (this.form.valid) {
      this.registering = true;
      this._authService.registerUser(this.createUserModel()).subscribe({
        next: result => {
          if (result.isSuccessful) {
            this._router.navigateByUrl('/chat');
          }
        },
        error: (httpError: { error: UserRegistrationResponseModel }) => {
          this._snackbar.open('Unable to create the user: ', httpError.error.errors?.join('; '), { duration: 5000 });
          this.registering = false;
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  public formClear(): void {
    this.initializeForm();
  }

  private createUserModel(): UserRegistrationModel {
    const values = this.form.getRawValue() as RegisterFormModel;

    return {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    };
  }

  private initializeForm(): void {
    this.form = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
