import { Injectable } from '@angular/core';
import { UserDetailsAdapter } from './user-details.adapter';
import { Observable } from 'rxjs';
import { User } from '../../../model/misc.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsConnector {
  constructor(private adapter: UserDetailsAdapter) {}

  load(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }

  update(username: string, user: User): Observable<{}> {
    return this.adapter.update(username, user);
  }
}
