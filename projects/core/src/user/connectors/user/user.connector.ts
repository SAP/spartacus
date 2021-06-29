import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../../../model/misc.model';
import { UserAdapter } from './user.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserConnector {
  constructor(protected adapter: UserAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  register(user: UserSignUp): Observable<User> {
    return this.adapter.register(user);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  registerGuest(guid: string, password: string): Observable<User> {
    return this.adapter.registerGuest(guid, password);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  getTitles(): Observable<Title[]> {
    return this.adapter.loadTitles();
  }
}
