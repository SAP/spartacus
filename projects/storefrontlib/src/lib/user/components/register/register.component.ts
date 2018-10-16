import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import * as fromUserStore from '../../store';
import { CustomFormValidators } from '../../../ui/validators/custom-form-validators';
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '../../../routing/facade/routing.service';

@Component({
  selector: 'y-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<any>;
  sub: Subscription;
  userRegistrationForm: FormGroup = this.fb.group(
    {
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator]
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue]
    },
    { validator: this.matchPassword }
  );

  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private store: Store<fromUserStore.UserState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titles$ = this.store.pipe(
      select(fromUserStore.getAllTitles),
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromUserStore.LoadTitles());
        }
      })
    );
    this.sub = this.auth.userToken$
      .pipe(
        switchMap(data => {
          if (data && data.access_token) {
            return this.routing.redirectUrl$.pipe(take(1));
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
  }

  submit() {
    this.store.dispatch(
      new fromUserStore.RegisterUser({
        firstName: this.userRegistrationForm.value.firstName,
        lastName: this.userRegistrationForm.value.lastName,
        password: this.userRegistrationForm.value.password,
        titleCode: this.userRegistrationForm.value.titleCode,
        uid: this.userRegistrationForm.value.email
      })
    );
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
