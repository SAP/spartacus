/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  CmsService,
  GlobalMessageService,
  I18nTestingModule,
  MockTranslatePipe,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentFacade,
  OpfPaymentSessionData,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { of } from 'rxjs';
import { OpfB2bCheckoutPaymentAndReviewComponent } from './opf-b2b-checkout-payment-and-review.component';

@Component({
  selector: 'cx-opf-checkout-payments',
  template: '',
  imports: [ReactiveFormsModule, I18nTestingModule],
})
class MockOpfCheckoutPaymentsComponent {
  @Input() onlyPaymentWrapperMode: boolean;
  @Input() isHeadingDisplayed: boolean;
  @Input() isPaymentRenderBelow: boolean;
  @Input() isPaymentInfoMessageEnabled: boolean;
}

class MockCheckoutPaymentTypeFacade
  implements Partial<CheckoutPaymentTypeFacade>
{
  setPaymentType = () => of({});
  getPurchaseOrderNumberState = () =>
    of({
      data: 'PO123',
      loading: false,
      error: false,
    } as QueryState<string>);
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = () => {};
  back = () => {};
  disableEnableStep = () => {};
  getCheckoutStep = () =>
    ({
      id: 'payment',
      name: 'Payment',
      routeName: 'payment',
      type: [CheckoutStepType.PAYMENT_DETAILS],
    }) as CheckoutStep;
}

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  getOpfMetadataState = () =>
    of({
      selectedPaymentOptionId: 1,
      termsAndConditionsChecked: false,
      isPaymentInProgress: false,
      opfPaymentSessionId: '',
      isTermsAndConditionsAlertClosed: false,
    } as OpfMetadataModel);
  updateOpfMetadata = () => of({});
}

class MockOpfPaymentFacade implements Partial<OpfPaymentFacade> {
  verifyPayment = () => of({} as OpfPaymentVerificationResponse);
  submitPayment = () => of(true);
  submitCompletePayment = () => of(true);
  getAfterRedirectScripts = () =>
    of({} as OpfPaymentAfterRedirectScriptResponse);
  initiatePayment = () => of({} as OpfPaymentSessionData);
  setCartPaymentOption = () => of({} as Cart);
}

class MockCmsService implements Partial<CmsService> {
  getCurrentPage = () => of({});
}

describe('OpfB2bCheckoutPaymentAndReviewComponent', () => {
  let component: OpfB2bCheckoutPaymentAndReviewComponent;
  let fixture: ComponentFixture<OpfB2bCheckoutPaymentAndReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        StoreModule.forRoot({}),
        OpfB2bCheckoutPaymentAndReviewComponent,
        MockTranslatePipe,
        MockOpfCheckoutPaymentsComponent,
      ],
      providers: [
        {
          provide: CheckoutPaymentTypeFacade,
          useClass: MockCheckoutPaymentTypeFacade,
        },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: OpfPaymentFacade, useClass: MockOpfPaymentFacade },
        { provide: UserIdService, useValue: {} },
        { provide: GlobalMessageService, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: CmsService, useClass: MockCmsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfB2bCheckoutPaymentAndReviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get payment method name card', () => {
    const result = component.getPaymentMethodNameCard('Test Payment');
    expect(result).toBeTruthy();
  });

  it('should get PO number card', () => {
    const result = component.getPoNumberCard('PO123');
    expect(result).toBeTruthy();
  });
});
