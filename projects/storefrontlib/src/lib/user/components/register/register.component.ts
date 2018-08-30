import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import * as fromAuthStore from '../../../auth/store';
import * as fromRouting from '../../../routing/store';
import * as fromUserStore from '../../store';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validatePassword]],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue]
    },
    { validator: this.matchPassword }
  );

  constructor(
    private store: Store<fromUserStore.UserState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titles$ = this.store.select(fromUserStore.getAllTitles).pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromUserStore.LoadTitles());
        }
      })
    );

    this.sub = this.store
      .select(fromAuthStore.getUserToken)
      .pipe(
        switchMap(data => {
          if (data && data.access_token) {
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
  private validatePassword(fc: FormControl) {
    const password = fc.value as string;
    return password.match(
      '^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_+{};:.,]).{6,}$'
    )
      ? null
      : { InvalidPassword: true };
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
