import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserLoaderService } from './../../data/user-loader.service';
import { UserModelService } from './../../data/user-model.service';

@Component({
  selector: 'y-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent {
  user;

  constructor(
    protected userModel: UserModelService,
    protected userLoader: UserLoaderService,
    protected dialog: MatDialog
  ) {
    this.userModel.getUser().subscribe(userData => {
      this.user = userData;
    });
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.userLoader.logout();
  }
}
