import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  RouterState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  OpfDynamicScriptResourceType,
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { of, throwError } from 'rxjs';

import { OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE } from '@spartacus/opf/checkout/root';
import {
  OpfPaymentFacade,
  PaymentPattern,
  PaymentSessionData,
} from '@spartacus/opf/payment/root';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

const mockUrl = 'https://sap.com';

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

  beforeEach(() => {
    opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'initiatePayment',
    ]);
    cartAccessCodeFacadeMock = jasmine.createSpyObj('CartAccessCodeFacade', [
      'getCartAccessCode',
    ]);
    opfResourceLoaderServiceMock = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      [
        'executeScriptFromHtml',
        'clearAllProviderResources',
        'loadProviderResources',
      ]
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
    const mockPaymentOptionId = 123;
    const mockOtpKey = 'otpKey';
    const mockUserId = 'userId';
    const mockCartId = 'cartId';
    const mockPaymentSessionData: PaymentSessionData = {
      pattern: PaymentPattern.HOSTED_FIELDS,
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
    opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
      Promise.resolve()
    );
    spyOn(service, 'renderPaymentGateway').and.callThrough();
    spyOn<any>(service, 'storePaymentSessionId');

    service.initiatePayment(mockPaymentOptionId).subscribe(() => {
      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalledWith({
        otpKey: mockOtpKey,
        config: {
          configurationId: mockPaymentOptionId.toString(),
          cartId: mockCartId,
          resultURL: mockUrl,
          cancelURL: mockUrl,
        },
      });

      expect(
        opfResourceLoaderServiceMock.loadProviderResources
      ).toHaveBeenCalledWith(
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
        ]
      );

      expect(service.renderPaymentGateway).toHaveBeenCalledWith({
        pattern: PaymentPattern.HOSTED_FIELDS,
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
    const mockPaymentOptionId = 123;
    const mockOtpKey = 'otpKey';
    const mockUserId = 'userId';
    const mockCartId = 'cartId';

    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      throwError({ status: 409 })
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
    opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
      Promise.resolve()
    );
    spyOn(service, 'renderPaymentGateway').and.callThrough();

    service.initiatePayment(mockPaymentOptionId).subscribe(
      () => {},
      (error) => {
        expect(error).toBe('Payment already done');
        done();
      }
    );
  });

  it('should handle when payment initiation fails with 500 error', (done) => {
    const mockPaymentOptionId = 123;
    const mockOtpKey = 'otpKey';
    const mockUserId = 'userId';
    const mockCartId = 'cartId';

    opfPaymentFacadeMock.initiatePayment.and.returnValue(
      throwError({ status: 500 })
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
    opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
      Promise.resolve()
    );
    spyOn(service, 'renderPaymentGateway').and.callThrough();

    service.initiatePayment(mockPaymentOptionId).subscribe(
      () => {},
      (error) => {
        expect(error).toBe('Payment failed');
        expect(globalMessageServiceMock.add).toHaveBeenCalled();
        done();
      }
    );
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
    const mockPaymentSessionData: PaymentSessionData = {
      pattern: PaymentPattern.FULL_PAGE,
      destination: { url: mockUrl, form: [] },
    };

    service['renderPaymentGateway'](mockPaymentSessionData);

    expect(service['renderPaymentMethodEvent$'].value).toEqual({
      isLoading: false,
      isError: false,
      renderType: PaymentPattern.FULL_PAGE,
      data: mockUrl,
      destination: { url: mockUrl, form: [] },
    });
  });

  it('should handle paymentSessionId', () => {
    const mockPaymentSessionId = 'mockPaymentSessionId';
    const mockPaymentSessionData: PaymentSessionData = {
      pattern: PaymentPattern.FULL_PAGE,
      paymentSessionId: mockPaymentSessionId,
    };
    (service as any).storePaymentSessionId(mockPaymentSessionData);
    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith({
      paymentSessionId: mockPaymentSessionId,
    });

    mockPaymentSessionData.pattern = PaymentPattern.HOSTED_FIELDS;
    (service as any).storePaymentSessionId(mockPaymentSessionData);
    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith({
      paymentSessionId: undefined,
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

    const mockPaymentSessionData: PaymentSessionData = {
      pattern: PaymentPattern.IFRAME,
      destination: {
        url: mockUrl,
        form: mockFormData,
      },
    };

    service['renderPaymentGateway'](mockPaymentSessionData);

    expect(service['renderPaymentMethodEvent$'].value).toEqual({
      isLoading: false,
      isError: false,
      renderType: PaymentPattern.IFRAME,
      data: mockUrl,
      destination: { url: mockUrl, form: mockFormData },
    });
  });

  it('should render payment gateway with dynamic script', (done) => {
    const mockPaymentSessionData: PaymentSessionData = {
      pattern: PaymentPattern.HOSTED_FIELDS,
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

    opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
      Promise.resolve()
    );

    service['renderPaymentGateway'](mockPaymentSessionData);

    expect(
      opfResourceLoaderServiceMock.loadProviderResources
    ).toHaveBeenCalledWith(
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
      ]
    );

    setTimeout(() => {
      expect(service['renderPaymentMethodEvent$'].value).toEqual({
        isLoading: false,
        isError: false,
        renderType: PaymentPattern.HOSTED_FIELDS,
        data: '<html></html>',
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
    const mockActiveCartId = 'cartId';
    service['activeCartId'] = mockActiveCartId;
    routingServiceMock.getFullUrl.and.returnValue(mockUrl);

    activeCartServiceMock.getActiveCartId.and.returnValue(of(mockActiveCartId));

    const config = service['setPaymentInitiationConfig'](
      mockOtpKey,
      mockPaymentOptionId
    );

    expect(config).toEqual({
      otpKey: mockOtpKey,
      config: {
        configurationId: mockPaymentOptionId.toString(),
        cartId: mockActiveCartId,
        resultURL: mockUrl,
        cancelURL: mockUrl,
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
});
