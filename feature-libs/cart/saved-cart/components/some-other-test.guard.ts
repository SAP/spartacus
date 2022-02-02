import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SomeOtherTestGuard implements CanActivate {
  constructor(protected authService: AuthService) {
    console.log('the other test guard saved cart');
  }

  canActivate(): Observable<boolean | UrlTree> {
    return of(true);
  }
}
