import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class OrganizationMessageService {
  protected notification$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    console.log('construct OrganizationMessageService');
  }
  setNotification(message) {
    this.notification$.next(message);
  }

  getNotification(): Observable<string> {
    return this.notification$.pipe(filter((msg) => msg !== ''));
  }
}
