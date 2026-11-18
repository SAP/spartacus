/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingConfigService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  OpfDynamicScript,
  OpfMetadataModel,
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { BehaviorSubject, of } from 'rxjs';
import { OpfPaymentFacade } from '../../facade';
import {
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymentVerificationUrlInput,
} from '../../model';

import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

describe('OpfPaymentVerificationService', () => {
  let service: OpfPaymentVerificationService;
  let orderFacadeMock: any;
  let routingServiceMock: any;
  let globalMessageServiceMock: any;
  let opfPaymentServiceMock: any;
  let opfMetadataStoreServiceMock: any;
  let opfResourceLoaderServiceMock: any;
  let globalFunctionsServiceMock: any;
  let windowRefMock: any;
  let sessionStorageMock: any;
  let routingConfigServiceMock: any;

  beforeEach(() => {
    orderFacadeMock = { placePaymentAuthorizedOrder: vi.fn() };
    routingServiceMock = { go: vi.fn() };
    globalMessageServiceMock = { add: vi.fn() };
    opfPaymentServiceMock = {
      verifyPayment: vi.fn(),
      getAfterRedirectScripts: vi.fn(),
      submitCompletePayment: vi.fn(),
    };
    const defaultMetadata: OpfMetadataModel = {
      termsAndConditionsChecked: false,
      selectedPaymentOptionId: undefined,
      isPaymentInProgress: false,
      opfPaymentSessionId: undefined,
      isTermsAndConditionsAlertClosed: false,
      is3DSRedirect: false,
      opf3DSRedirectReturnPath: undefined,
    };
    opfMetadataStoreServiceMock = {
      getOpfMetadataState: vi.fn(),
      updateOpfMetadata: vi.fn(),
      clearOpfMetadata: vi.fn(),
    };
    opfMetadataStoreServiceMock.opfMetadataState =
      new BehaviorSubject<OpfMetadataModel>(defaultMetadata);
    opfResourceLoaderServiceMock = {
      clearAllResources: vi.fn(),
      executeScriptFromHtml: vi.fn(),
      loadResources: vi.fn(),
    };

    globalFunctionsServiceMock = {
      registerGlobalFunctions: vi.fn(),
      unregisterGlobalFunctions: vi.fn(),
    };
    sessionStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    windowRefMock = {
      isBrowser: vi.fn().mockReturnValue(true),
      location: {
        search: '',
        pathname: '/opf/payment-verification-redirect/result',
      },
      sessionStorage: sessionStorageMock,
    } as any;
    routingConfigServiceMock = { getRouteConfig: vi.fn() };
    routingConfigServiceMock.getRouteConfig.mockImplementation(
      (routeName: string) => {
        if (routeName === 'paymentVerificationResult') {
          return { paths: ['opf/payment-verification-redirect/result'] };
        }
        if (routeName === 'paymentVerificationCancel') {
          return { paths: ['opf/payment-verification-redirect/cancel'] };
        }
        return undefined;
      }
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
        { provide: WindowRef, useValue: windowRefMock },
        {
          provide: RoutingConfigService,
          useValue: routingConfigServiceMock,
        },
      ],
    });

    service = TestBed.inject(OpfPaymentVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('captureRedirectQueryString', () => {
    it('should capture query string when pathname matches configured route path', () => {
      windowRefMock.location.pathname =
        '/electronics-spa/en/USD/opf/payment-verification-redirect/result';
      windowRefMock.location.search = '?score_rcode=1';

      service.captureRedirectQueryString();

      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'opfPaymentVerificationQuerySearch',
        '?score_rcode=1'
      );
    });

    it('should capture query string when route path is customized in config', () => {
      routingConfigServiceMock.getRouteConfig.mockImplementation(
        (routeName: string) => {
          if (routeName === 'paymentVerificationResult') {
            return { paths: ['custom-payment-verify/result'] };
          }
          return undefined;
        }
      );
      windowRefMock.location.pathname =
        '/electronics-spa/en/USD/custom-payment-verify/result';
      windowRefMock.location.search = '?score_rcode=1';

      service.captureRedirectQueryString();

      expect(sessionStorageMock.setItem).toHaveBeenCalled();
    });

    it('should not capture when pathname does not match configured route path', () => {
      windowRefMock.location.pathname = '/cart';
      windowRefMock.location.search = '?score_rcode=1';

      service.captureRedirectQueryString();

      expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
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

  describe('clearPaymentSessionForReinitiation', () => {
    it('should clear stored payment session metadata', () => {
      service.clearPaymentSessionForReinitiation();

      expect(
        opfMetadataStoreServiceMock.updateOpfMetadata
      ).toHaveBeenCalledWith({
        opfPaymentSessionId: undefined,
        opfPaymentSessionConfigurationId: undefined,
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

    beforeEach(() => {
      windowRefMock.isBrowser.mockReturnValue(true);
      windowRefMock.location.search = `?opfPaymentSessionId=${mockPaymentSessionId}&keyMock=valueMock`;
      sessionStorageMock.getItem.mockReturnValue(
        `?opfPaymentSessionId=${mockPaymentSessionId}&keyMock=valueMock`
      );
    });

    it('should verify the result URL and return the response map without opfPaymentSessionId if the route cxRoute is "paymentVerificationResult"', async () => {
      service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
        expect(result.paymentSessionId).toEqual(mockPaymentSessionId);
        expect(result.paramsMap).toEqual([
          {
            key: 'keyMock',
            value: 'valueMock',
          },
        ]);
      });
    });

    it('should preserve payment redirect params from captured query string', async () => {
      const originalSearch =
        '?opfPaymentSessionId=sessionId&score_rcode=1&score_ip_state=sc&decision_rcode=1&req_bill_to_address_state=CA&auth_code=831000';

      sessionStorageMock.getItem.mockReturnValue(originalSearch);
      windowRefMock.location.search =
        '?opfPaymentSessionId=sessionId&score_r&decision_rcode=1&score_ip_&req_bill_to_address_state=CA&auth_code=831000';

      service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
        expect(result.paramsMap).toEqual([
          { key: 'score_rcode', value: '1' },
          { key: 'score_ip_state', value: 'sc' },
          { key: 'decision_rcode', value: '1' },
          { key: 'req_bill_to_address_state', value: 'CA' },
          { key: 'auth_code', value: '831000' },
        ]);
      });
    });

    it('should return paymentSessionId from local storage if not in params', async () => {
      const mockPaymentSessionId = 'sessionIdFromLocalStorage';
      const mockRouteSnapshot: ActivatedRoute = {
        routeConfig: {
          data: {
            cxRoute: 'paymentVerificationResult',
          },
        },
        queryParams: of({
          [OpfPaymentVerificationUrlInput.OPF_AFTER_REDIRECT_SCRIPT_FLAG]:
            'true',
        }),
      } as unknown as ActivatedRoute;

      windowRefMock.location.search = `?${OpfPaymentVerificationUrlInput.OPF_AFTER_REDIRECT_SCRIPT_FLAG}=true`;
      sessionStorageMock.getItem.mockReturnValue(
        `?${OpfPaymentVerificationUrlInput.OPF_AFTER_REDIRECT_SCRIPT_FLAG}=true`
      );

      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: mockPaymentSessionId,
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
        of(mockOpfMetadata)
      );

      service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
        expect(result.paymentSessionId).toEqual(mockPaymentSessionId);
        expect(result.paramsMap).toEqual([
          {
            key: OpfPaymentVerificationUrlInput.OPF_AFTER_REDIRECT_SCRIPT_FLAG,
            value: 'true',
          },
        ]);
        expect(result.afterRedirectScriptFlag).toEqual('true');
      });
    });

    it('should throw an error if the route cxRoute is not "paymentVerificationResult"', async () => {
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
        }
      );
    });

    it('should throw an error if queryParams is undefined and paymentSessionId not in local storage', async () => {
      windowRefMock.isBrowser.mockReturnValue(false);

      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
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
        }
      );
    });

    it('should throw an error if paymentSessionId is missing in url params and local storage', async () => {
      windowRefMock.location.search = '?mockKey=testKey';
      sessionStorageMock.getItem.mockReturnValue('?mockKey=testKey');

      const mockOpfMetadata: OpfMetadataModel = {
        isPaymentInProgress: true,
        selectedPaymentOptionId: 111,
        termsAndConditionsChecked: true,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      };

      opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
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
        }
      );
    });
  });

  describe('verifyPayment', () => {
    it('should call opfCheckoutService.verifyPayment and return true if the result is AUTHORIZED', async () => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.AUTHORIZED,
      };

      opfPaymentServiceMock.verifyPayment.mockReturnValue(
        of(mockVerificationResponse)
      );

      const mockPlaceOrderResult: Order = { guid: 'placeOrderResult' };
      orderFacadeMock.placePaymentAuthorizedOrder.mockReturnValue(
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
        });
    });

    it('should call opfCheckoutService.verifyPayment and return true if the result is DELAYED', async () => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.DELAYED,
      };

      const mockPlaceOrderResult: Order = { guid: 'placeOrderResult' };
      orderFacadeMock.placePaymentAuthorizedOrder.mockReturnValue(
        of(mockPlaceOrderResult)
      );

      opfPaymentServiceMock.verifyPayment.mockReturnValue(
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
        });
    });

    it('should throw an error with "opfPayment.errors.cancelPayment" if the result is CANCELLED', async () => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: OpfPaymentVerificationResult.CANCELLED,
      };

      opfPaymentServiceMock.verifyPayment.mockReturnValue(
        of(mockVerificationResponse)
      );

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
        .subscribe(
          () => {},
          (error) => {
            expect(error.message).toEqual('opfPayment.errors.cancelPayment');
          }
        );
    });

    it('should throw an error with opfDefaultPaymentError if the result is not AUTHORIZED, DELAYED, or CANCELLED', async () => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap = [{ key: 'key', value: 'value' }];
      const mockVerificationResponse: OpfPaymentVerificationResponse = {
        result: 'ERROR',
      };

      opfPaymentServiceMock.verifyPayment.mockReturnValue(
        of(mockVerificationResponse)
      );

      service
        .runHostedPagePattern(mockPaymentSessionId, mockResponseMap)
        .subscribe(
          () => {},
          (error) => {
            expect(error).toEqual(service.opfDefaultPaymentError);
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

    it('should call renderAfterRedirectScripts', async () => {
      opfPaymentServiceMock.getAfterRedirectScripts.mockReturnValue(
        of({ afterRedirectScript: dynamicScriptMock })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.mockReturnValue();
      opfResourceLoaderServiceMock.loadResources.mockReturnValue(
        Promise.resolve()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.mockReturnValue();

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
        });
    });

    it('should not executeScriptFromHtml when no html snippet but still resolve true', async () => {
      opfPaymentServiceMock.getAfterRedirectScripts.mockReturnValue(
        of({ afterRedirectScript: { dynamicScriptMock, html: undefined } })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.mockReturnValue();
      opfResourceLoaderServiceMock.loadResources.mockReturnValue(
        Promise.resolve()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.mockReturnValue();

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
          expect(result).toBeTruthy();
        });
    });

    it('should failed when loadProviderResources fails', async () => {
      opfPaymentServiceMock.getAfterRedirectScripts.mockReturnValue(
        of({ afterRedirectScript: { dynamicScriptMock, html: undefined } })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.mockReturnValue();
      opfResourceLoaderServiceMock.loadResources.mockReturnValue(
        Promise.reject()
      );

      opfResourceLoaderServiceMock.executeScriptFromHtml.mockReturnValue();

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
        });
    });

    it('should throw error when missing afterRedirectScript property', async () => {
      opfPaymentServiceMock.getAfterRedirectScripts.mockReturnValue(
        of({ afterRedirectScript: undefined })
      );
      globalFunctionsServiceMock.registerGlobalFunctions.mockReturnValue();
      vi.spyOn<any>(service, 'renderAfterRedirectScripts').mockReturnValue(
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
          }
        );
    });
  });

  describe('removeResourcesAndGlobalFunctions', () => {
    it('should should call psp resource clearing service and remove global functions', async () => {
      service.removeResourcesAndGlobalFunctions();
      expect(
        globalFunctionsServiceMock.unregisterGlobalFunctions
      ).toHaveBeenCalled();
      expect(opfResourceLoaderServiceMock.clearAllResources).toHaveBeenCalled();
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

      opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
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

      opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
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

  describe('3DS Redirect Support', () => {
    const mockPaymentSessionId = '3ds-session-id';
    const mockReturnPath = '/checkout/payment-result';

    describe('get3DSRedirectState', () => {
      it('should return state when 3DS redirect is active', () => {
        opfMetadataStoreServiceMock.opfMetadataState.next({
          ...opfMetadataStoreServiceMock.opfMetadataState.value,
          is3DSRedirect: true,
          opfPaymentSessionId: mockPaymentSessionId,
          opf3DSRedirectReturnPath: mockReturnPath,
        });

        const result = (service as any).get3DSRedirectState();
        expect(result).toEqual({
          paymentSessionId: mockPaymentSessionId,
          returnPath: mockReturnPath,
        });
      });

      it('should return null when is3DSRedirect is false', () => {
        opfMetadataStoreServiceMock.opfMetadataState.next({
          ...opfMetadataStoreServiceMock.opfMetadataState.value,
          is3DSRedirect: false,
        });

        const result = (service as any).get3DSRedirectState();
        expect(result).toBeNull();
      });

      it('should return null when paymentSessionId is missing', () => {
        opfMetadataStoreServiceMock.opfMetadataState.next({
          ...opfMetadataStoreServiceMock.opfMetadataState.value,
          is3DSRedirect: true,
          opfPaymentSessionId: undefined,
        });

        const result = (service as any).get3DSRedirectState();
        expect(result).toBeNull();
      });
    });

    describe('verifyResultUrl with 3DS redirect', () => {
      it('should use stored payment session ID when 3DS redirect is active', async () => {
        opfMetadataStoreServiceMock.opfMetadataState.next({
          ...opfMetadataStoreServiceMock.opfMetadataState.value,
          is3DSRedirect: true,
          opfPaymentSessionId: mockPaymentSessionId,
          opf3DSRedirectReturnPath: mockReturnPath,
        });

        const mockRouteSnapshot: ActivatedRoute = {
          routeConfig: {
            data: {
              cxRoute: 'paymentVerificationResult',
            },
          },
          queryParams: of({}),
        } as unknown as ActivatedRoute;

        service.verifyResultUrl(mockRouteSnapshot).subscribe((result) => {
          expect(result.paymentSessionId).toEqual(mockPaymentSessionId);
          expect(result.is3DSRedirect).toBe(true);
        });
      });
    });
  });
});
