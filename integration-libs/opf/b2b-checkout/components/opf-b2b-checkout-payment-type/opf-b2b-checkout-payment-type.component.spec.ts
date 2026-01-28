/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  GlobalMessageService,
  I18nTestingModule,
  TranslatePipe,
  UserIdService,
} from '@spartacus/core';
import {
  OpfActiveConfiguration,
  OpfMetadataModel,
  OpfMetadataStoreService,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { OpfCheckoutPaymentsComponent } from '@spartacus/opf/checkout/components';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentFacade,
  OpfPaymentSessionData,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { of } from 'rxjs';
import { OpfB2bCheckoutPaymentTypeComponent } from './opf-b2b-checkout-payment-type.component';

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive = () => of({ purchaseOrderNumber: 'PO123' });
  reloadActiveCart = () => {};
}

class MockCheckoutPaymentTypeFacade
  implements Partial<CheckoutPaymentTypeFacade>
{
  setPaymentType = () => of({});
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = () => {};
  back = () => {};
  disableEnableStep = () => {};
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

@Component({
  selector: 'cx-opf-checkout-payments',
  template: '',
})
class MockOpfCheckoutPaymentsComponent
  implements Partial<OpfB2bCheckoutPaymentTypeComponent> {}

describe('OpfB2bCheckoutPaymentTypeComponent', () => {
  let component: OpfB2bCheckoutPaymentTypeComponent;
  let fixture: ComponentFixture<OpfB2bCheckoutPaymentTypeComponent>;
  let checkoutStepService: CheckoutStepService;
  let checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        OpfB2bCheckoutPaymentTypeComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
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
        FormBuilder,
      ],
    })
      .overrideComponent(OpfB2bCheckoutPaymentTypeComponent, {
        remove: {
          imports: [TranslatePipe, OpfCheckoutPaymentsComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockOpfCheckoutPaymentsComponent],
        },
      })

      .compileComponents();

    fixture = TestBed.createComponent(OpfB2bCheckoutPaymentTypeComponent);
    component = fixture.componentInstance;
    checkoutStepService = TestBed.inject(CheckoutStepService);
    checkoutPaymentTypeFacade = TestBed.inject(CheckoutPaymentTypeFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle payment change', () => {
    const payment: OpfActiveConfiguration = {
      id: 1,
      paymentType: B2BPaymentTypeEnum.ACCOUNT_PAYMENT,
      providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
      displayName: 'Test Payment',
      description: 'Test Description',
    };
    spyOn(checkoutStepService, 'disableEnableStep');
    spyOn(checkoutPaymentTypeFacade, 'setPaymentType').and.returnValue(of({}));
    spyOn(activeCartFacade, 'reloadActiveCart');

    component.handlePaymentChange(payment);

    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      true
    );
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.REVIEW_ORDER,
      false
    );
    expect(checkoutPaymentTypeFacade.setPaymentType).toHaveBeenCalled();
    expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
  });

  it('should navigate to next step', () => {
    spyOn(checkoutStepService, 'next');
    spyOn(checkoutPaymentTypeFacade, 'setPaymentType').and.returnValue(of({}));
    spyOn(activeCartFacade, 'reloadActiveCart');

    const payment: OpfActiveConfiguration = {
      id: 1,
      paymentType: B2BPaymentTypeEnum.ACCOUNT_PAYMENT,
      providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
      displayName: 'Test Payment',
      description: 'Test Description',
    };

    component.handlePaymentChange(payment);
    fixture.detectChanges();

    component.next();

    expect(checkoutPaymentTypeFacade.setPaymentType).toHaveBeenCalled();
    expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
    expect(checkoutStepService.next).toHaveBeenCalled();
  });

  it('should navigate back', () => {
    spyOn(checkoutStepService, 'back');
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalled();
  });
});
