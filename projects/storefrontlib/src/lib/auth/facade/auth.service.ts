import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuthStore from '../store';
import * as fromStore from '../../user/store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userToken$ = this.store.pipe(select(fromAuthStore.getUserToken));

  constructor(private store: Store<fromStore.UserState>) {}

  authorize(userId: string, password: string) {
    this.store.dispatch(
      new fromAuthStore.LoadUserToken({
        userId: userId,
        password: password
      })
    );
  }

  login() {
    this.store.dispatch(new fromAuthStore.Login());
  }

  logout() {
    this.store.dispatch(new fromAuthStore.Logout());
  }
}
