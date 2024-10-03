/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthConfigService,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  Region,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import {
  OrganizationUserRegistration,
  UserRegistrationFacade,
} from '@spartacus/organization/user-registration/root';
import { CustomFormValidators } from '@spartacus/storefront';
import { Title, UserRegisterFacade } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationFormService {
  private _form: FormGroup = this.buildForm();

  /*
   * Initializes form structure for registration.
   */
  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      titleCode: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
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
      phoneNumber: [''],
      message: [''],
    });
  }

  /*
   * Gets form structure for registration.
   */
  public get form(): FormGroup {
    return this._form;
  }

  /*
   * Gets form control for country isocode.
   */
  public get countryControl(): AbstractControl | null {
    return this.form.get('country.isocode');
  }

  /*
   *  Gets form control for region isocode.
   */
  public get regionControl(): AbstractControl | null {
    return this.form.get('region.isocode');
  }

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected userAddressService: UserAddressService,
    protected organizationUserRegistrationFacade: UserRegistrationFacade,
    protected translationService: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected authConfigService: AuthConfigService,
    protected routingService: RoutingService,
    protected formBuilder: FormBuilder
  ) {}

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
    const regions: Region[] = [];
    return (
      this.countryControl?.valueChanges.pipe(
        filter((countryIsoCode) => !!countryIsoCode),
        switchMap((countryIsoCode) => {
          this.regionControl?.reset();
          return this.userAddressService.getRegions(countryIsoCode);
        })
      ) ?? of(regions)
    );
  }

  /**
   * Takes form values and builds custom message content.
   */
  protected buildMessageContent(form: FormGroup): Observable<string> {
    return this.translationService.translate(
      'userRegistrationForm.messageToApproverTemplate',
      {
        phoneNumber: form.get('phoneNumber')?.value,
        addressLine: form.get('line1')?.value,
        secondAddressLine: form.get('line2')?.value,
        city: form.get('city')?.value,
        state: form.get('region')?.get('isocode')?.value,
        postalCode: form.get('postalCode')?.value,
        country: form.get('country')?.get('isocode')?.value,
        companyName: form.get('companyName')?.value,
        message: form.get('message')?.value,
      }
    );
  }

  /**
   * Displays confirmation global message.
   */
  protected displayGlobalMessage(): void {
    return this.globalMessageService.add(
      { key: 'userRegistrationForm.successFormSubmitMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  /**
   * Redirects the user back to the login page.
   *
   * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
   */
  protected redirectToLogin(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  /**
   * Registers new organization user.
   */
  registerUser(form: FormGroup): Observable<OrganizationUserRegistration> {
    return this.buildMessageContent(form).pipe(
      take(1),
      switchMap((message: string) =>
        this.organizationUserRegistrationFacade.registerUser({
          titleCode: form.get('titleCode')?.value,
          firstName: form.get('firstName')?.value,
          lastName: form.get('lastName')?.value,
          email: form.get('email')?.value,
          message: message,
        })
      ),
      tap(() => {
        this.displayGlobalMessage();
        this.redirectToLogin();
        form.reset();
      })
    );
  }
}
