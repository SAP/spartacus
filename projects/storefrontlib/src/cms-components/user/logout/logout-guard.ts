import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  static GUARD_NAME = 'LogoutGuard';

  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    this.logout();
    return of(false);
  }

  protected logout(): void {
    this.auth.logout();
  }
}
