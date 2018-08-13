import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import * as fromGlobalMessage from '../../../../global-message/store';
import { GlobalMessageType } from '../../../../global-message/models/message.model';

@Component({
  selector: 'y-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  userTokenSubscription: Subscription;
  form: FormGroup;

  constructor(
    private store: Store<fromStore.UserState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userTokenSubscription = this.store
      .select(fromStore.getUserToken)
      .subscribe(data => {
        if (data && data.access_token) {
          this.store.dispatch(
            new fromGlobalMessage.AddMessage({
              text: 'Logged In Successfully',
              type: GlobalMessageType.MSG_TYPE_CONFIRMATION
            })
          );
          const returnUrl = this.route.snapshot.queryParams['returnUrl'];
          if (returnUrl) {
            // If forced to login due to AuthGuard, then redirect to intended destination
            this.store.dispatch(new fromRouting.Go({ path: [returnUrl] }));
          } else {
            // User manual login
            this.store.dispatch(new fromRouting.Back());
          }
        }
      });

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

  ngOnDestroy() {
    if (this.userTokenSubscription) {
      this.userTokenSubscription.unsubscribe();
    }
  }
}
