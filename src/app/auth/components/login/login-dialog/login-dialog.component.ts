import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from './../../../store';
import { UserToken } from './../../../models/token-types.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnDestroy {
  public username: string;
  public password: string;
  public rememberMe: Boolean;

  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private store: Store<fromStore.UserState>
  ) {}

  login() {
    this.subscription = this.store
      .select(fromStore.getUserToken)
      .subscribe((token: UserToken) => {
        if (token.access_token === undefined) {
          this.store.dispatch(
            new fromStore.LoadUserToken({
              username: this.username,
              password: this.password
            })
          );
        } else {
          this.dialogRef.close();
          this.store.dispatch(new fromStore.LoadUserDetails(this.username));
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
