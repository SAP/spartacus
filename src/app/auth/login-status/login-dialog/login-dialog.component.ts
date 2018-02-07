import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserLoaderService } from 'app/data/user-loader.service';

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
    protected userLoader: UserLoaderService
  ) {
    this.username = 'tobiasouwejan@gmail.com';
    this.password = '1234';
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
