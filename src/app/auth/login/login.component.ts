import { Component, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserLoaderService } from '../../data/user-loader.service';
import { UserModelService } from '../../data/user-model.service';
import { Store } from '@ngrx/store';
import * as fromStore from './../store';
import { getUserAuthState, getDetails } from './../store';
import { getUserToken } from '../store/reducers/user-token.reducer';
import { tap } from 'rxjs/operators';
import { UserToken } from '../models/token-types.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  user;
  private subscription: Subscription;

  constructor(
    protected userModel: UserModelService,
    protected userLoader: UserLoaderService,
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {
    this.subscription = this.store
      .select(fromStore.getDetails)
      .subscribe(details => {
        console.log(details);
        this.user = details;
      });
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.store.select(fromStore.getUserState).subscribe(user => {
      if (
        user.account.details.name !== undefined &&
        user.auth.token.access_token !== undefined
      ) {
        const details = user.account.details;
        const token = user.auth.token;

        this.store.dispatch(new fromStore.ClearUserDetails({ details }));
        this.store.dispatch(new fromStore.ClearUserToken({ token }));
      }
    });
  }

  ngOnDestroy() {}
}
