import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  login(credentials: { username: string; password: string }): Observable<any> {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return of({ token: 'fake-jwt-token' }).pipe(
        delay(500), // simula delay de servidor
        tap(() => {
          localStorage.setItem('token', 'fake-jwt-token');
          this.loggedIn.next(true);
        })
      );
    } else {
      return throwError(() => new Error('Usuario o contraseña incorrectos')).pipe(delay(500));
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

