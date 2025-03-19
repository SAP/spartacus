/*
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
import {
  OpfDynamicScript,
  OpfMetadataModel,
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OpfPaymentFacade } from '../../facade';
import {
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
} from '../../model';

import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

describe('OpfPaymentVerificationService', () => {
  let service: OpfPaymentVerificationService;
  let orderFacadeMock: jasmine.SpyObj<OrderFacade>;
  let routingServiceMock: jasmine.SpyObj<RoutingService>;
  let globalMessageServiceMock: jasmine.SpyObj<GlobalMessageService>;
  let opfPaymentServiceMock: jasmine.SpyObj<OpfPaymentFacade>;
  let opfMetadataStoreServiceMock: jasmine.SpyObj<OpfMetadataStoreService>;
  let opfResourceLoaderServiceMock: jasmine.SpyObj<OpfResourceLoaderService>;
  let globalFunctionsServiceMock: jasmine.SpyObj<OpfGlobalFunctionsFacade>;

  beforeEach(() => {
    orderFacadeMock = jasmine.createSpyObj('OrderFacade', [
      'placePaymentAuthorizedOrder',
    ]);
    routingServiceMock = jasmine.createSpyObj('RoutingService', ['go']);
    globalMessageServiceMock = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    opfPaymentServiceMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'verifyPayment',
      'getAfterRedirectScripts',
    ]);
    opfMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['getOpfMetadataState']
    );
    opfResourceLoaderServiceMock = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      ['clearAllResources', 'executeScriptFromHtml', 'loadResources']
    );

    globalFunctionsServiceMock = jasmine.createSpyObj(
      'OpfGlobalFunctionsFacade',
      ['registerGlobalFunctions', 'unregisterGlobalFunctions']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfPaymentVerificationService,
        { provide: OrderFacade, useValue: orderFacadeMock },
        { provide: RoutingService, useValue: routingServiceMock },
        { provide: GlobalMessageService, useValue: globalMessageServiceMock },
        { provide: OpfPaymentFacade, useValue: opfPaymentServiceMock },
        {
          provide: OpfMetadataStoreService,
          useValue: opfMetadataStoreServiceMock,
        },
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
      queryParams: of({
        opfPaymentSessionId: mockPaymentSessionId,
        keyMock: 'valueMock',
      }),
    } as unknown as ActivatedRoute;

    it('should verify the result URL and return the response map without opfPaymentSessionId if the route cxRoute is "paymentVerificationResult"', (done) => {
      service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
        expect(result.paymentSessionId).toEqual(mockPaymentSessionId);
        expect(result.paramsMap).toEqual([
          {
            key: 'keyMock',
            value: 'valueMock',
          },
        ]);
        done();
      });
    });

    it('should return paymentSessionId from local storage if not in params', (done) => {
      const mockPaymentSessionId = 'sessionIdFromLocalStorage';
      const mockRouteSnapshot: ActivatedRoute = {
        routeConfig: {
          data: {
            cxRoute: 'paymentVerificationResult',
          },
        },
        queryParams: of({ opfAfterRedirectFlag: 'true' }),
      } as unknown as ActivatedRoute;

      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: mockPaymentSessionId,
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfMetadata)
      );

      service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
        expect(result.paymentSessionId).toEqual(mockPaymentSessionId);
        expect(result.paramsMap).toEqual([
          { key: 'opfAfterRedirectFlag', value: 'true' },
        ]);
        expect(result.afterRedirectScriptFlag).toEqual('true');
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
          expect(error.message).toEqual('opfPayment.errors.cancelPayment');
          done();
        }
      );
    });

    it('should throw an error if queryParams is undefined and paymentSessionId not in local storage', (done) => {
      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfMetadata)
      );

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
          expect(error.message).toEqual('opfPayment.errors.proceedPayment');
          done();
        }
      );
    });

    it('should throw an error if paymentSessionId is missing in url params and local storage', (done) => {
      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfMetadata)
      );

      const mockRoute: ActivatedRoute = {
        routeConfig: {
          data: {
            cxRoute: 'paymentVerificationResult',
          },
        },
        queryParams: of({ mockKey: 'testKey' }),
      } as unknown as ActivatedRoute;

      service.verifyResultUrl(mockRoute).subscribe(
        () => {},
        (error) => {
          expect(error).toBeDefined();
          expect(error.message).toEqual('opfPayment.errors.proceedPayment');
          done();
        }
      );
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

      const mockPlaceOrderResult: Order = { guid: 'placeOrderResult' };
      orderFacadeMock.placePaymentAuthorizedOrder.and.returnValue(
        of(mockPlaceOrderResult)
      );

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
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

      const mockPlaceOrderResult: Order = { guid: 'placeOrderResult' };
      orderFacadeMock.placePaymentAuthorizedOrder.and.returnValue(
        of(mockPlaceOrderResult)
      );

      opfPaymentServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(opfPaymentServiceMock.verifyPayment).toHaveBeenCalledWith(
            mockPaymentSessionId,
            { responseMap: mockResponseMap }
          );
          done();
        });
    });

    it('should throw an error with "opfPayment.errors.cancelPayment" if the result is CANCELLED', (done) => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.CANCELLED,
      };

      opfPaymentServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
        .subscribe(
          () => {},
          (error) => {
            expect(error.message).toEqual('opfPayment.errors.cancelPayment');
            done();
          }
        );
    });

    it('should throw an error with opfDefaultPaymentError if the result is not AUTHORIZED, DELAYED, or CANCELLED', (done) => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: 'ERROR',
      };

      opfPaymentServiceMock.verifyPayment.and.returnValue(
        of(mockVerificationResponse)
      );

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
        .subscribe(
          () => {},
          (error) => {
            expect(error).toEqual(service.opfDefaultPaymentError);
            done();
          }
        );
    });
  });

  describe('runHostedFieldsPattern', () => {
    const dynamicScriptMock: OpfDynamicScript = {
      cssUrls: [{ url: 'css url test', sri: 'css sri test' }],
      jsUrls: [{ url: 'js url test', sri: 'js sri test' }],
      html: 'html test',
    };

    it('should call renderAfterRedirectScripts', (done) => {
      opfPaymentServiceMock.getAfterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: dynamicScriptMock })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      opfResourceLoaderServiceMock.loadResources.and.returnValue(
        Promise.resolve()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();

      service
        .runHostedFieldsPattern(
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(opfResourceLoaderServiceMock.loadResources).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).toHaveBeenCalled();
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should not executeScriptFromHtml when no html snippet', (done) => {
      opfPaymentServiceMock.getAfterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: { dynamicScriptMock, html: undefined } })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      opfResourceLoaderServiceMock.loadResources.and.returnValue(
        Promise.resolve()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();

      service
        .runHostedFieldsPattern(
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(opfResourceLoaderServiceMock.loadResources).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).not.toHaveBeenCalled();
          expect(result).toBeFalsy();
          done();
        });
    });

    it('should failed when loadProviderResources fails', (done) => {
      opfPaymentServiceMock.getAfterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: { dynamicScriptMock, html: undefined } })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      opfResourceLoaderServiceMock.loadResources.and.returnValue(
        Promise.reject()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();

      service
        .runHostedFieldsPattern(
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(opfResourceLoaderServiceMock.loadResources).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).not.toHaveBeenCalled();
          expect(result).toBeFalsy();
          done();
        });
    });

    it('should throw error when missing afterRedirectScript property', (done) => {
      opfPaymentServiceMock.getAfterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: undefined })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      spyOn<any>(service, 'renderAfterRedirectScripts').and.returnValue(
        Promise.resolve(true)
      );

      service
        .runHostedFieldsPattern(
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe(
          () => {},
          (error) => {
            expect(error).toBeDefined();
            expect(error.message).toEqual('opfPayment.errors.proceedPayment');
            done();
          }
        );
    });
  });

  describe('removeResourcesAndGlobalFunctions', () => {
    it('should should call psp resource clearing service and remove global functions', (done) => {
      service.removeResourcesAndGlobalFunctions();
      expect(
        globalFunctionsServiceMock.unregisterGlobalFunctions
      ).toHaveBeenCalled();
      expect(opfResourceLoaderServiceMock.clearAllResources).toHaveBeenCalled();
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
        { key: 'opfPayment.errors.proceedPayment' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('checkIfProcessingCartIdExist', () => {
    it('should not do anything if the opfMetadata isPaymentInProgress is true', () => {
      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: '111111',
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfMetadata)
      );

      service.checkIfProcessingCartIdExist();

      expect(
        opfMetadataStoreServiceMock.getOpfMetadataState
      ).toHaveBeenCalled();
      expect(globalMessageServiceMock.add).not.toHaveBeenCalled();
      expect(routingServiceMock.go).not.toHaveBeenCalled();
    });

    it('should go to "cart" page and add global error message if the opfMetadata isPaymentInProgress is false', () => {
      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: false,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: '111111',
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of(mockOpfMetadata)
      );

      service.checkIfProcessingCartIdExist();

      expect(
        opfMetadataStoreServiceMock.getOpfMetadataState
      ).toHaveBeenCalled();
      expect(globalMessageServiceMock.add).toHaveBeenCalledWith(
        { key: 'httpHandlers.cartNotFound' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(routingServiceMock.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
  });
});
