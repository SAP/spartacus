/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  CardType,
  GlobalMessageService,
  PaymentDetails,
  TranslationService,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CheckoutBillingAddressFormService } from '../../checkout-billing-address/checkout-billing-address-form.service';

@Component({
  selector: 'cx-payment-form',
  templateUrl: './checkout-payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  months: string[] = [];
  years: number[] = [];

  cardTypes$: Observable<CardType[]>;

  @Input()
  loading: boolean;

  @Input()
  setAsDefaultField: boolean;

  @Input()
  paymentMethodsCount: number;

  @Input()
  paymentDetails?: PaymentDetails;

  billingAddress?: Address;

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
  protected billingAddressService = inject(CheckoutBillingAddressFormService);
  constructor(
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected fb: UntypedFormBuilder,
    protected userAddressService: UserAddressService,
    protected launchDialogService: LaunchDialogService,
    protected translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    if (this.paymentDetails) {
      this.paymentForm.patchValue(this.paymentDetails);
    }

    this.expMonthAndYear();

    this.cardTypes$ = this.checkoutPaymentFacade.getPaymentCardTypes();
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

  close(): void {
    this.closeForm.emit();
  }

  back(): void {
    this.goBack.emit();
  }

  next(): void {
    if (this.paymentForm.valid) {
      if (this.billingAddressService.isBillingAddressSameAsDeliveryAddress()) {
        this.setPaymentDetails.emit({
          paymentDetails: this.paymentForm.value,
          billingAddress: null, //this.billingAddressService.getBillingAddress(),
        });
      } else {
        if (this.billingAddressService.isBillingAddressFormValid()) {
          this.setPaymentDetails.emit({
            paymentDetails: this.paymentForm.value,
            billingAddress: this.billingAddressService.getBillingAddress(),
          });
        } else {
          this.billingAddressService.markAllAsTouched();
        }
      }
    } else {
      this.paymentForm.markAllAsTouched();
      if (!this.billingAddressService.isBillingAddressSameAsDeliveryAddress()) {
        this.billingAddressService.markAllAsTouched();
      }
    }
  }
}
