import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appId, signUpUrl } from '../config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageEnum } from './error-message.enum';

export interface User {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  signUp(email: string, password: string): Observable<User> {
    if (appId.length === 0) {
      throw Error('Provide api key');
    }

    return this.http.post<User>(`${signUpUrl}${appId}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(error => {
      const errorMessage = error?.error?.error?.message;
      if (errorMessage) {
        return throwError(Object.keys(ErrorMessageEnum).includes(errorMessage)
          ? ErrorMessageEnum[errorMessage] :
          `Unknown error: ${errorMessage}`);
      }
      return throwError(error);
    }));
  }
}
