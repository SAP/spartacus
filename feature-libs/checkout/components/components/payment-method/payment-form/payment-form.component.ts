import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import {
  Address,
  AddressValidation,
  CardType,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  Region,
  StateUtils,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  Card,
  ICON_TYPE,
  ModalRef,
  ModalService,
  SuggestedAddressDialogComponent,
} from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-payment-form',
  templateUrl: './payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  suggestedAddressModalRef: ModalRef | null;
  months: string[] = [];
  years: number[] = [];

  cardTypes$: Observable<CardType[]>;
  shippingAddress$: Observable<Address>;
  countries$: Observable<Country[]>;
  loading$: Observable<StateUtils.LoaderState<void>>;
  sameAsShippingAddress = true;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showSameAsShippingAddressCheckbox$: Observable<boolean>;

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
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected userPaymentService: UserPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected modalService: ModalService,
    protected userAddressService: UserAddressService
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
    this.loading$ =
      this.checkoutPaymentService.getSetPaymentDetailsResultProcess();

    this.showSameAsShippingAddressCheckbox$ = combineLatest([
      this.countries$,
      this.shippingAddress$,
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
        this.sameAsShippingAddress = shouldShowCheckbox;
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

  toggleSameAsShippingAddress(): void {
    this.sameAsShippingAddress = !this.sameAsShippingAddress;
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
        address.town + ', ' + region + address.country?.isocode,
        address.postalCode,
        address.phone,
      ],
    } as Card;
  }

  openSuggestedAddress(results: AddressValidation): void {
    if (!this.suggestedAddressModalRef) {
      this.suggestedAddressModalRef = this.modalService.open(
        SuggestedAddressDialogComponent,
        { centered: true, size: 'lg' }
      );
      this.suggestedAddressModalRef.componentInstance.enteredAddress =
        this.billingAddressForm.value;
      this.suggestedAddressModalRef.componentInstance.suggestedAddresses =
        results.suggestedAddresses;
      this.suggestedAddressModalRef.result
        .then(() => {
          this.suggestedAddressModalRef = null;
        })
        .catch(() => {
          // this  callback is called when modal is closed with Esc key or clicking backdrop
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
      this.userAddressService
        .verifyAddress(this.billingAddressForm.value)
        .subscribe((result) => {
          this.handleAddressVerificationResults(result);
        });
    }
  }

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

  countrySelected(country: Country): void {
    this.billingAddressForm.get('country.isocode')?.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode as string);
  }

  next(): void {
    if (this.paymentForm.valid) {
      if (this.sameAsShippingAddress) {
        this.setPaymentDetails.emit({
          paymentDetails: this.paymentForm.value,
          billingAddress: null,
        });
        this.paymentAddedSuccessfullyMessage();
      } else {
        if (this.billingAddressForm.valid) {
          this.setPaymentDetails.emit({
            paymentDetails: this.paymentForm.value,
            billingAddress: this.billingAddressForm.value,
          });
          this.paymentAddedSuccessfullyMessage();
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

  paymentAddedSuccessfullyMessage() {
    this.globalMessageService.add(
      { key: 'paymentForm.paymentAddedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
}
