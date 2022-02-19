import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { key, signInUrl, signUpUrl } from '../config';
import { BehaviorSubject, Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorMessageEnum } from './error-message.enum';
import { AuthenticationCommand } from './authentication-command.enum';
import { User } from './user.model';
import { Router } from '@angular/router';

const localStorageUserDataKey = 'recipeUser';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationHandler: any;

  user = new BehaviorSubject<User>(null);

  constructor(private readonly http: HttpClient,
              private readonly router: Router) { }

  static validateAPIKey(): void {
    if (key.length === 0) {
      throw Error('Provide api key');
    }
  }

  emailAuthentication(email: string, password: string, command: AuthenticationCommand): Observable<AuthResponse> {
    AuthService.validateAPIKey();

    let url = '';
    switch (command) {
      case AuthenticationCommand.EMAIL_SIGN_UP:
        url = signUpUrl;
        break;
      case AuthenticationCommand.EMAIL_SIGN_IN:
        url = signInUrl;
        break;
    }

    return this.fetchAuthenticationRequest(email, password, url);
  }

  private fetchAuthenticationRequest(email: string, password: string, url: string): Observable<AuthResponse> {
    const requestKey = atob(key);
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }, {
      params: {
        key: requestKey
      }
    }).pipe(
      this.handleError,
      tap(userData => this.handleEmailAuthentication(userData.idToken, userData.email, userData.idToken, +userData.expiresIn))
    );
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem(localStorageUserDataKey);
    this.clearAutoLogoutHandler();
    this.router.navigate(['/auth']);
  }

  private setAutoLogout(expirationDuration: number): void {
    this.tokenExpirationHandler = setTimeout(() => {
      console.log(`Auto logout after ${expirationDuration}.`);
      this.logout();
    }, expirationDuration);
  }

  private clearAutoLogoutHandler(): void {
    if (this.tokenExpirationHandler) {
      clearTimeout(this.tokenExpirationHandler);
    }
    this.tokenExpirationHandler = null;
  }

  private handleEmailAuthentication(idToken: string, email: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(idToken, email, token, expirationDate);
    this.user.next(user);
    this.setAutoLogout(expiresIn * 1000);
    localStorage.setItem(localStorageUserDataKey, JSON.stringify(user));
  }

  restoreUser(): void {
    const user: {
      id: string,
      email: string,
      authToken: string,
      authTokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem(localStorageUserDataKey));
    if (!user) {
      return;
    }
    const restoredUser = new User(user.id, user.email, user.authToken, new Date(user.authTokenExpirationDate));
    if (restoredUser.token) {
      this.user.next(restoredUser);
      const duration = new Date(user.authTokenExpirationDate).getTime() - new Date().getTime();
      this.setAutoLogout(duration);
    }
  }

  private get handleError(): OperatorFunction<never, never> {
    return catchError(error => {
      const errorMessage = error?.error?.error?.message;
      if (errorMessage) {
        return throwError(Object.keys(ErrorMessageEnum).includes(errorMessage)
          ? ErrorMessageEnum[errorMessage] :
          `Unknown error: ${errorMessage}`);
      }
      return throwError(error);
    });
  }
}
