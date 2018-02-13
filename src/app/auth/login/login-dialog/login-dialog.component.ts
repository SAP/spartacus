import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserLoaderService } from '../../../data/user-loader.service';

// TODO: [SPA-276] - remove
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { tap } from 'rxjs/operators';
import { UserToken } from './../../models/token-types.model';

@Component({
  selector: 'y-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  public username: string;
  public password: string;
  public rememberMe: Boolean;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    protected userLoader: UserLoaderService,
    // TODO: [SPA-276] - remove
    private store: Store<fromStore.TokensState>
  ) {
    this.username = 'tobiasouwejan@gmail.com';
    this.password = '1234';

    // TODO: [SPA-276] - remove
    this.store
      .select(fromStore.getUserToken)
      .pipe(
        tap((token: UserToken) => {
          if (Object.keys(token).length === 0) {
            this.store.dispatch(
              new fromStore.LoadUserToken({
                username: this.username,
                password: this.password
              })
            );
          }
        })
      )
      .subscribe(console.log);
  }

  login() {
    this.userLoader.login(this.username, this.password).subscribe(tokenData => {
      if (tokenData.access_token) {
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
