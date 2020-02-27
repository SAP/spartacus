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
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Card } from '../../../../../shared/components/card/card.component'; // tslint:disable-line
import {
  ModalRef,
  ModalService,
} from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../misc/icon/index';
import { SuggestedAddressDialogComponent } from '../../shipping-address/address-form/suggested-addresses-dialog/suggested-addresses-dialog.component'; // tslint:disable-line

type monthType = { id: number; name: string };
type yearType = { id: number; name: number };

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
  months: monthType[] = [];
  years: yearType[] = [];

  cardTypes$: Observable<CardType[]>;
  shippingAddress$: Observable<Address>;
  countries$: Observable<Country[]>;
  loading$: Observable<LoaderState<void>>;
  sameAsShippingAddress = true;

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

  payment: FormGroup = this.fb.group({
    defaultPayment: [false],
    accountHolderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardType: this.fb.group({
      code: ['', Validators.required],
    }),
    expiryMonth: ['', Validators.required],
    expiryYear: ['', Validators.required],
    cvn: ['', Validators.required],
  });

  billingAddress: FormGroup = this.fb.group({
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
    private fb: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.expMonthAndYear();
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap(countries => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      })
    );

    this.cardTypes$ = this.checkoutPaymentService.getCardTypes().pipe(
      tap(cardTypes => {
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
  }

  expMonthAndYear(): void {
    const year = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push({ id: i + 1, name: year + i });
    }
    for (let j = 1; j <= 12; j++) {
      if (j < 10) {
        this.months.push({ id: j, name: '0' + j.toString() });
      } else {
        this.months.push({ id: j, name: j.toString() });
      }
    }
  }

  toggleDefaultPaymentMethod(): void {
    this.payment.value.defaultPayment = !this.payment.value.defaultPayment;
  }

  paymentSelected(card: CardType): void {
    this.payment['controls'].cardType['controls'].code.setValue(card.code);
  }

  monthSelected(month: monthType): void {
    this.payment['controls'].expiryMonth.setValue(month.name);
  }

  yearSelected(year: yearType): void {
    this.payment['controls'].expiryYear.setValue(year.name);
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
          address !== undefined &&
          address.country !== undefined &&
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
      this.suggestedAddressModalRef.componentInstance.enteredAddress = this.billingAddress.value;
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
      this.checkoutDeliveryService.verifyAddress(this.billingAddress.value);
    }
  }

  next(): void {
    this.setPaymentDetails.emit({
      paymentDetails: this.payment.value,
      billingAddress: this.sameAsShippingAddress
        ? null
        : this.billingAddress.value,
    });
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
