/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  AddressValidation,
  CardType,
  Country,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  Region,
  TranslationService,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  Card,
  ICON_TYPE,
  LAUNCH_CALLER,
  LaunchDialogService,
  getAddressNumbers,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CheckoutBillingAddressFormService } from '../../checkout-billing-address';

@Component({
  selector: 'cx-payment-form',
  templateUrl: './checkout-payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckoutPaymentFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  months: string[] = [];
  years: number[] = [];

  cardTypes$: Observable<CardType[]>;
  deliveryAddress$: Observable<Address | undefined>;
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  countries$: Observable<Country[]>;
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  sameAsDeliveryAddress = true;
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  regions$: Observable<Region[]>;
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  showSameAsDeliveryAddressCheckbox$: Observable<boolean>;

  @Input()
  loading: boolean;

  @Input()
  setAsDefaultField: boolean;

  @Input()
  paymentMethodsCount: number;

  @Input()
  paymentDetails?: PaymentDetails;

  @Output()
  goBack = new EventEmitter<any>();

  @Output()
  closeForm = new EventEmitter<any>();

  @Output()
  setPaymentDetails = new EventEmitter<any>();

  paymentForm: UntypedFormGroup = this.fb.group({
    cardType: this.fb.group({
      code: [null, Validators.required],
    }),
    accountHolderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiryMonth: [null, Validators.required],
    expiryYear: [null, Validators.required],
    cvn: ['', Validators.required],
    defaultPayment: [false],
  });
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  billingAddressForm: UntypedFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocodeShort: [null, Validators.required],
    }),
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: ['', Validators.required],
  });

  protected featureConfig = inject(FeatureConfigService);
  protected billingAddressService = inject(CheckoutBillingAddressFormService);
  constructor(
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected fb: UntypedFormBuilder,
    protected userAddressService: UserAddressService,
    protected launchDialogService: LaunchDialogService,
    protected translationService: TranslationService
  ) {}
  useExtractedBillingAddressComponent: boolean = this.featureConfig.isEnabled(
    'useExtractedBillingAddressComponent'
  );

  ngOnInit(): void {
    if (this.paymentDetails) {
      this.paymentForm.patchValue(this.paymentDetails);
    }

    this.expMonthAndYear();
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      })
    );

    this.cardTypes$ = this.checkoutPaymentFacade.getPaymentCardTypes();

    this.deliveryAddress$ = this.checkoutDeliveryAddressFacade
      .getDeliveryAddressState()
      .pipe(
        filter((state) => !state.loading),
        map((state) => state.data)
      );

    this.showSameAsDeliveryAddressCheckbox$ = combineLatest([
      this.countries$,
      this.deliveryAddress$,
    ]).pipe(
      map(([countries, address]) => {
        return (
          (address?.country &&
            !!countries.filter(
              (country: Country): boolean =>
                country.isocode === address.country?.isocode
            ).length) ??
          false
        );
      }),
      tap((shouldShowCheckbox) => {
        this.sameAsDeliveryAddress = shouldShowCheckbox;
      })
    );

    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions) => {
        const regionControl = this.billingAddressForm.get(
          'region.isocodeShort'
        );
        if (regions.length > 0) {
          regionControl?.enable();
        } else {
          regionControl?.disable();
        }
      })
    );
  }

  expMonthAndYear(): void {
    const year = new Date().getFullYear();

    for (let i = 0; i < 10; i++) {
      this.years.push(year + i);
    }

    for (let j = 1; j <= 12; j++) {
      if (j < 10) {
        this.months.push(`0${j}`);
      } else {
        this.months.push(j.toString());
      }
    }
  }

  toggleDefaultPaymentMethod(): void {
    this.paymentForm.value.defaultPayment =
      !this.paymentForm.value.defaultPayment;
  }
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  toggleSameAsDeliveryAddress(): void {
    this.sameAsDeliveryAddress = !this.sameAsDeliveryAddress;
  }
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  getAddressCardContent(address: Address): Observable<Card> {
    return this.translationService
      ? combineLatest([
          this.translationService.translate('addressCard.phoneNumber'),
          this.translationService.translate('addressCard.mobileNumber'),
        ]).pipe(
          map(([textPhone, textMobile]) => {
            let region = '';
            if (address.region && address.region.isocode) {
              region = address.region.isocode + ', ';
            }
            const numbers = getAddressNumbers(address, textPhone, textMobile);

            return {
              textBold: address.firstName + ' ' + address.lastName,
              text: [
                address.line1,
                address.line2,
                address.town + ', ' + region + address.country?.isocode,
                address.postalCode,
                numbers,
              ],
            } as Card;
          })
        )
      : EMPTY;
  }
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  //TODO: Add elementRef to trigger button when verifyAddress is used.
  openSuggestedAddress(results: AddressValidation): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.SUGGESTED_ADDRESSES,
      undefined,
      {
        enteredAddress: this.billingAddressForm.value,
        suggestedAddresses: results.suggestedAddresses,
      }
    );
    //TODO: Add logic that handle dialog's actions. Scope of CXSPA-1276
  }

  close(): void {
    this.closeForm.emit();
  }

  back(): void {
    this.goBack.emit();
  }
  /**
   *TODO: This method is not used, but should be. It triggers suggested addresses modal under the hood.
   *
   * See ticket CXSPA-1276
   */
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  verifyAddress(): void {
    if (this.sameAsDeliveryAddress) {
      this.next();
    } else {
      this.userAddressService
        .verifyAddress(this.billingAddressForm.value)
        .subscribe((result) => {
          this.handleAddressVerificationResults(result);
        });
    }
  }
  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  protected handleAddressVerificationResults(results: AddressValidation) {
    if (results.decision === 'ACCEPT') {
      this.next();
    } else if (results.decision === 'REJECT') {
      this.globalMessageService.add(
        { key: 'addressForm.invalidAddress' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    } else if (results.decision === 'REVIEW') {
      this.openSuggestedAddress(results);
    }
  }

  /**
   * @deprecated since 2211.25
   * Use CheckoutBillingAddressFormComponent instead
   */
  countrySelected(country: Country): void {
    this.billingAddressForm.get('country.isocode')?.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode as string);
  }

  next(): void {
    const sameAsDeliveryAddress = this.useExtractedBillingAddressComponent
      ? this.billingAddressService.isBillingAddressSameAsDeliveryAddress()
      : this.sameAsDeliveryAddress;
    const isBillingAddressFormValid = this.useExtractedBillingAddressComponent
      ? this.billingAddressService.isBillingAddressFormValid()
      : this.billingAddressForm.valid;
    const billingAddressFormvalue = this.useExtractedBillingAddressComponent
      ? this.billingAddressService.getBillingAddress()
      : this.billingAddressForm.value;

    if (this.paymentForm.valid) {
      if (sameAsDeliveryAddress) {
        this.setPaymentDetails.emit({
          paymentDetails: this.paymentForm.value,
          billingAddress: null,
        });
      } else {
        if (isBillingAddressFormValid) {
          this.setPaymentDetails.emit({
            paymentDetails: this.paymentForm.value,
            billingAddress: billingAddressFormvalue,
          });
        } else {
          this.useExtractedBillingAddressComponent
            ? this.billingAddressService.markAllAsTouched()
            : this.billingAddressForm.markAllAsTouched();
        }
      }
    } else {
      this.paymentForm.markAllAsTouched();
      this.globalMessageService.add(
        { key: 'formErrors.globalMessage' },
        GlobalMessageType.MSG_TYPE_ASSISTIVE
      );

      if (!sameAsDeliveryAddress) {
        this.useExtractedBillingAddressComponent
          ? this.billingAddressService.markAllAsTouched()
          : this.billingAddressForm.markAllAsTouched();
      }
    }
  }
}
