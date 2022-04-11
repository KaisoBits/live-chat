import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationResponseModel } from '../../models/user-registration-response.model';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {
    this.initializeForm();
  }

  public ngOnInit(): void {}

  public formSubmit(): void {
    if (this.form.valid) {
      this.registering = true;
      this._authService.registerUser(this.createUserModel()).subscribe({
        next: (result) => {
          if (result.isSuccessful) {
            this._router.navigateByUrl('/chat');
          }
        },
        error: (httpError: { error: UserRegistrationResponseModel }) => {
          this._snackbar.open(
            'Unable to create the user: ' +
            httpError.error.errors[0] ?? "Unknown reason",
            undefined,
            { duration: 5000 }
          );
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

  public getError(controlName?: string): string {
    let control: AbstractControl;
    if (controlName === undefined) {
      control = this.form;
    } else {
      control = this.form.get(controlName)!;
      if (!control)
        throw new Error(`Control named '${controlName}' does not exist.`);
    }

    if (!control.errors)
      return '';

    if (control.hasError('passwordsDontMatch')) {
      return 'Values must match';
    }

    if (control.hasError('dontmatch')) {
      return 'Passwords must match';
    }

    if (control.hasError('required'))
    {
      return 'This field is required';
    }

    if (control.hasError('minlength'))
    {
      const err = control.getError('minlength');
      return `This field requires at least ${err.requiredLength} characters`;
    }

    if (control.hasError('pattern'))
    {
      return 'The password must contain lowercase and uppercase characters, a number and at least one special character';
    }

    return 'Invalid value';
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
    this.form = this._fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(".*[a-z].*"), Validators.pattern(".*[0-9].*"), Validators.pattern(".*\W.*"), this.changeTriggersValidationOf('repeatPassword')]],
        repeatPassword: ['', [Validators.required, this.mustMatchValidator('password')]],
      }
    );
  }

  // TODO: Move these 2 to another file
  private changeTriggersValidationOf(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      control.root?.get(otherControlName)?.updateValueAndValidity();

      return null;
    }
  }
  private mustMatchValidator(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const otherControl = control.root?.get(otherControlName);
      if (!otherControl)
        return null;

      if (otherControl.pristine || control.pristine) {
        return null;
      }

      return otherControl.value === control.value
      ? null
      : { dontmatch: true };
    }
  }
}
