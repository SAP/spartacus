import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@spartacus/user/account/root';
import { UserAccountAdapter } from './user-account.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAccountConnector {
  constructor(protected adapter: UserAccountAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }
}
