import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromUserStore from '../../store';
import * as fromRouting from '../../../routing/store';
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

    this.sub = this.store.select(fromUserStore.getUserToken).subscribe(data => {
      if (data && data.access_token) {
        this.store
          .select(fromRouting.getRedirectUrl)
          .pipe(
            take(1),
            tap(url => {
              if (url) {
                // If forced to login due to AuthGuard, then redirect to intended destination
                this.store.dispatch(new fromRouting.Go({ path: [url] }));
                this.store.dispatch(new fromRouting.clearRedirectUrl());
              } else {
                // User manual login
                this.store.dispatch(new fromRouting.Back());
              }
            })
          )
          .subscribe();
      }
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  private validatePassword(fc: FormControl) {
    const password = fc.value as string;
    return password.match(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^*()_+{};:.,]).{6,}$'
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
