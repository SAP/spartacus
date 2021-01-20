import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserAdapter } from './user.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserConnector {
  constructor(protected adapter: UserAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }
}
