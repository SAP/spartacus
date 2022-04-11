import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgRegistrationGuard implements CanActivate {
  constructor() {}

  canActivate(): Observable<boolean> {
    return of(true);
  }
}
