import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthenticationCommand } from './authentication-command.enum';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { ErrorFrameComponent } from '../shared/error-frame/error-frame.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLogin = true;
  isLoading = false;

  @ViewChild(PlaceholderDirective, { static: false })
  errorPlaceholder: PlaceholderDirective;

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly componentFactoryResolver: ComponentFactoryResolver) {
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
      this.router.navigate(['/recipes']);
    }, error => {
      this.isLoading = false;
      this.showError(error);
    });
  }

  private showError(error: string): void {
    const errorFrameFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorFrameComponent);
    const errorFrameInstance = this.errorPlaceholder.viewContainerRef.createComponent(errorFrameFactory);
    errorFrameInstance.instance.errorMessage = error;
  }
}
