import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
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
