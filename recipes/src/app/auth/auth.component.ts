import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
      console.error('signUp failed', error);
      this.errorMessage = error;
    });
  }
}
