/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import {
  OpfGlobalFunctionsFacade,
  OpfOrderFacade,
  OpfPaymentFacade,
} from '../../facade';
import {
  AfterRedirectDynamicScript,
  OpfPaymentMetadata,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  TargetPage,
} from '../../model';
import { OpfResourceLoaderService, OpfService } from '../../services';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

describe('OpfPaymentVerificationService', () => {
  let service: OpfPaymentVerificationService;
  let opfOrderFacadeMock: jasmine.SpyObj<OpfOrderFacade>;
  let routingServiceMock: jasmine.SpyObj<RoutingService>;
  let globalMessageServiceMock: jasmine.SpyObj<GlobalMessageService>;
  let opfPaymentServiceMock: jasmine.SpyObj<OpfPaymentFacade>;
  let opfServiceMock: jasmine.SpyObj<OpfService>;
  let opfResourceLoaderServiceMock: jasmine.SpyObj<OpfResourceLoaderService>;
  let globalFunctionsServiceMock: jasmine.SpyObj<OpfGlobalFunctionsFacade>;

  beforeEach(() => {
    opfOrderFacadeMock = jasmine.createSpyObj('OpfOrderFacade', [
      'placeOpfOrder',
    ]);
    routingServiceMock = jasmine.createSpyObj('RoutingService', ['go']);
    globalMessageServiceMock = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    opfPaymentServiceMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'verifyPayment',
      'afterRedirectScripts',
    ]);
    opfServiceMock = jasmine.createSpyObj('OpfService', [
      'getOpfMetadataState',
    ]);
    opfResourceLoaderServiceMock = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      [
        'clearAllProviderResources',
        'executeScriptFromHtml',
        'loadProviderResources',
      ]
    );

    globalFunctionsServiceMock = jasmine.createSpyObj(
      'OpfGlobalFunctionsFacade',
      ['registerGlobalFunctions', 'removeGlobalFunctions']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfPaymentVerificationService,
        { provide: OpfOrderFacade, useValue: opfOrderFacadeMock },
        { provide: RoutingService, useValue: routingServiceMock },
        { provide: GlobalMessageService, useValue: globalMessageServiceMock },
        { provide: OpfPaymentFacade, useValue: opfPaymentServiceMock },
        { provide: OpfService, useValue: opfServiceMock },
        {
          provide: OpfResourceLoaderService,
          useValue: opfResourceLoaderServiceMock,
        },
        {
          provide: OpfGlobalFunctionsFacade,
          useValue: globalFunctionsServiceMock,
        },
      ],
    });

    service = TestBed.inject(OpfPaymentVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
        expect(result.paramsMap).toEqual([
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
        queryParams: of(undefined),
      } as unknown as ActivatedRoute;

      service.verifyResultUrl(mockRoute).subscribe(
        () => {},
        (error) => {
          expect(error).toBeDefined();
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

      opfPaymentServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .verifyPayment(mockPaymentSessionId, mockResponseMap)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(opfPaymentServiceMock.verifyPayment).toHaveBeenCalledWith(
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

      opfPaymentServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .verifyPayment(mockPaymentSessionId, mockResponseMap)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(opfPaymentServiceMock.verifyPayment).toHaveBeenCalledWith(
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

      opfPaymentServiceMock.verifyPayment.and.returnValue(
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

      opfPaymentServiceMock.verifyPayment.and.returnValue(
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

  describe('runHostedFieldsPattern', () => {
    const dynamicScriptMock: AfterRedirectDynamicScript = {
      cssUrls: [{ url: 'css url test', sri: 'css sri test' }],
      jsUrls: [{ url: 'js url test', sri: 'js sri test' }],
      html: 'html test',
    };

    it('should call renderAfterRedirectScripts', (done) => {
      opfPaymentServiceMock.afterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: dynamicScriptMock })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      spyOn<any>(service, 'renderAfterRedirectScripts').and.returnValue(
        Promise.resolve(true)
      );

      service
        .runHostedFieldsPattern(
          TargetPage.RESULT,
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(service.renderAfterRedirectScripts).toHaveBeenCalled();
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should throw error when missing afterRedirectScript property', (done) => {
      opfPaymentServiceMock.afterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: undefined })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      spyOn<any>(service, 'renderAfterRedirectScripts').and.returnValue(
        Promise.resolve(true)
      );

      service
        .runHostedFieldsPattern(
          TargetPage.RESULT,
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe(
          () => {},
          (error) => {
            expect(error).toBeDefined();
            expect(error.message).toEqual('opf.payment.errors.proceedPayment');
            done();
          }
        );
    });
  });

  describe('renderAfterRedirectScripts', () => {
    const scriptsMock: AfterRedirectDynamicScript = {
      cssUrls: [{ url: 'css url test', sri: 'css sri test' }],
      jsUrls: [{ url: 'js url test', sri: 'js sri test' }],
      html: 'html test',
    };

    it('should fail when html snippet is empty', (done) => {
      opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
        Promise.resolve()
      );
      service
        .renderAfterRedirectScripts({ ...scriptsMock, html: undefined })
        .then((success: boolean) => {
          expect(
            opfResourceLoaderServiceMock.loadProviderResources
          ).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).not.toHaveBeenCalled();
          expect(success).toBeFalsy();
          done();
        });
    });

    it('should throw error when loadProviderResources fails', (done) => {
      opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
        Promise.reject()
      );

      service
        .renderAfterRedirectScripts(scriptsMock)
        .then((success: boolean) => {
          expect(
            opfResourceLoaderServiceMock.loadProviderResources
          ).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).not.toHaveBeenCalled();
          expect(success).toBeFalsy();
          done();
        });
    });
    it('should call load provider resources', (done) => {
      opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
        Promise.resolve()
      );
      service
        .renderAfterRedirectScripts(scriptsMock)
        .then((success: boolean) => {
          expect(
            opfResourceLoaderServiceMock.loadProviderResources
          ).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).toHaveBeenCalled();
          expect(success).toBeTruthy();
          done();
        });
    });
  });

  describe('removeResourcesAndGlobalFunctions', () => {
    it('should should call psp resource clearing service and remove global functions', (done) => {
      service.removeResourcesAndGlobalFunctions();
      expect(
        globalFunctionsServiceMock.removeGlobalFunctions
      ).toHaveBeenCalled();
      expect(
        opfResourceLoaderServiceMock.clearAllProviderResources
      ).toHaveBeenCalled();
      done();
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
