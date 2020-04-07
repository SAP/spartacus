import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Address,
  AddressValidation,
  CardType,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  LoaderState,
  UserPaymentService,
  Region,
  UserAddressService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Card } from '../../../../../shared/components/card/card.component'; // tslint:disable-line
import {
  ModalRef,
  ModalService,
} from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../misc/icon/index';
import { SuggestedAddressDialogComponent } from '../../shipping-address/address-form/suggested-addresses-dialog/suggested-addresses-dialog.component'; // tslint:disable-line

@Component({
  selector: 'cx-payment-form',
  templateUrl: './payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  private checkboxSub: Subscription;
  private addressVerifySub: Subscription;
  suggestedAddressModalRef: ModalRef;
  months: string[] = [];
  years: number[] = [];

  cardTypes$: Observable<CardType[]>;
  shippingAddress$: Observable<Address>;
  countries$: Observable<Country[]>;
  loading$: Observable<LoaderState<void>>;
  sameAsShippingAddress = true;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input()
  setAsDefaultField: boolean;

  @Input()
  paymentMethodsCount: number;

  @Output()
  goBack = new EventEmitter<any>();

  @Output()
  closeForm = new EventEmitter<any>();

  @Output()
  setPaymentDetails = new EventEmitter<any>();

  paymentForm: FormGroup = this.fb.group({
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

  billingAddressForm: FormGroup = this.fb.group({
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

  constructor(
    protected checkoutPaymentService: CheckoutPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected userPaymentService: UserPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected modalService: ModalService,
    protected userAddressService: UserAddressService,
  ) {}

  ngOnInit() {
    this.expMonthAndYear();
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      })
    );

    this.cardTypes$ = this.checkoutPaymentService.getCardTypes().pipe(
      tap((cardTypes) => {
        if (Object.keys(cardTypes).length === 0) {
          this.checkoutPaymentService.loadSupportedCardTypes();
        }
      })
    );

    this.shippingAddress$ = this.checkoutDeliveryService.getDeliveryAddress();
    this.loading$ = this.checkoutPaymentService.getSetPaymentDetailsResultProcess();

    this.checkboxSub = this.showSameAsShippingAddressCheckbox().subscribe(
      (shouldShowCheckbox: boolean) => {
        // this operation makes sure the checkbox is not checked if not shown and vice versa
        this.sameAsShippingAddress = shouldShowCheckbox;
      }
    );

    // verify the new added address
    this.addressVerifySub = this.checkoutDeliveryService
      .getAddressVerificationResults()
      .subscribe((results: AddressValidation) => {
        if (results.decision === 'FAIL') {
          this.checkoutDeliveryService.clearAddressVerificationResults();
        } else if (results.decision === 'ACCEPT') {
          this.next();
        } else if (results.decision === 'REJECT') {
          this.globalMessageService.add(
            { key: 'addressForm.invalidAddress' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.checkoutDeliveryService.clearAddressVerificationResults();
        } else if (results.decision === 'REVIEW') {
          this.openSuggestedAddress(results);
        }
      });

    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions) => {
        const regionControl = this.billingAddressForm.get(
          'region.isocodeShort'
        );
        if (regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
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
    this.paymentForm.value.defaultPayment = !this.paymentForm.value
      .defaultPayment;
  }

  paymentSelected(card: CardType): void {
    this.paymentForm.get('cardType.code').setValue(card.code);
  }

  monthSelected(month: string): void {
    this.paymentForm.get('expiryMonth').setValue(month);
  }

  yearSelected(year: number): void {
    this.paymentForm.get('expiryYear').setValue(year);
  }

  toggleSameAsShippingAddress(): void {
    this.sameAsShippingAddress = !this.sameAsShippingAddress;
  }

  /**
   * Check if the shipping address can also be a billing address
   *
   * @memberof PaymentFormComponent
   */
  showSameAsShippingAddressCheckbox(): Observable<boolean> {
    return combineLatest([this.countries$, this.shippingAddress$]).pipe(
      map(([countries, address]) => {
        return (
          address?.country &&
          !!countries.filter(
            (country: Country): boolean =>
              country.isocode === address.country.isocode
          ).length
        );
      })
    );
  }

  getAddressCardContent(address: Address): Card {
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
    }

    return {
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        address.town + ', ' + region + address.country.isocode,
        address.postalCode,
        address.phone,
      ],
    };
  }

  openSuggestedAddress(results: AddressValidation): void {
    if (!this.suggestedAddressModalRef) {
      this.suggestedAddressModalRef = this.modalService.open(
        SuggestedAddressDialogComponent,
        { centered: true, size: 'lg' }
      );
      this.suggestedAddressModalRef.componentInstance.enteredAddress = this.billingAddressForm.value;
      this.suggestedAddressModalRef.componentInstance.suggestedAddresses =
        results.suggestedAddresses;
      this.suggestedAddressModalRef.result
        .then(() => {
          this.checkoutDeliveryService.clearAddressVerificationResults();
          this.suggestedAddressModalRef = null;
        })
        .catch(() => {
          // this  callback is called when modal is closed with Esc key or clicking backdrop
          this.checkoutDeliveryService.clearAddressVerificationResults();
          this.suggestedAddressModalRef = null;
        });
    }
  }

  close(): void {
    this.closeForm.emit();
  }

  back(): void {
    this.goBack.emit();
  }

  verifyAddress(): void {
    if (this.sameAsShippingAddress) {
      this.next();
    } else {
      this.checkoutDeliveryService.verifyAddress(this.billingAddressForm.value);
    }
  }

  countrySelected(country: Country): void {
    this.billingAddressForm.get('country.isocode').setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
  }

  regionSelected(region: Region): void {
    this.billingAddressForm
      .get('region.isocodeShort')
      .setValue(region.isocodeShort);
  }

  next(): void {
    if (this.paymentForm.valid) {
      if (this.sameAsShippingAddress) {
        this.setPaymentDetails.emit({
          paymentDetails: this.paymentForm.value,
          billingAddress: null,
        });
      } else {
        if (this.billingAddressForm.valid) {
          this.setPaymentDetails.emit({
            paymentDetails: this.paymentForm.value,
            billingAddress: this.billingAddressForm.value,
          });
        } else {
          this.billingAddressForm.markAllAsTouched();
        }
      }
    } else {
      this.paymentForm.markAllAsTouched();

      if (!this.sameAsShippingAddress) {
        this.billingAddressForm.markAllAsTouched();
      }
    }
  }

  ngOnDestroy() {
    if (this.checkboxSub) {
      this.checkboxSub.unsubscribe();
    }
    if (this.addressVerifySub) {
      this.addressVerifySub.unsubscribe();
    }
  }
}
