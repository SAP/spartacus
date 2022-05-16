import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Country,
  GlobalMessageService,
  GlobalMessageType,
  Region,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Title, UserRegisterFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { OrganizationUserRegistration } from '../../core/model';
import { UserRegistrationFacade } from '../../root/facade/user-registration.facade';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationFormService {
  protected form: FormGroup = this.buildForm();
  /*
   * Initializes form structure for registration.
   */
  buildForm() {
    return this.formBuilder.group({
      titleCode: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      country: this.formBuilder.group({
        isocode: [null],
      }),
      line1: [''],
      line2: [''],
      town: [''],
      region: this.formBuilder.group({
        isocode: [null],
      }),
      postalCode: [''],
      phoneNumber: '',
      message: [''],
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  /**
   * Gets all title codes.
   */
  getTitles(): Observable<Title[]> {
    return this.userRegisterFacade.getTitles();
  }

  /**
   * Gets all countries list.
   */
  getCountries(): Observable<Country[]> {
    return this.userAddressService.getDeliveryCountries().pipe(
      tap((countries: Country[]) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );
  }

  /**
   * Gets all regions list for specific selected country.
   */
  getRegions(): Observable<Region[]> {
    let selectedCountryCode = this.form.get('country.isocode').value;
    let newCountryCode: string;

    return this.getForm()
      .get('country.isocode')
      .valueChanges.pipe(
        filter((countryIsoCode) => Boolean(countryIsoCode)),
        switchMap((countryIsoCode) => {
          newCountryCode = countryIsoCode;
          return this.userAddressService.getRegions(countryIsoCode);
        }),
        tap((regions: Region[]) => {
          const regionControl = this.form.get('region.isocode');
          if (!regions || regions.length === 0) {
            regionControl.disable();
          } else {
            regionControl.enable();
          }
          if (selectedCountryCode && newCountryCode !== selectedCountryCode) {
            regionControl.reset();
          }
          selectedCountryCode = newCountryCode;
        })
      );
  }

  /**
   * Takes form values and builds custom message content.
   */
  buildMessageContent(form: FormGroup): Observable<string> {
    return this.translationService.translate(
      'userRegistrationForm.messageToApproverTemplate',
      {
        phoneNumber: form.get('phoneNumber')?.value,
        addresLine: form.get('line1')?.value,
        secondAddressLine: form.get('line2')?.value,
        city: form.get('city')?.value,
        state: form.get('region')?.get('isocode')?.value,
        postalCode: form.get('postalCode')?.value,
        country: form.get('country')?.get('isocode')?.value,
        message: form.get('message')?.value,
      }
    );
  }

  /**
   * Displays confirmation global message.
   */
  displayGlobalMessage(): void {
    return this.globalMessageService.add(
      { key: 'userRegistrationForm.successFormSubmitMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  /**
   * Registers new organization user.
   */
  registerUser(form: FormGroup): Observable<OrganizationUserRegistration> {
    return this.buildMessageContent(form).pipe(
      take(1),
      switchMap((message: string) =>
        this.organizationUserRegistrationFacade.registerUser({
          firstName: form.get('firstName')?.value,
          lastName: form.get('lastName')?.value,
          email: form.get('email')?.value,
          message,
        })
      ),
      tap(() => this.displayGlobalMessage())
    );
  }

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected userAddressService: UserAddressService,
    protected organizationUserRegistrationFacade: UserRegistrationFacade,
    protected translationService: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected formBuilder: FormBuilder
  ) {}
}
