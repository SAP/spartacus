import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, RoutingService } from '@spartacus/core';

import { Subscription, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { CustomFormValidators } from '../../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sub = this.auth
      .getUserToken()
      .pipe(
        switchMap(data => {
          if (data && data.access_token) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            return this.routing.getRedirectUrl().pipe(take(1));
          }
          return of();
        })
      )
      .subscribe(url => {
        if (url) {
          // If forced to login due to AuthGuard, then redirect to intended destination
          this.routing.go([url]);
          this.routing.clearRedirectUrl();
        } else {
          // User manual login
          this.routing.back();
        }
      });

    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.auth.authorize(
      this.form.controls.userId.value,
      this.form.controls.password.value
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
