import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromUserStore from '../../store';
import * as fromCheckoutStore from '../../../checkout/store';

@Component({
  selector: 'y-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  titles$: Observable<any>;

  user: FormGroup = this.fb.group(
    {
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue]
    },
    {
      validator: this.matchPassword
    }
  );

  constructor(
    private store: Store<fromUserStore.UserState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titles$ = this.store.select(fromCheckoutStore.getAllTitles).pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromCheckoutStore.LoadTitles());
        }
      })
    );
  }

  submit() {
    this.store.dispatch(
      new fromUserStore.RegisterUser({
        firstName: this.user.value.firstName,
        lastName: this.user.value.lastName,
        password: this.user.value.password,
        titleCode: this.user.value.titleCode,
        uid: this.user.value.email
      })
    );
  }

  private matchPassword(ac: AbstractControl) {
    const password = ac.get('password').value;
    const confirmPassword = ac.get('passwordconf').value;
    if (password !== confirmPassword) {
      ac.get('passwordconf').setErrors({ MatchPassword: true });
    }
  }
}
