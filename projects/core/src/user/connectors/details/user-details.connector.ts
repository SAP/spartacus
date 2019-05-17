import { Injectable } from '@angular/core';
import { UserDetailsAdapter } from './user-details.adapter';
import { Observable } from 'rxjs';
import { User } from '../../../model/misc.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsConnector {
  constructor(protected adapter: UserDetailsAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }

  update(username: string, user: User): Observable<{}> {
    return this.adapter.update(username, user);
  }
}
