import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  Title,
  UserService,
  UserSignUp,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<Title[]>;

  private subscription = new Subscription();

  userRegistrationForm: FormGroup = this.fb.group(
    {
      titleCode: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue],
    },
    { validator: this.matchPassword }
  );

  constructor(
    private auth: AuthService,
    private authRedirectService: AuthRedirectService,
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

    this.subscription.add(
      this.auth.getUserToken().subscribe(data => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      })
    );

    // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
    this.subscription.add(
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
            this.globalMessageService.add(
              { key: 'register.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        })
    );
  }

  submit(): void {
    this.emailToLowerCase();
    const {
      firstName,
      lastName,
      email,
      password,
      titleCode,
    } = this.userRegistrationForm.value;
    const userRegisterFormData: UserSignUp = {
      firstName,
      lastName,
      uid: email,
      password,
      titleCode,
    };
    this.userService.register(userRegisterFormData);
  }

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }

  /*
   * Change the inputed email to lowercase because
   * the backend only accepts lowercase emails
   */
  emailToLowerCase(): void {
    this.userRegistrationForm.value.email = this.userRegistrationForm.value.email.toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
