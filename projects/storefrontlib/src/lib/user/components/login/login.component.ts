import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';
import * as fromRouting from '../../../routing/store';

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
              new fromRouting.Go({
                path: ['/']
              })
            );
          }
        })
      )
      .subscribe();

    this.form = this.fb.group({
      userId: [''],
      password: ['']
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
