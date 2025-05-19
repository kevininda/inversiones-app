import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        } else {
          // devuelve un UrlTree para redirigir a /login y bloquear la ruta protegida
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}

