import { TestBed } from '@angular/core/testing';
import { CmsService, Page, Product, QueryState } from '@spartacus/core';
import {
  ActiveConfiguration,
  CtaScriptsResponse,
  OpfPaymentFacade,
  OpfPaymentProviderType,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

describe('OpfCtaScriptsService', () => {
  let service: OpfCtaScriptsService;
  let orderFacadeMock: jasmine.SpyObj<OrderFacade>;
  let orderHistoryFacadeMock: jasmine.SpyObj<OrderHistoryFacade>;
  let opfResourceLoaderServiceMock: jasmine.SpyObj<OpfResourceLoaderService>;
  let cmsServiceMock: jasmine.SpyObj<CmsService>;
  let currentProductMock: jasmine.SpyObj<CurrentProductService>;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  beforeEach(() => {
    orderFacadeMock = jasmine.createSpyObj('OrderFacade', ['getOrderDetails']);
    orderHistoryFacadeMock = jasmine.createSpyObj('OrderHistoryFacade', [
      'getOrderDetails',
    ]);
    opfResourceLoaderServiceMock = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      [
        'executeScriptFromHtml',
        'loadProviderResources',
        'clearAllProviderResources',
      ]
    );
    cmsServiceMock = jasmine.createSpyObj('CmsService', ['getCurrentPage']);
    currentProductMock = jasmine.createSpyObj('CurrentProductService', [
      'getProduct',
    ]);
    opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'getCtaScripts',
      'getActiveConfigurationsState',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfCtaScriptsService,
        { provide: OrderFacade, useValue: orderFacadeMock },
        { provide: OrderHistoryFacade, useValue: orderHistoryFacadeMock },
        {
          provide: OpfResourceLoaderService,
          useValue: opfResourceLoaderServiceMock,
        },
        { provide: CmsService, useValue: cmsServiceMock },
        { provide: CurrentProductService, useValue: currentProductMock },
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
      ],
    });
    service = TestBed.inject(OpfCtaScriptsService);

    orderFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));
    orderHistoryFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));

    opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();
    opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
      Promise.resolve()
    );
    currentProductMock.getProduct.and.returnValue(of(mockProduct));
    cmsServiceMock.getCurrentPage.and.returnValue(of(mockPage));
    opfPaymentFacadeMock.getActiveConfigurationsState.and.returnValue(
      of(activeConfigurationsMock)
    );
    opfPaymentFacadeMock.getCtaScripts.and.returnValue(
      of(ctaScriptsresponseMock)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call orderHistoryFacade for CTA on ConfirmationPage', (done) => {
    service.getCtaHtmlslList().subscribe((htmlsList) => {
      console.log('htmlsList', htmlsList);
      expect(htmlsList[0]).toContain(
        'Thanks for purchasing our great products'
      );
      expect(orderHistoryFacadeMock.getOrderDetails).not.toHaveBeenCalled();
      expect(orderFacadeMock.getOrderDetails).toHaveBeenCalled();
      done();
    });
  });

  it('should call OrderFacade for CTA on PDP', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'order' })
    );

    service.getCtaHtmlslList().subscribe((htmlsList) => {
      console.log('htmlsList', htmlsList);
      expect(htmlsList[0]).toContain(
        'Thanks for purchasing our great products'
      );
      expect(orderHistoryFacadeMock.getOrderDetails).toHaveBeenCalled();
      expect(orderFacadeMock.getOrderDetails).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call currentProductService for CTA on PDP', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'productDetails' })
    );

    service.getCtaHtmlslList().subscribe((htmlsList) => {
      console.log('htmlsList', htmlsList);
      expect(htmlsList[0]).toContain(
        'Thanks for purchasing our great products'
      );
      expect(currentProductMock.getProduct).toHaveBeenCalled();
      expect(orderFacadeMock.getOrderDetails).not.toHaveBeenCalled();
      done();
    });
  });

  it('should throw an error when empty CTA scripts response from OPF server', (done) => {
    opfPaymentFacadeMock.getCtaScripts.and.returnValue(of({ value: [] }));

    service.getCtaHtmlslList().subscribe({
      error: (error) => {
        expect(error).toEqual('Invalid CTA Scripts Response');

        done();
      },
    });
  });

  it('should throw an error when empty ScriptLocation is invalid', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'testPage' })
    );

    service.getCtaHtmlslList().subscribe({
      error: (error) => {
        expect(error).toEqual('Invalid Script Location');

        done();
      },
    });
  });

  it('should not load html snippet when its associated resource files fail to load', (done) => {
    opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(
      Promise.reject()
    );

    service.getCtaHtmlslList().subscribe({
      next: (htmlsList) => {
        expect(htmlsList.length).toEqual(0);

        done();
      },
    });
  });

  it('should not load html snippet when html returned from server is empty ', (done) => {
    opfPaymentFacadeMock.getCtaScripts.and.returnValue(
      of({
        ...ctaScriptsresponseMock,
        value: [
          {
            ...ctaScriptsresponseMock.value[0],
            dynamicScript: {
              ...ctaScriptsresponseMock.value[0].dynamicScript,
              html: '',
            },
          },
        ],
      })
    );

    service.getCtaHtmlslList().subscribe({
      next: (htmlsList) => {
        expect(htmlsList.length).toEqual(0);
        done();
      },
    });
  });

  it('should remove all script tags from html snippet', (done) => {
    opfPaymentFacadeMock.getCtaScripts.and.returnValue(
      of({
        ...ctaScriptsresponseMock,
        value: [
          {
            ...ctaScriptsresponseMock.value[0],
            dynamicScript: {
              ...ctaScriptsresponseMock.value[0].dynamicScript,
              html: "<div><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log('CTA Script #1 is running')</script><script>console.log('CTA Script #2 is running')</script>",
            },
          },
        ],
      })
    );

    service.getCtaHtmlslList().subscribe({
      next: (htmlsList) => {
        expect(htmlsList[0]).not.toContain('<script>');
        done();
      },
    });
  });

  const ctaScriptsresponseMock: CtaScriptsResponse = {
    value: [
      {
        paymentAccountId: 1,
        dynamicScript: {
          html: '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #1 is running\')</script>',
          cssUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.css',
              sri: '',
            },
          ],
          jsUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.js',
              sri: '',
            },
          ],
        },
      },
    ],
  };

  const activeConfigurationsMock: QueryState<
    ActiveConfiguration[] | undefined
  > = {
    loading: false,
    error: false,
    data: [
      {
        id: 14,
        providerType: OpfPaymentProviderType.PAYMENT_METHOD,
        merchantId: 'SAP OPF',
        displayName: 'Crypto with BitPay',
      },
    ],
  };

  const mockPage: Page = {
    pageId: 'orderConfirmationPage',
  };

  const mockProduct: Product = {
    name: 'mockProduct',
    code: 'code1',
    stock: {
      stockLevel: 333,
      stockLevelStatus: 'inStock',
    },
  };

  const mockOrder: Order = {
    code: 'mockOrder',
    entries: [
      {
        product: {
          code: '11',
        },
        quantity: 1,
      },
      {
        product: {
          code: '22',
        },
        quantity: 1,
      },
    ],
  };
});
