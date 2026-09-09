/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  CardType,
  FeatureDirective,
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  FocusFirstInvalidFieldDirective,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  NgSelectA11yDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { CheckoutBillingAddressFormService } from '../../checkout-billing-address';
import { CheckoutBillingAddressFormComponent } from '../../checkout-billing-address/checkout-billing-address-form.component';

@Component({
  selector: 'cx-payment-form',
  templateUrl: './checkout-payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgTemplateOutlet,
    FeatureDirective,
    FocusDirective,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    NgSelectComponent,
    NgSelectA11yDirective,
    FocusFirstInvalidFieldDirective,
    FormErrorsComponent,
    IconComponent,
    CheckoutBillingAddressFormComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class CheckoutPaymentFormComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  /**
   * Drives the `cxFocus` autofocus host wrapping the form body. Autofocus starts
   * disabled and is enabled (with a `refreshFocus` token to re-trigger the
   * directive) only once the card type data has loaded, so focus lands on the
   * card type select rather than whichever field wins the async render race.
   *
   * Keeping the host inside the template (rather than on the component element)
   * also lets the action buttons render outside it: in Safari a `<button>`
   * doesn't take focus on click, so if it lived inside the host, focus would
   * fall to the host and its autofocus would redirect to the first field.
   */
  focusConfig: FocusConfig = { autofocus: false };

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

  @ViewChild(forwardRef(() => FocusFirstInvalidFieldDirective))
  protected firstInvalidFieldFocus?: FocusFirstInvalidFieldDirective;

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
  private featureToggles = inject(FeatureToggles);
  protected cdr = inject(ChangeDetectorRef);
  protected elementRef = inject(ElementRef);
  protected subscription = new Subscription();
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

    // Initial focus (form load): enable autofocus only once the card type data
    // has loaded, so the `cxFocus` host focuses the card type select instead of
    // whichever field wins the async render race. This is intentionally
    // data-driven rather than DOM-driven; the post-submit counterpart,
    // `focusFirstInvalidField()`, has to query the DOM instead because it needs
    // the *specific* invalid field, not just the first.
    if (this.featureToggles.a11yImproveCheckoutFocus) {
      this.subscription.add(
        this.cardTypes$
          .pipe(
            filter((cardTypes) => !!cardTypes?.length),
            take(1)
          )
          .subscribe(() => {
            // The emission and the change detection that renders the card type
            // select happen in the same tick; defer to a macrotask so the
            // select exists in the DOM before `refreshFocus` re-triggers the
            // directive's focus logic and picks the first focusable field.
            setTimeout(() => {
              // Don't steal focus if the user has already engaged with the form.
              const active = document.activeElement;
              const host = this.elementRef.nativeElement as HTMLElement;
              if (active && active !== document.body && host.contains(active)) {
                return;
              }
              this.focusConfig = { autofocus: true, refreshFocus: {} };
              this.cdr.markForCheck();
            });
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

      if (this.featureToggles.a11yImproveCheckoutFocus) {
        this.firstInvalidFieldFocus?.focusFirstInvalidField();
      }
    }
  }
}
