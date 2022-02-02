import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestGuard implements CanActivate {
  constructor(protected authService: AuthService) {
    console.log('in saved cart');
  }

  canActivate(): Observable<boolean | UrlTree> {
    return of(true);
  }
}
