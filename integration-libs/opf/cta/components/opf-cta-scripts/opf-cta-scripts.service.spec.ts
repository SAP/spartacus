import { TestBed } from '@angular/core/testing';
import { CmsService, Page, Product, QueryState } from '@spartacus/core';
import {
  OpfActiveConfigurationsResponse,
  OpfBaseFacade,
  OpfDynamicScript,
  OpfPaymentProviderType,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import {
  OpfDynamicCtaService,
  OpfStaticCtaService,
} from '@spartacus/opf/cta/core';
import {
  OpfCtaFacade,
  OpfCtaScriptsLocation,
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

const ctaScriptsRequestForOrderMock: OpfCtaScriptsRequest = {
  paymentAccountIds: [1],
  scriptLocations: [OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE],
};
const ctaScriptsRequestForPdpMock: OpfCtaScriptsRequest = {
  paymentAccountIds: [1],
  scriptLocations: [OpfCtaScriptsLocation.PDP_MESSAGING],
};
const ctaScriptsRequestForCartPageMock: OpfCtaScriptsRequest = {
  paymentAccountIds: [1],
  scriptLocations: [OpfCtaScriptsLocation.CART_MESSAGING],
};

describe('OpfCtaScriptsService', () => {
  let service: OpfCtaScriptsService;
  let orderFacadeMock: jasmine.SpyObj<OrderFacade>;
  let orderHistoryFacadeMock: jasmine.SpyObj<OrderHistoryFacade>;
  let opfResourceLoaderServiceMock: jasmine.SpyObj<OpfResourceLoaderService>;
  let cmsServiceMock: jasmine.SpyObj<CmsService>;
  let currentProductMock: jasmine.SpyObj<CurrentProductService>;
  let opfBaseFacadeMock: jasmine.SpyObj<OpfBaseFacade>;
  let opfCtaFacadeMock: jasmine.SpyObj<OpfCtaFacade>;
  let opfDynamicCtaServiceMock: jasmine.SpyObj<OpfDynamicCtaService>;
  let opfStaticCtaServiceMock: jasmine.SpyObj<OpfStaticCtaService>;
  beforeEach(() => {
    orderFacadeMock = jasmine.createSpyObj('OrderFacade', ['getOrderDetails']);
    orderHistoryFacadeMock = jasmine.createSpyObj('OrderHistoryFacade', [
      'getOrderDetails',
    ]);
    opfResourceLoaderServiceMock = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      ['executeScriptFromHtml', 'loadResources', 'clearAllResources']
    );
    cmsServiceMock = jasmine.createSpyObj('CmsService', ['getCurrentPage']);
    currentProductMock = jasmine.createSpyObj('CurrentProductService', [
      'getProduct',
    ]);
    opfBaseFacadeMock = jasmine.createSpyObj('OpfBaseFacade', [
      'getActiveConfigurationsState',
    ]);
    opfCtaFacadeMock = jasmine.createSpyObj('OpfCtaFacade', ['getCtaScripts']);
    opfDynamicCtaServiceMock = jasmine.createSpyObj('OpfDynamicCtaService', [
      'initiateEvents',
      'stopEvents',
      'fillCtaRequestforCartPage',
      'fillCtaRequestforProductPage',
      'registerScriptReadyEvent',
    ]);
    opfStaticCtaServiceMock = jasmine.createSpyObj('OpfStaticCtaService', [
      'fillCtaRequestforPagesWithOrder',
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
        { provide: OpfBaseFacade, useValue: opfBaseFacadeMock },
        { provide: OpfCtaFacade, useValue: opfCtaFacadeMock },
        { provide: OpfDynamicCtaService, useValue: opfDynamicCtaServiceMock },
        { provide: OpfStaticCtaService, useValue: opfStaticCtaServiceMock },
      ],
    });
    service = TestBed.inject(OpfCtaScriptsService);
    opfStaticCtaServiceMock.fillCtaRequestforPagesWithOrder.and.returnValue(
      of(ctaScriptsRequestForOrderMock)
    );
    opfDynamicCtaServiceMock.fillCtaRequestforProductPage.and.returnValue(
      of(ctaScriptsRequestForPdpMock)
    );
    opfDynamicCtaServiceMock.fillCtaRequestforCartPage.and.returnValue(
      of(ctaScriptsRequestForCartPageMock)
    );
    opfDynamicCtaServiceMock.initiateEvents.and.returnValue();
    opfDynamicCtaServiceMock.stopEvents.and.returnValue();
    opfDynamicCtaServiceMock.registerScriptReadyEvent.and.returnValue();
    orderFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));
    orderHistoryFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));

    opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();
    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.resolve()
    );
    currentProductMock.getProduct.and.returnValue(of(mockProduct));
    cmsServiceMock.getCurrentPage.and.returnValue(of(mockPage));
    opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
      of(activeConfigurationsMock)
    );
    opfCtaFacadeMock.getCtaScripts.and.returnValue(of(ctaScriptsResponseMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call opfStaticCtaService for CTA on ConfirmationPage', (done) => {
    service.getCtaHtmlList().subscribe((htmlsList) => {
      expect(htmlsList[0].html).toContain(
        'Thanks for purchasing our great products'
      );
      expect(
        opfDynamicCtaServiceMock.registerScriptReadyEvent
      ).not.toHaveBeenCalled();
      expect(
        opfStaticCtaServiceMock.fillCtaRequestforPagesWithOrder
      ).toHaveBeenCalled();
      done();
    });
  });

  it('should call StaticCtaService for CTA on order page', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'order' })
    );

    service.getCtaHtmlList().subscribe((htmlsList) => {
      expect(htmlsList[0].html).toContain(
        'Thanks for purchasing our great products'
      );
      expect(
        opfDynamicCtaServiceMock.registerScriptReadyEvent
      ).not.toHaveBeenCalled();
      expect(
        opfStaticCtaServiceMock.fillCtaRequestforPagesWithOrder
      ).toHaveBeenCalled();
      done();
    });
  });

  it('should call DynamicCtaService for CTA on PDP', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'productDetails' })
    );

    service.getCtaHtmlList().subscribe((htmlsList) => {
      expect(htmlsList[0].html).toContain(
        'Thanks for purchasing our great products'
      );
      expect(
        opfDynamicCtaServiceMock.registerScriptReadyEvent
      ).toHaveBeenCalled();
      expect(
        opfDynamicCtaServiceMock.fillCtaRequestforProductPage
      ).toHaveBeenCalled();
      done();
    });
  });

  it('should call DynamicCtaService for CTA on Cart page', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'cartPage' })
    );

    service.getCtaHtmlList().subscribe((htmlsList) => {
      expect(htmlsList[0].html).toContain(
        'Thanks for purchasing our great products'
      );
      expect(
        opfDynamicCtaServiceMock.registerScriptReadyEvent
      ).toHaveBeenCalled();
      expect(
        opfDynamicCtaServiceMock.fillCtaRequestforCartPage
      ).toHaveBeenCalled();
      done();
    });
  });

  it('should throw an error when empty CTA scripts response from OPF server', (done) => {
    opfCtaFacadeMock.getCtaScripts.and.returnValue(of({ value: [] }));

    service.getCtaHtmlList().subscribe({
      error: (error) => {
        expect(error).toEqual('Invalid CTA Scripts Response');

        done();
      },
    });
  });

  it('should throw an error when ScriptLocation is invalid', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: 'testPage' })
    );

    service.getCtaHtmlList().subscribe({
      next: () => {
        fail('Invalid script should fail');
        done();
      },
      error: (error) => {
        expect(error).toEqual('Invalid Script Location');
        done();
      },
    });
  });

  it('should throw an error when empty ScriptLocation', (done) => {
    cmsServiceMock.getCurrentPage.and.returnValue(
      of({ ...mockPage, pageId: undefined })
    );

    service.getCtaHtmlList().subscribe({
      next: () => {
        fail('Empty script should fail');
        done();
      },
      error: (error) => {
        expect(error).toEqual('Invalid Script Location');
        done();
      },
    });
  });

  it('should execute script from script response html', (done) => {
    service.loadAndRunScript(dynamicScriptMock).then((scriptResponse) => {
      expect(
        opfResourceLoaderServiceMock.executeScriptFromHtml
      ).toHaveBeenCalled();
      expect(scriptResponse?.html).toEqual(dynamicScriptMock.html);
      done();
    });
  });

  it('should not execute script when html from script response is empty', (done) => {
    service
      .loadAndRunScript({ ...dynamicScriptMock, html: '' })
      .then((scriptResponse) => {
        expect(
          opfResourceLoaderServiceMock.executeScriptFromHtml
        ).not.toHaveBeenCalled();
        expect(scriptResponse).toBeFalsy();
        done();
      });
  });

  it('should not execute script when resource loading failed', (done) => {
    opfResourceLoaderServiceMock.loadResources.and.returnValue(
      Promise.reject()
    );
    service
      .loadAndRunScript({ ...dynamicScriptMock, html: '' })
      .then((scriptResponse) => {
        expect(
          opfResourceLoaderServiceMock.executeScriptFromHtml
        ).not.toHaveBeenCalled();
        expect(scriptResponse).toBeFalsy();
        done();
      });
  });

  const dynamicScriptMock: OpfDynamicScript = {
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
  };

  const ctaScriptsResponseMock: OpfCtaScriptsResponse = {
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
    OpfActiveConfigurationsResponse | undefined
  > = {
    loading: false,
    error: false,
    data: {
      value: [
        {
          id: 14,
          providerType: OpfPaymentProviderType.PAYMENT_METHOD,
          merchantId: 'SAP OPF',
          displayName: 'Crypto with BitPay',
        },
      ],
    },
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
    paymentInfo: {
      id: 'mockPaymentInfoId',
    },
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
