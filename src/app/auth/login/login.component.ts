import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserLoaderService } from '../../data/user-loader.service';
import { UserModelService } from '../../data/user-model.service';
import { Store } from '@ngrx/store';
import * as fromStore from './../store';
import { getUserAuthState, getDetails } from './../store';
import { getUserToken } from '../store/reducers/user-token.reducer';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user;

  constructor(
    protected userModel: UserModelService,
    protected userLoader: UserLoaderService,
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {
    this.store
      .select(fromStore.getDetails)
      .subscribe(
        details =>
          (this.user = Object.keys(details).length === 0 ? null : details)
      );
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    // this.userLoader.logout();
    this.store.select(fromStore.getDetails).subscribe(details => {
      if (
        Object.keys(details).length === 0 ||
        details === null ||
        details === undefined
      )
        this.store.dispatch(new fromStore.ClearUserDetails({ details }));
    });

    this.store.select(fromStore.getUserToken).subscribe(token => {
      if (
        Object.keys(token).length === 0 ||
        token === null ||
        token === undefined
      )
        this.store.dispatch(new fromStore.ClearUserToken({ token }));
    });
  }
}
