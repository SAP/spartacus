import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { tap, map, takeWhile } from 'rxjs/operators';

import { infoIconImgSrc } from '../../../../../ui/images/info-icon';
import { Card } from '../../../../../ui/components/card/card.component';

import { CheckoutService } from '../../../../facade/checkout.service';
import { UserService } from '@spartacus/core';

@Component({
  selector: 'cx-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  private isAlive = true;
  months = [];
  years = [];

  cardTypes$: Observable<any>;
  countries$: Observable<any>;
  shippingAddress$: Observable<any>;
  sameAsShippingAddress = false;

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
    private fb: FormBuilder
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

    this.showSameAsShippingAddressCheckbox()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(boolean => {
        this.sameAsShippingAddress = boolean;
      });
  }

  expMonthAndYear() {
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

  toggleDefaultPaymentMethod() {
    this.payment.value.defaultPayment = !this.payment.value.defaultPayment;
  }

  paymentSelected(card) {
    this.payment['controls'].cardType['controls'].code.setValue(card.code);
  }

  monthSelected(month) {
    this.payment['controls'].expiryMonth.setValue(month.name);
  }

  yearSelected(year) {
    this.payment['controls'].expiryYear.setValue(year.name);
  }

  toggleSameAsShippingAddress() {
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
   * @returns {Observable<boolean>}
   * @memberof PaymentFormComponent
   */
  showSameAsShippingAddressCheckbox(): Observable<boolean> {
    return combineLatest(this.countries$, this.shippingAddress$).pipe(
      map(([countries, address]) => {
        return !!countries.filter(
          country => country.isocode === address.country.isocode
        ).length;
      })
    );
  }

  getAddressCardContent(address): Card {
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

  back() {
    this.backToPayment.emit();
  }

  next() {
    this.addPaymentInfo.emit({
      payment: this.payment.value,
      billingAddress: this.billingAddress.value,
      useShippingAddress: this.sameAsShippingAddress
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
