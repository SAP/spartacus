/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { of, throwError } from 'rxjs';
import { KeyValuePair } from '../../model';
import { OpfPaymentVerificationComponent } from './opf-payment-verification.component';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('OpfPaymentVerificationComponent', () => {
  let component: OpfPaymentVerificationComponent;
  let fixture: ComponentFixture<OpfPaymentVerificationComponent>;
  let routeMock: jasmine.SpyObj<ActivatedRoute>;
  let paymentServiceMock: jasmine.SpyObj<OpfPaymentVerificationService>;

  beforeEach(() => {
    routeMock = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { queryParamMap: new Map() },
    });
    paymentServiceMock = jasmine.createSpyObj('OpfPaymentVerificationService', [
      'checkIfProcessingCartIdExist',
      'verifyResultUrl',
      'verifyPayment',
      'placeOrder',
      'goToPage',
      'displayError',
    ]);

    TestBed.configureTestingModule({
      declarations: [OpfPaymentVerificationComponent, MockSpinnerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        {
          provide: OpfPaymentVerificationService,
          useValue: paymentServiceMock,
        },
      ],
    });

    fixture = TestBed.createComponent(OpfPaymentVerificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call checkIfProcessingCartIdExist', () => {
      paymentServiceMock.verifyResultUrl.and.returnValue(of());

      component.ngOnInit();
      expect(
        paymentServiceMock.checkIfProcessingCartIdExist
      ).toHaveBeenCalled();
    });

    it('should handle success scenario', () => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap: Array<KeyValuePair> = [];
      const mockAfterRedirectScriptFlag: string = 'false';
      const mockVerifyResult: {
        paymentSessionId: string;
        paramsMap: Array<KeyValuePair>;
        afterRedirectScriptFlag: string;
      } = {
        paymentSessionId: mockPaymentSessionId,
        paramsMap: mockResponseMap,
        afterRedirectScriptFlag: mockAfterRedirectScriptFlag,
      };
      const mockPlaceOrderResult: Order = { guid: 'placeOrderResult' };

      paymentServiceMock.verifyResultUrl.and.returnValue(of(mockVerifyResult));
      paymentServiceMock.verifyPayment.and.returnValue(of(true));
      paymentServiceMock.placeOrder.and.returnValue(of(mockPlaceOrderResult));

      component.ngOnInit();

      expect(paymentServiceMock.verifyResultUrl).toHaveBeenCalledWith(
        routeMock
      );
      expect(paymentServiceMock.verifyPayment).toHaveBeenCalledWith(
        mockPaymentSessionId,
        mockResponseMap
      );
      expect(paymentServiceMock.placeOrder).toHaveBeenCalled();
    });

    it('should handle error scenario', () => {
      const mockError: HttpErrorModel = { status: 500, message: 'Error' };

      const mockVerifyResult = {
        paymentSessionId: '1',
        paramsMap: [],
        afterRedirectScriptFlag: 'false',
      };

      paymentServiceMock.verifyResultUrl.and.returnValue(of(mockVerifyResult));
      paymentServiceMock.verifyPayment.and.returnValue(throwError(mockError));

      spyOn(component, 'onError');

      component.ngOnInit();

      expect(component.onError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('onSuccess', () => {
    it('should call paymentService.goToPage with "orderConfirmation"', () => {
      component.onSuccess();
      expect(paymentServiceMock.goToPage).toHaveBeenCalledWith(
        'orderConfirmation'
      );
    });
  });

  describe('onError', () => {
    it('should call paymentService.displayError with the provided error and paymentService.goToPage with "checkoutReviewOrder"', () => {
      const mockError: HttpErrorModel = { status: 404, message: 'Not Found' };

      component.onError(mockError);

      expect(paymentServiceMock.displayError).toHaveBeenCalledWith(mockError);
      expect(paymentServiceMock.goToPage).toHaveBeenCalledWith(
        'checkoutReviewOrder'
      );
    });
  });

  // describe('ngOnDestroy', () => {
  //   it('should unsubscribe from the subscription', () => {
  //     const subscriptionMock: Subscription = jasmine.createSpyObj(
  //       'Subscription',
  //       ['unsubscribe']
  //     );
  //     component.subscription = subscriptionMock;

  //     component.ngOnDestroy();

  //     expect(subscriptionMock.unsubscribe).toHaveBeenCalled();
  //   });
  // });
});
