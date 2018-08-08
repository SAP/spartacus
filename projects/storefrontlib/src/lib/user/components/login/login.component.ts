import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';
import * as fromRouting from '../../../routing/store';
import * as fromGlobalMessage from '../../../global-message/store';
import { GlobalMessageType } from './../../../global-message/models/message.model';
@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  userTokenSubscription: Subscription;
  form: FormGroup;

  constructor(
    private store: Store<fromStore.UserState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userTokenSubscription = this.store
      .select(fromStore.getUserToken)
      .pipe(
        tap(data => {
          if (data.access_token) {
            this.store.dispatch(
              new fromGlobalMessage.AddMessage({
                text: 'Logged In Successfully',
                type: GlobalMessageType.MSG_TYPE_CONFIRMATION
              })
            );
            this.store.dispatch(
              new fromRouting.Go({
                path: ['/']
              })
            );
          }
        })
      )
      .subscribe();

    this.form = this.fb.group({
      userId: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.store.dispatch(
      new fromStore.LoadUserToken({
        userId: this.form.controls.userId.value,
        password: this.form.controls.password.value
      })
    );
  }

  goToRegister() {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/register']
      })
    );
  }

  ngOnDestroy() {
    if (this.userTokenSubscription) {
      this.userTokenSubscription.unsubscribe();
    }
  }
}
