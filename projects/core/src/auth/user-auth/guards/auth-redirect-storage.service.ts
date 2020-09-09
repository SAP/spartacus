import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectStorageService {
  constructor() {}

  private redirectUrl$ = new BehaviorSubject<string>(undefined);

  getRedirectUrl(): Observable<string> {
    return this.redirectUrl$.asObservable();
  }

  setRedirectUrl(redirectUrl: string): void {
    this.redirectUrl$.next(redirectUrl);
  }
}
