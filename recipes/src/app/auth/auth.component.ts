import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthenticationCommand } from './authentication-command.enum';

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

    const action = this.isLogin ?
      AuthenticationCommand.EMAIL_SIGN_IN :
      AuthenticationCommand.EMAIL_SIGN_UP;

    this.onEmailAuthentication(form, action);
    form.reset();
  }

  private onEmailAuthentication(form: NgForm, command: AuthenticationCommand): void {
    const { email, password } = form.value;
    this.authService.emailAuthentication(email, password, command).subscribe(user => {
      console.log(command, ' successful', email);
      this.isLoading = false;
      this.errorMessage = '';
    }, error => {
      this.isLoading = false;
      console.error(command, ' failed', error);
      this.errorMessage = error;
    });
  }
}
