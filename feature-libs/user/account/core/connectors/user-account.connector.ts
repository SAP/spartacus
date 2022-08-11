import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@spartacus/user/account/root';
import { UserAccountAdapter } from './user-account.adapter';

@Injectable()
export class UserAccountConnector {
  constructor(protected adapter: UserAccountAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }
}
