import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { ErrorMessageEnum } from "./error-message.enum";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLogin = true;
  isLoading = false;
  errorMessage = '';

  constructor(private readonly authService: AuthService) {
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    if (this.isLogin) {
      // todo
    } else {
      this.onSignUp(form);
    }
    form.reset();
  }

  private onSignUp(form: NgForm): void {
    const { email, password } = form.value;
    this.authService.signUp(email, password).subscribe(user => {
      console.log('signUp successful', email);
      this.isLoading = false;
      this.errorMessage = '';
    }, error => {
      this.isLoading = false;
      const msg  = this.parseErrorMessage(error);
      console.error('signUp failed', msg);
      this.errorMessage = msg;
    });
  }

  private parseErrorMessage(error: any): string {
    const errorMessage = error?.error?.error?.message;
    if (errorMessage) {
      return Object.keys(ErrorMessageEnum).includes(errorMessage)
        ? ErrorMessageEnum[errorMessage] :
        `Unknown error: ${errorMessage}`;
    }
    return error;
  }
}
