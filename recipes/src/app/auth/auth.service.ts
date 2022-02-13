import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { key, signInUrl, signUpUrl } from '../config';
import { BehaviorSubject, Observable, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorMessageEnum } from './error-message.enum';
import { AuthenticationCommand } from './authentication-command.enum';
import { User } from './user.model';

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

  user = new BehaviorSubject<User>(null);

  constructor(private readonly http: HttpClient) { }

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
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }, {
      params: {
        key
      }
    }).pipe(
      this.handleError,
      tap(userData => this.handleEmailAuthentication(userData.idToken, userData.email, userData.idToken, +userData.expiresIn))
    );
  }

  private handleEmailAuthentication(idToken: string, email: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    this.user.next(new User(idToken, email, token, expirationDate));
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
