import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromUserStore from '../../store';

@Component({
  selector: 'y-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  titles$: Observable<any>;

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
