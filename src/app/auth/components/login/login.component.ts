import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<any>;

  constructor(
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getDetails);
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.store.dispatch(new fromStore.Logout());
  }
}
