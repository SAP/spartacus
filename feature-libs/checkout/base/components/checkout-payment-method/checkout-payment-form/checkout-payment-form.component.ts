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
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  CardType,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  TranslationService,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CheckoutBillingAddressFormService } from '../../checkout-billing-address';
import { NgIf, AsyncPipe } from '@angular/common';
import { FormRequiredLegendComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectA11yDirective } from '../../../../../../projects/storefrontlib/shared/components/ng-select-a11y/ng-select-a11y.directive';
import { FormErrorsComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { IconComponent } from '../../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { CheckoutBillingAddressFormComponent } from '../../checkout-billing-address/checkout-billing-address-form.component';
import { SpinnerComponent } from '../../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-payment-form',
  templateUrl: './checkout-payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    NgSelectComponent,
    NgSelectA11yDirective,
    FormErrorsComponent,
    IconComponent,
    CheckoutBillingAddressFormComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
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
    protected translationService: TranslationService
  ) {}
  /**
   * @deprecated  This property is obsolete since 2211.42
   */
  useExtractedBillingAddressComponent: boolean = true;

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
    const sameAsDeliveryAddress =
      this.billingAddressService.isBillingAddressSameAsDeliveryAddress();
    const isBillingAddressFormValid =
      this.billingAddressService.isBillingAddressFormValid();
    const billingAddressFormvalue =
      this.billingAddressService.getBillingAddress();

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
          this.billingAddressService.markAllAsTouched();
        }
      }
    } else {
      this.paymentForm.markAllAsTouched();
      this.globalMessageService.add(
        { key: 'formErrors.globalMessage' },
        GlobalMessageType.MSG_TYPE_ASSISTIVE
      );

      if (!sameAsDeliveryAddress) {
        this.billingAddressService.markAllAsTouched();
      }
    }
  }
}
