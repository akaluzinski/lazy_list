import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { key, signInUrl, signUpUrl } from '../config';
import { Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageEnum } from './error-message.enum';
import { AuthenticationCommand } from './authentication-command.enum';

export interface User {
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

  constructor(private readonly http: HttpClient) { }

  emailAuthentication(email: string, password: string, command: AuthenticationCommand): Observable<User> {
    this.validateKey();

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


  private fetchAuthenticationRequest(email: string, password: string, url: string): Observable<User> {
    return this.http.post<User>(url, {
      email,
      password,
      returnSecureToken: true
    }, {
      params: {
        key
      }
    }).pipe(this.handleError);
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

  private validateKey(): void {
    if (key.length === 0) {
      throw Error('Provide api key');
    }
  }
}
