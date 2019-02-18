import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AuthService,
  RoutingService,
  Title,
  UserService,
  GlobalMessageService,
  GlobalMessageType,
  UserRegisterFormData,
  GlobalMessageEntities
} from '@spartacus/core';

import { Subscription, of, Observable } from 'rxjs';
import { take, switchMap, tap, filter } from 'rxjs/operators';

import { CustomFormValidators } from '../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<Title[]>;
  subscription: Subscription;
  userRegistrationForm: FormGroup = this.fb.group(
    {
      titleCode: [''],
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
    private userService: UserService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );
    this.subscription = this.auth
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
          this.routing.goByUrl(url);
          this.routing.clearRedirectUrl();
        } else {
          // User manual login
          this.routing.back();
        }
      });
  }

  submit(): void {
    const {
      firstName,
      lastName,
      email,
      password,
      titleCode
    } = this.userRegistrationForm.value;
    const userRegisterFormData: UserRegisterFormData = {
      firstName,
      lastName,
      uid: email,
      password,
      titleCode
    };
    this.userService.register(userRegisterFormData);
    // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
    this.globalMessageService
      .get()
      .pipe(filter(data => Object.keys(data).length > 0))
      .subscribe((globalMessageEntities: GlobalMessageEntities) => {
        if (
          globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR].some(
            message => message === 'This field is required.'
          )
        ) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.globalMessageService.add({
            type: GlobalMessageType.MSG_TYPE_ERROR,
            text: 'Title is required.'
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
