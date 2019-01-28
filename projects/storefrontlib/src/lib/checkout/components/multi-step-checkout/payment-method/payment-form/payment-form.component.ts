import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  CheckoutService,
  CardType,
  Address,
  Country,
  UserService,
  GlobalMessageService,
  GlobalMessageType,
  AddressValidation
} from '@spartacus/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { SuggestedAddressDialogComponent } from '../../shipping-address/address-form/suggested-addresses-dialog/suggested-addresses-dialog.component'; // tslint:disable-line
import { infoIconImgSrc } from '../../../../../ui/images/info-icon';
import { Card } from '../../../../../ui/components/card/card.component'; // tslint:disable-line

type monthType = { id: number; name: string };
type yearType = { id: number; name: number };

@Component({
  selector: 'cx-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  private checkboxSub: Subscription;
  private addressVerifySub: Subscription;
  suggestedAddressModalRef: NgbModalRef;
  months: monthType[] = [];
  years: yearType[] = [];

  cardTypes$: Observable<CardType[]>;
  shippingAddress$: Observable<Address>;
  countries$: Observable<Country[]>;
  sameAsShippingAddress = true;

  @Output()
  backToPayment = new EventEmitter<any>();
  @Output()
  addPaymentInfo = new EventEmitter<any>();

  payment: FormGroup = this.fb.group({
    defaultPayment: [false],
    accountHolderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardType: this.fb.group({
      code: ['', Validators.required]
    }),
    expiryMonth: ['', Validators.required],
    expiryYear: ['', Validators.required],
    cvn: ['', Validators.required]
  });

  billingAddress: FormGroup = this.fb.group({
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: ['', Validators.required]
    }),
    country: this.fb.group({
      isocode: ['', Validators.required]
    }),
    postalCode: ['', Validators.required],
    phone: ''
  });

  infoIconImgSrc = infoIconImgSrc;

  constructor(
    protected checkoutService: CheckoutService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.expMonthAndYear();

    this.countries$ = this.userService.getAllBillingCountries().pipe(
      tap(countries => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.userService.loadBillingCountries();
        }
      })
    );

    this.cardTypes$ = this.checkoutService.getCardTypes().pipe(
      tap(cardTypes => {
        if (Object.keys(cardTypes).length === 0) {
          this.checkoutService.loadSupportedCardTypes();
        }
      })
    );

    this.shippingAddress$ = this.checkoutService.getDeliveryAddress();

    this.checkboxSub = this.showSameAsShippingAddressCheckbox().subscribe(
      (shouldShowCheckbox: boolean) => {
        // this operation makes sure the checkbox is not checked if not shown and vice versa
        this.sameAsShippingAddress = shouldShowCheckbox;
      }
    );

    // verify the new added address
    this.addressVerifySub = this.checkoutService
      .getAddressVerificationResults()
      .subscribe((results: AddressValidation) => {
        if (results === 'FAIL') {
          this.checkoutService.clearAddressVerificationResults();
        } else if (results.decision === 'ACCEPT') {
          this.next();
        } else if (results.decision === 'REJECT') {
          this.globalMessageService.add({
            type: GlobalMessageType.MSG_TYPE_ERROR,
            text: 'Invalid Address'
          });
          this.checkoutService.clearAddressVerificationResults();
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

  // TODO:#530
  paymentSelected(card): void {
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

  isContinueButtonDisabled(): boolean {
    return (
      this.payment.invalid ||
      (!this.sameAsShippingAddress && this.billingAddress.invalid)
    );
  }

  /**
   * Check if the shipping address can also be a billing address
   *
   * @memberof PaymentFormComponent
   */
  showSameAsShippingAddressCheckbox(): Observable<boolean> {
    return combineLatest(this.countries$, this.shippingAddress$).pipe(
      map(([countries, address]) => {
        return !!countries.filter(
          (country: Country): boolean =>
            country.isocode === address.country.isocode
        ).length;
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
        address.phone
      ]
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
          this.checkoutService.clearAddressVerificationResults();
          this.suggestedAddressModalRef = null;
        })
        .catch(() => {
          // this  callback is called when modal is closed with Esc key or clicking backdrop
          this.checkoutService.clearAddressVerificationResults();
          this.suggestedAddressModalRef = null;
        });
    }
  }

  back(): void {
    this.backToPayment.emit();
  }

  verifyAddress(): void {
    if (this.sameAsShippingAddress) {
      this.next();
    } else {
      this.checkoutService.verifyAddress(this.billingAddress.value);
    }
  }

  next(): void {
    this.addPaymentInfo.emit({
      paymentDetails: this.payment.value,
      billingAddress: this.sameAsShippingAddress
        ? null
        : this.billingAddress.value
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
