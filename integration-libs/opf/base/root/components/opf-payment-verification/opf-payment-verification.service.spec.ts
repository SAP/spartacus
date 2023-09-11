/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OpfOrderFacade, OpfPaymentFacade } from '../../facade';
import {
  OpfPaymentMetadata,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
} from '../../model';
import { OpfService } from '../../services';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

describe('OpfPaymentVerificationService', () => {
  let service: OpfPaymentVerificationService;
  let opfOrderFacadeMock: jasmine.SpyObj<OpfOrderFacade>;
  let routingServiceMock: jasmine.SpyObj<RoutingService>;
  let globalMessageServiceMock: jasmine.SpyObj<GlobalMessageService>;
  let opfCheckoutServiceMock: jasmine.SpyObj<OpfPaymentFacade>;
  let opfServiceMock: jasmine.SpyObj<OpfService>;

  beforeEach(() => {
    opfOrderFacadeMock = jasmine.createSpyObj('OpfOrderFacade', [
      'placeOpfOrder',
    ]);
    routingServiceMock = jasmine.createSpyObj('RoutingService', ['go']);
    globalMessageServiceMock = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    opfCheckoutServiceMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'verifyPayment',
    ]);
    opfServiceMock = jasmine.createSpyObj('OpfService', [
      'getOpfMetadataState',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfPaymentVerificationService,
        { provide: OpfOrderFacade, useValue: opfOrderFacadeMock },
        { provide: RoutingService, useValue: routingServiceMock },
        { provide: GlobalMessageService, useValue: globalMessageServiceMock },
        { provide: OpfPaymentFacade, useValue: opfCheckoutServiceMock },
        { provide: OpfService, useValue: opfServiceMock },
      ],
    });

    service = TestBed.inject(OpfPaymentVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOpfResponseMap', () => {
    it('should return an empty array for undefined params', () => {
      const result = service.getOpfResponseMap(undefined as unknown as Params);

      expect(result).toEqual([]);
    });

    it('should return an array of OpfResponseMapElement for provided params', () => {
      const params: Params = { key1: 'value1', key2: 'value2' };

      const result = service.getOpfResponseMap(params);

      expect(result).toEqual([
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
      ]);
    });
  });

  describe('findInOpfResponseMap', () => {
    it('should return the value for the provided key if found in the list', () => {
      const list = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
      ];

      const result = service.findInOpfResponseMap('key1', list);

      expect(result).toEqual('value1');
    });

    it('should return undefined if the provided key is not found in the list', () => {
      const list = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
      ];

      const result = service.findInOpfResponseMap('key3', list);

      expect(result).toBeUndefined();
    });
  });

  describe('goToPage', () => {
    it('should call routingService.go with the provided cxRoute', () => {
      service.goToPage('orderConfirmation');

      expect(routingServiceMock.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });
  });

  describe('verifyResultUrl', () => {
    const mockPaymentSessionId = 'sessionId';
    const mockRouteSnapshot: ActivatedRoute = {
      routeConfig: {
        data: {
          cxRoute: 'paymentVerificationResult',
        },
      },
      queryParams: of({ paymentSessionId: mockPaymentSessionId }),
    } as unknown as ActivatedRoute;

    it('should verify the result URL and return the response map if the route cxRoute is "paymentVerificationResult"', (done) => {
      service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
        expect(result.paymentSessionId).toEqual(mockPaymentSessionId);
        expect(result.responseMap).toEqual([
          { key: 'paymentSessionId', value: mockPaymentSessionId },
        ]);
        done();
      });
    });

    it('should throw an error if the route cxRoute is not "paymentVerificationResult"', (done) => {
      const mockOtherRouteSnapshot: ActivatedRoute = {
        routeConfig: {
          data: { cxRoute: 'otherRoute' },
        },
        queryParams: of(),
      } as unknown as ActivatedRoute;

      service.verifyResultUrl(mockOtherRouteSnapshot).subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('opf.payment.errors.cancelPayment');
          done();
        }
      );
    });

    it('should throw an error if queryParams is undefined', (done) => {
      const mockRoute: ActivatedRoute = {
        routeConfig: {
          data: {
            cxRoute: 'paymentVerificationResult',
          },
        },
        queryParams: of({}),
      } as unknown as ActivatedRoute;

      service.verifyResultUrl(mockRoute).subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('opf.payment.errors.proceedPayment');
          done();
        }
      );
    });
  });

  describe('placeOrder', () => {
    it('should call opfOrderFacade.placeOpfOrder with true and return the result', (done) => {
      const mockPlaceOrderResult: Order = { guid: 'placeOrderResult' };
      opfOrderFacadeMock.placeOpfOrder.and.returnValue(
        of(mockPlaceOrderResult)
      );

      service.placeOrder().subscribe((result) => {
        expect(result).toEqual(mockPlaceOrderResult);
        expect(opfOrderFacadeMock.placeOpfOrder).toHaveBeenCalledWith(true);
        done();
      });
    });
  });

  describe('verifyPayment', () => {
    it('should call opfCheckoutService.verifyPayment and return true if the result is AUTHORIZED', (done) => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.AUTHORIZED,
      };

      opfCheckoutServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .verifyPayment(mockPaymentSessionId, mockResponseMap)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(opfCheckoutServiceMock.verifyPayment).toHaveBeenCalledWith(
            mockPaymentSessionId,
            { responseMap: mockResponseMap }
          );
          done();
        });
    });

    it('should call opfCheckoutService.verifyPayment and return true if the result is DELAYED', (done) => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.DELAYED,
      };

      opfCheckoutServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .verifyPayment(mockPaymentSessionId, mockResponseMap)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(opfCheckoutServiceMock.verifyPayment).toHaveBeenCalledWith(
            mockPaymentSessionId,
            { responseMap: mockResponseMap }
          );
          done();
        });
    });

    it('should throw an error with "opf.payment.errors.cancelPayment" if the result is CANCELLED', (done) => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.CANCELLED,
      };

      opfCheckoutServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service.verifyPayment(mockPaymentSessionId, mockResponseMap).subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('opf.payment.errors.cancelPayment');
          done();
        }
      );
    });

    it('should throw an error with defaultError if the result is not AUTHORIZED, DELAYED, or CANCELLED', (done) => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: 'ERROR',
      };

      opfCheckoutServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service.verifyPayment(mockPaymentSessionId, mockResponseMap).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(service.defaultError);
          done();
        }
      );
    });
  });

  describe('isPaymentSuccessful', () => {
    it('should return true if the response result is AUTHORIZED', (done) => {
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.AUTHORIZED,
      };

      service
        .isPaymentSuccessful(mockVerificationResponse)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should return true if the response result is DELAYED', (done) => {
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.DELAYED,
      };

      service
        .isPaymentSuccessful(mockVerificationResponse)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should throw an error with "opf.payment.errors.cancelPayment" if the response result is CANCELLED', (done) => {
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.CANCELLED,
      };

      service.isPaymentSuccessful(mockVerificationResponse).subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('opf.payment.errors.cancelPayment');
          done();
        }
      );
    });

    it('should throw an error with defaultError if the response result is not AUTHORIZED, DELAYED, or CANCELLED', (done) => {
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: 'ERROR',
      };

      service.isPaymentSuccessful(mockVerificationResponse).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(service.defaultError);
          done();
        }
      );
    });
  });

  describe('displayError', () => {
    it('should display the provided error message as an error global message', () => {
      const mockError: HttpErrorModel = { status: -1, message: 'Custom Error' };

      service.displayError(mockError);

      expect(globalMessageServiceMock.add).toHaveBeenCalledWith(
        { key: mockError.message },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should display default error message as an error global message when the provided error does not have status -1', () => {
      const mockError: HttpErrorModel = {
        status: 500,
        message: 'Internal Server Error',
      };

      service.displayError(mockError);

      expect(globalMessageServiceMock.add).toHaveBeenCalledWith(
        { key: 'opf.payment.errors.proceedPayment' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('checkIfProcessingCartIdExist', () => {
    it('should not do anything if the opfPaymentMetadata isPaymentInProgress is true', () => {
      const mockOpfPaymentMetadata: OpfPaymentMetadata = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
      };

      opfServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfPaymentMetadata)
      );

      service.checkIfProcessingCartIdExist();

      expect(opfServiceMock.getOpfMetadataState).toHaveBeenCalled();
      expect(globalMessageServiceMock.add).not.toHaveBeenCalled();
      expect(routingServiceMock.go).not.toHaveBeenCalled();
    });

    it('should go to "cart" page and add global error message if the opfPaymentMetadata isPaymentInProgress is false', () => {
      const mockOpfPaymentMetadata: OpfPaymentMetadata = {
        isPaymentInProgress: false,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
      };

      opfServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfPaymentMetadata)
      );

      service.checkIfProcessingCartIdExist();

      expect(opfServiceMock.getOpfMetadataState).toHaveBeenCalled();
      expect(globalMessageServiceMock.add).toHaveBeenCalledWith(
        { key: 'httpHandlers.cartNotFound' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(routingServiceMock.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
  });
});
