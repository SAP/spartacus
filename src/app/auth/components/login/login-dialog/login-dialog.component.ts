import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
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
export class LoginDialogComponent {
  public username: string;
  public password: string;
  public rememberMe: Boolean;

  private subscription: Subscription;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  onSubmit() {
    const user = {
      name: this.username,
      pass: this.password,
      ref: this.dialogRef
    };
    this.submitted.emit(user);
  }

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private store: Store<fromStore.UserState>
  ) {}

  cancel() {
    this.dialogRef.close();
  }
}
