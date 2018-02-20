import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from './../store';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user;

  constructor(
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {}

  ngOnInit() {
    this.store.select(fromStore.getUserState).subscribe(state => {
      this.user = state;
    });
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.store.dispatch(
      new fromStore.ClearUserDetails(this.user.account.details)
    );
    this.store.dispatch(new fromStore.ClearUserToken(this.user.auth.token));
  }
}
