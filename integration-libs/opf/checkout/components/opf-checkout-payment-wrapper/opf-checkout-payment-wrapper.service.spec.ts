import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  FeatureConfigService,
  GlobalMessageService,
  RouterState,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  OpfDynamicScriptResourceType,
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE } from '@spartacus/opf/checkout/root';
import { getBrowserInfo } from '@spartacus/opf/payment/core';
import {
  OpfPaymentFacade,
  OpfPaymentRenderPattern,
  OpfPaymentSessionData,
} from '@spartacus/opf/payment/root';
import { OrderFacade } from '@spartacus/order/root';
import { of, throwError } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

const mockUrl = 'https://sap.com';
const mockPaymentOptionId = 123;
const mockOtpKey = 'otpKey';
const mockUserId = 'userId';
const mockCartId = 'cartId';

describe('OpfCheckoutPaymentWrapperService', () => {
  let service: OpfCheckoutPaymentWrapperService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let cartAccessCodeFacadeMock: jasmine.SpyObj<CartAccessCodeFacade>;
  let opfResourceLoaderServiceMock: jasmine.SpyObj<OpfResourceLoaderService>;
  let userIdServiceMock: jasmine.SpyObj<UserIdService>;
  let activeCartServiceMock: jasmine.SpyObj<ActiveCartFacade>;
  let routingServiceMock: jasmine.SpyObj<RoutingService>;
  let globalMessageServiceMock: jasmine.SpyObj<GlobalMessageService>;
  let orderFacadeMock: jasmine.SpyObj<OrderFacade>;
  let opfMetadataStoreServiceMock: jasmine.SpyObj<OpfMetadataStoreService>;
  let windowRefMock: jasmine.SpyObj<WindowRef>;
  let featureConfigServiceMock: jasmine.SpyObj<FeatureConfigService>;

  beforeEach(() => {
    opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'initiatePayment',
      'updatePaymentTransaction',
    ]);
    cartAccessCodeFacadeMock = jasmine.createSpyObj('CartAccessCodeFacade', [
      'getCartAccessCode',
    ]);
    opfResourceLoaderServiceMock = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      ['executeScriptFromHtml', 'clearAllResources', 'loadResources']
    );
    userIdServiceMock = jasmine.createSpyObj('UserIdService', ['getUserId']);
    activeCartServiceMock = jasmine.createSpyObj('ActiveCartFacade', [
      'getActiveCartId',
    ]);
    routingServiceMock = jasmine.createSpyObj('RoutingService', [
      'getRouterState',
      'go',
      'getFullUrl',
    ]);
    globalMessageServiceMock = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    orderFacadeMock = jasmine.createSpyObj('OrderFacade', [
      'placePaymentAuthorizedOrder',
    ]);
    opfMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['updateOpfMetadata']
    );
    windowRefMock = jasmine.createSpyObj('WindowRef', ['nativeWindow']);
    featureConfigServiceMock = jasmine.createSpyObj('FeatureConfigService', [
      'isEnabled',
    ]);
    featureConfigServiceMock.isEnabled.and.returnValue(false);

    routingServiceMock.getRouterState.and.returnValue(
      of({
        state: {
          semanticRoute: 'checkoutReviewOrder',
        },
      } as RouterState)
    );

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutPaymentWrapperService,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: CartAccessCodeFacade, useValue: cartAccessCodeFacadeMock },
        {
          provide: OpfResourceLoaderService,
          useValue: opfResourceLoaderServiceMock,
        },
        { provide: UserIdService, useValue: userIdServiceMock },
        { provide: ActiveCartFacade, useValue: activeCartServiceMock },
        { provide: RoutingService, useValue: routingServiceMock },
        { provide: GlobalMessageService, useValue: globalMessageServiceMock },
        { provide: OrderFacade, useValue: orderFacadeMock },
        {
          provide: OpfMetadataStoreService,
          useValue: opfMetadataStoreServiceMock,
        },
        {
          provide: WindowRef,
          useValue: windowRefMock,
        },
        {
          provide: FeatureConfigService,
          useValue: featureConfigServiceMock,
        },
      ],
    });

    service = TestBed.inject(OpfCheckoutPaymentWrapperService);
  });

  it('should retrieve renderPaymentMethodEvent$', (done) => {
    const mockRenderPaymentMethodEvent = { isLoading: false, isError: false };
    service['renderPaymentMethodEvent$'].next(mockRenderPaymentMethodEvent);

    service.getRenderPaymentMethodEvent().subscribe((event) => {
      expect(event).toEqual(mockRenderPaymentMethodEvent);
      done();
    });
  });

  it('should initiate payment successfully and render payment gateway', (done) => {
    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
      dynamicScript: {
        html: '<html></html>',
        jsUrls: [
          {
            url: 'script.js',
            type: OpfDynamicScriptResourceType.SCRIPT,
          },
        ],
        cssUrls: [
          {
            url: 'styles.css',
            type: OpfDynamicScriptResourceType.STYLES,
          },
        ],
      },
    };

    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      of(mockPaymentSessionData)
    );
    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: mockOtpKey })
    );
    userIdServiceMock.getUserId.and.returnValue(of(mockUserId));
    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockCartId));
    routingServiceMock.getRouterState.and.returnValue(
      of({ state: { semanticRoute: 'checkoutReviewOrder' } } as RouterState)
    );
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);
    opfMetadataStoreServiceMock.updateOpfMetadata.and.stub();
    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.resolve()
    );
    spyOn(service, 'renderPaymentGateway').and.callThrough();
    spyOn<any>(service, 'storePaymentSessionId');

    service.initiatePayment(mockPaymentOptionId).subscribe(() => {
      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalledWith({
        otpKey: mockOtpKey,
        config: {
          configurationId: mockPaymentOptionId.toString(),
          resultURL: mockUrl,
          cancelURL: mockUrl,
          browserInfo: getBrowserInfo(windowRefMock.nativeWindow),
        },
      });

      expect(opfResourceLoaderServiceMock.loadResources).toHaveBeenCalledWith(
        [
          {
            url: 'script.js',
            type: OpfDynamicScriptResourceType.SCRIPT,
          },
        ],
        [
          {
            url: 'styles.css',
            type: OpfDynamicScriptResourceType.STYLES,
          },
        ],
        mockPaymentOptionId,
        {
          html: '<html></html>',
          jsUrls: [
            {
              url: 'script.js',
              type: OpfDynamicScriptResourceType.SCRIPT,
            },
          ],
          cssUrls: [
            {
              url: 'styles.css',
              type: OpfDynamicScriptResourceType.STYLES,
            },
          ],
        }
      );

      expect(service.renderPaymentGateway).toHaveBeenCalledWith({
        pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
        dynamicScript: {
          html: '<html></html>',
          jsUrls: [
            {
              url: 'script.js',
              type: OpfDynamicScriptResourceType.SCRIPT,
            },
          ],
          cssUrls: [
            {
              url: 'styles.css',
              type: OpfDynamicScriptResourceType.STYLES,
            },
          ],
        },
      });

      expect((service as any).storePaymentSessionId).toHaveBeenCalled();

      done();
    });
  });

  it('should handle when payment initiation fails with 409 error', (done) => {
    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      throwError(() => ({ status: 409 }))
    );

    orderFacadeMock.placePaymentAuthorizedOrder.and.returnValue(of({}));
    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: mockOtpKey })
    );
    userIdServiceMock.getUserId.and.returnValue(of(mockUserId));
    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockCartId));
    routingServiceMock.getRouterState.and.returnValue(
      of({ state: { semanticRoute: 'checkoutReviewOrder' } } as RouterState)
    );
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);
    opfMetadataStoreServiceMock.updateOpfMetadata.and.stub();
    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.resolve()
    );
    spyOn(service, 'renderPaymentGateway').and.callThrough();

    service.initiatePayment(mockPaymentOptionId).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBe('Payment already done');
        done();
      },
    });
  });

  it('should handle when payment initiation fails with 500 error', (done) => {
    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      throwError(() => ({ status: 500 }))
    );

    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: mockOtpKey })
    );
    userIdServiceMock.getUserId.and.returnValue(of(mockUserId));
    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockCartId));
    routingServiceMock.getRouterState.and.returnValue(
      of({ state: { semanticRoute: 'checkoutReviewOrder' } } as RouterState)
    );
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);
    opfMetadataStoreServiceMock.updateOpfMetadata.and.stub();
    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.resolve()
    );
    spyOn(service, 'renderPaymentGateway').and.callThrough();

    service.initiatePayment(mockPaymentOptionId).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBe('Payment failed');
        expect(globalMessageServiceMock.add).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should handle when payment initiation fails with 401 error', (done) => {
    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      throwError(() => ({ status: 401 }))
    );

    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: mockOtpKey })
    );
    userIdServiceMock.getUserId.and.returnValue(of(mockUserId));
    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockCartId));
    routingServiceMock.getRouterState.and.returnValue(
      of({ state: { semanticRoute: 'checkoutReviewOrder' } } as RouterState)
    );
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);
    opfMetadataStoreServiceMock.updateOpfMetadata.and.stub();
    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.resolve()
    );

    service.initiatePayment(mockPaymentOptionId).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBe('Payment failed');
        expect(globalMessageServiceMock.add).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should reload payment mode', () => {
    const mockPaymentOptionId = 123;
    spyOn(service, 'initiatePayment').and.callThrough();
    userIdServiceMock.getUserId.and.returnValue(of());
    activeCartServiceMock.getActiveCartId.and.returnValue(of());
    service['lastPaymentOptionId'] = mockPaymentOptionId;

    service.reloadPaymentMode();

    expect(service.initiatePayment).toHaveBeenCalledWith(mockPaymentOptionId);
  });

  it('should render payment gateway with destination URL', () => {
    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.FULL_PAGE,
      destination: { url: mockUrl, form: [] },
    };

    service['renderPaymentGateway'](mockPaymentSessionData);

    expect(service['renderPaymentMethodEvent$'].value).toEqual({
      isLoading: false,
      isError: false,
      renderType: OpfPaymentRenderPattern.FULL_PAGE,
      destination: { url: mockUrl, form: [] },
      paymentOptionId: undefined,
    });
  });

  it('should handle paymentSessionId', () => {
    const mockPaymentSessionId = 'mockPaymentSessionId';
    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.FULL_PAGE,
      paymentSessionId: mockPaymentSessionId,
    };
    (service as any).storePaymentSessionId(
      mockPaymentSessionData,
      false,
      String(mockPaymentOptionId)
    );
    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith({
      opfPaymentSessionId: mockPaymentSessionId,
      opfPaymentSessionConfigurationId: String(mockPaymentOptionId),
    });

    mockPaymentSessionData.pattern = OpfPaymentRenderPattern.HOSTED_FIELDS;
    (service as any).storePaymentSessionId(mockPaymentSessionData);
    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith({
      opfPaymentSessionId: undefined,
      opfPaymentSessionConfigurationId: undefined,
    });
  });

  it('should return stored paymentSessionId only for matching configurationId', () => {
    (opfMetadataStoreServiceMock as any).opfMetadataState = {
      value: {
        opfPaymentSessionId: 'stored-session',
        opfPaymentSessionConfigurationId: '123',
      },
    };

    expect((service as any).getStoredPaymentSessionId('123')).toEqual(
      'stored-session'
    );
    expect((service as any).getStoredPaymentSessionId('999')).toBeUndefined();
    expect((service as any).getStoredPaymentSessionId()).toBeUndefined();
  });

  it('should initiate and store a new session when stored configurationId does not match', (done) => {
    (opfMetadataStoreServiceMock as any).opfMetadataState = {
      value: {
        opfPaymentSessionId: 'stored-session',
        opfPaymentSessionConfigurationId: '123',
      },
    };

    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      of({ paymentSessionId: 'new-session' })
    );

    (service as any)
      .getOrCreatePaymentSessionId({
        config: {
          configurationId: '999',
        },
      })
      .subscribe((paymentSessionId: string) => {
        expect(paymentSessionId).toEqual('new-session');
        expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
        expect(
          opfMetadataStoreServiceMock.updateOpfMetadata
        ).toHaveBeenCalledWith({
          opfPaymentSessionId: 'new-session',
          opfPaymentSessionConfigurationId: '999',
        });
        done();
      });
  });

  it('should render payment gateway with a hidden form and submit button', () => {
    const mockFormData = [
      {
        name: 'test_key',
        value: 'test_value',
      },
      {
        name: 'test_key_2',
        value: 'test_value_2',
      },
    ];

    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.IFRAME,
      destination: {
        url: mockUrl,
        form: mockFormData,
      },
    };

    service['renderPaymentGateway'](mockPaymentSessionData);

    expect(service['renderPaymentMethodEvent$'].value).toEqual({
      isLoading: false,
      isError: false,
      renderType: OpfPaymentRenderPattern.IFRAME,
      destination: { url: mockUrl, form: mockFormData },
      paymentOptionId: undefined,
    });
  });

  it('should render payment gateway with dynamic script', (done) => {
    const mockPaymentOptionId = 123;
    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
      dynamicScript: {
        html: '<html></html>',
        jsUrls: [
          {
            url: 'script.js',
            type: OpfDynamicScriptResourceType.SCRIPT,
          },
        ],
        cssUrls: [
          {
            url: 'styles.css',
            type: OpfDynamicScriptResourceType.STYLES,
          },
        ],
      },
    };

    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.resolve()
    );

    // Set the lastPaymentOptionId to simulate the payment initiation
    service['lastPaymentOptionId'] = mockPaymentOptionId;

    service['renderPaymentGateway'](mockPaymentSessionData);

    expect(opfResourceLoaderServiceMock.loadResources).toHaveBeenCalledWith(
      [
        {
          url: 'script.js',
          type: OpfDynamicScriptResourceType.SCRIPT,
        },
      ],
      [
        {
          url: 'styles.css',
          type: OpfDynamicScriptResourceType.STYLES,
        },
      ],
      mockPaymentOptionId,
      {
        html: '<html></html>',
        jsUrls: [
          {
            url: 'script.js',
            type: OpfDynamicScriptResourceType.SCRIPT,
          },
        ],
        cssUrls: [
          {
            url: 'styles.css',
            type: OpfDynamicScriptResourceType.STYLES,
          },
        ],
      }
    );

    setTimeout(() => {
      expect(service['renderPaymentMethodEvent$'].value).toEqual({
        isLoading: false,
        isError: false,
        renderType: OpfPaymentRenderPattern.HOSTED_FIELDS,
        html: '<html></html>',
        paymentOptionId: mockPaymentOptionId,
      });
      done();
    });
  });

  it('should handle place order success', () => {
    service['onPlaceOrderSuccess']();
    expect(service['routingService'].go).toHaveBeenCalledWith({
      cxRoute: 'orderConfirmation',
    });
  });

  it('should set payment initiation config', () => {
    const mockOtpKey = 'otpKey';
    const mockPaymentOptionId = 123;
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);

    const config = service['getPaymentInitiationConfig'](
      mockOtpKey,
      mockPaymentOptionId,
      getBrowserInfo(windowRefMock.nativeWindow)
    );

    expect(config).toEqual({
      otpKey: mockOtpKey,
      config: {
        configurationId: mockPaymentOptionId.toString(),
        resultURL: mockUrl,
        cancelURL: mockUrl,
        browserInfo: getBrowserInfo(windowRefMock.nativeWindow),
      },
    });
  });

  it('should execute script from HTML', fakeAsync(() => {
    const mockHtml = '<script>console.log("Executing script");</script>';

    routingServiceMock.getRouterState.and.returnValue(
      of({
        state: { semanticRoute: OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE },
      } as RouterState)
    );
    opfResourceLoaderServiceMock.executeScriptFromHtml.and.stub();

    service['executeScriptFromHtml'](mockHtml);

    expect(routingServiceMock.getRouterState).toHaveBeenCalled();

    tick(500);
    expect(
      opfResourceLoaderServiceMock.executeScriptFromHtml
    ).toHaveBeenCalledWith(mockHtml);
  }));

  it('should call the necessary methods on an error', () => {
    service['onPlaceOrderError']();

    expect(service['routingService'].go).toHaveBeenCalledWith({
      cxRoute: OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE,
    });
  });

  it('should not call updatePaymentTransaction on first initiate when feature is enabled', (done) => {
    featureConfigServiceMock.isEnabled.and.returnValue(true);

    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
    };

    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      of(mockPaymentSessionData)
    );
    opfPaymentFacadeMock.updatePaymentTransaction.and.returnValue(
      of(mockPaymentSessionData)
    );
    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: mockOtpKey })
    );
    userIdServiceMock.getUserId.and.returnValue(of(mockUserId));
    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockCartId));
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);
    (opfMetadataStoreServiceMock as any).opfMetadataState = {
      value: {
        opfPaymentSessionId: undefined,
        opfPaymentSessionConfigurationId: undefined,
      },
    };
    spyOn(service, 'renderPaymentGateway').and.stub();

    service.initiatePayment(mockPaymentOptionId).subscribe(() => {
      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(
        opfPaymentFacadeMock.updatePaymentTransaction
      ).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call updatePaymentTransaction when matching stored session exists and feature is enabled', (done) => {
    featureConfigServiceMock.isEnabled.and.returnValue(true);

    const mockPaymentSessionData: OpfPaymentSessionData = {
      pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
    };

    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      of(mockPaymentSessionData)
    );
    opfPaymentFacadeMock.updatePaymentTransaction.and.returnValue(
      of(mockPaymentSessionData)
    );
    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: mockOtpKey })
    );
    userIdServiceMock.getUserId.and.returnValue(of(mockUserId));
    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockCartId));
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);
    (opfMetadataStoreServiceMock as any).opfMetadataState = {
      value: {
        opfPaymentSessionId: 'stored-session',
        opfPaymentSessionConfigurationId: String(mockPaymentOptionId),
      },
    };
    spyOn(service, 'renderPaymentGateway').and.stub();

    service.initiatePayment(mockPaymentOptionId).subscribe(() => {
      expect(
        opfPaymentFacadeMock.updatePaymentTransaction
      ).toHaveBeenCalledWith({
        paymentSessionId: 'stored-session',
        otpKey: mockOtpKey,
        config: {
          browserInfo: getBrowserInfo(windowRefMock.nativeWindow),
        },
      });
      done();
    });
  });

  describe('removePaymentProviderResources', () => {
    it('should clear all loaded payment resources', () => {
      service.removePaymentProviderResources();

      expect(opfResourceLoaderServiceMock.clearAllResources).toHaveBeenCalled();
    });
  });
});
