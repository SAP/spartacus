import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import * as fromStore from '../../../store';
import * as fromAuthStore from './../../../../auth/store';
import * as fromRouting from '../../../../routing/store';
import * as fromGlobalMessage from '../../../../global-message/store';
import { GlobalMessageType } from '../../../../global-message/models/message.model';

@Component({
  selector: 'y-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;

  constructor(
    private store: Store<fromStore.UserState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sub = this.store
      .select(fromAuthStore.getUserToken)
      .pipe(
        switchMap(data => {
          if (data && data.access_token) {
            this.store.dispatch(
              new fromGlobalMessage.AddMessage({
                text: 'Logged In Successfully',
                type: GlobalMessageType.MSG_TYPE_CONFIRMATION
              })
            );
            return this.store.select(fromRouting.getRedirectUrl).pipe(take(1));
          }
          return of();
        })
      )
      .subscribe(url => {
        if (url) {
          // If forced to login due to AuthGuard, then redirect to intended destination
          this.store.dispatch(new fromRouting.Go({ path: [url] }));
          this.store.dispatch(new fromRouting.ClearRedirectUrl());
        } else {
          // User manual login
          this.store.dispatch(new fromRouting.Back());
        }
      });

    this.form = this.fb.group({
      userId: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.store.dispatch(
      new fromAuthStore.LoadUserToken({
        userId: this.form.controls.userId.value,
        password: this.form.controls.password.value
      })
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
