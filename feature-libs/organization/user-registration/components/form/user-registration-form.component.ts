import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Country,
  Region,
  GlobalMessageService,
  GlobalMessageType,
  UserAddressService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Title, UserRegisterFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { UserRegistrationFacade } from '../../root/facade/user-registration.facade';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRegistrationFormComponent implements OnInit {
  titles$: Observable<Title[]>;
  countries$: Observable<Country[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  isLoading$ = new BehaviorSubject(false);

  registerForm: FormGroup = this.fb.group({
    titleCode: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, CustomFormValidators.emailValidator]],
    country: this.fb.group({
      isocode: [null],
    }),
    line1: [''],
    line2: [''],
    town: [''],
    region: this.fb.group({
      isocode: [null],
    }),
    postalCode: [''],
    phone: '',
    message: [''],
  });

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected userAddressService: UserAddressService,
    protected orgUserRegistrationFacade: UserRegistrationFacade,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titles$ = this.userRegisterFacade.getTitles();

    this.countries$ = this.userAddressService.getDeliveryCountries().pipe(
      tap((countries: Country[]) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );

    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions: Region[]) => {
        const regionControl = this.registerForm.get('region.isocode');
        if (regions && regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
        }
      })
    );
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.register();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  countrySelected(country: Country): void {
    this.registerForm.get('country')?.get('isocode')?.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
  }

  regionSelected(region: Region): void {
    this.registerForm.get('region')?.get('isocode')?.setValue(region.isocode);
  }

  register(): void {
    this.isLoading$.next(true);

    this.orgUserRegistrationFacade
      .registerUser(this.registerForm?.value)
      .subscribe({
        next: () => {
          return this.globalMessageService.add(
            { key: 'userRegistrationForm.successFormSubmitMessage' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        complete: () => {
          this.registerForm.reset();
          this.isLoading$.next(false);
        },
        error: () => this.isLoading$.next(false),
      });
  }
}
