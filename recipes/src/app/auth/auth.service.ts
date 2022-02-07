import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appId, signUpUrl } from '../config';
import { Observable } from 'rxjs';

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
    });
  }
}
