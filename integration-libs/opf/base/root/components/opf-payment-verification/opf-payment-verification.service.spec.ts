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

    it('should throw an error if paymentSessionId is missing', (done) => {
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
          expect(error.message).toEqual('opf.payment.errors.proceedPayment');
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
      opfOrderFacadeMock.placeOpfOrder.and.returnValue(
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
      opfOrderFacadeMock.placeOpfOrder.and.returnValue(
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

    it('should throw an error with "opf.payment.errors.cancelPayment" if the result is CANCELLED', (done) => {
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

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
        .subscribe(
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
      opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
        Promise.resolve()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();

      service
        .runHostedFieldsPattern(
          TargetPage.RESULT,
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(
            opfResourceLoaderServiceMock.loadProviderResources
          ).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).toHaveBeenCalled();
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should not executeScriptFromHtml when no html snippet', (done) => {
      opfPaymentServiceMock.afterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: { dynamicScriptMock, html: undefined } })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
        Promise.resolve()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();

      service
        .runHostedFieldsPattern(
          TargetPage.RESULT,
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(
            opfResourceLoaderServiceMock.loadProviderResources
          ).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).not.toHaveBeenCalled();
          expect(result).toBeFalsy();
          done();
        });
    });

    it('should failed when loadProviderResources fails', (done) => {
      opfPaymentServiceMock.afterRedirectScripts.and.returnValue(
        of({ afterRedirectScript: { dynamicScriptMock, html: undefined } })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.and.returnValue();
      opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
        Promise.reject()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();

      service
        .runHostedFieldsPattern(
          TargetPage.RESULT,
          'paymentSessionIdTest',
          {} as ViewContainerRef,
          [{ key: 'key test', value: 'value test' }]
        )
        .subscribe((result) => {
          expect(
            opfResourceLoaderServiceMock.loadProviderResources
          ).toHaveBeenCalled();
          expect(
            opfResourceLoaderServiceMock.executeScriptFromHtml
          ).not.toHaveBeenCalled();
          expect(result).toBeFalsy();
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
