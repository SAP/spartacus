import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
  let orderFacadeMock: any;
  let orderHistoryFacadeMock: any;
  let opfResourceLoaderServiceMock: any;
  let cmsServiceMock: any;
  let currentProductMock: any;
  let opfBaseFacadeMock: any;
  let opfCtaFacadeMock: any;
  let opfDynamicCtaServiceMock: any;
  let opfStaticCtaServiceMock: any;
  beforeEach(() => {
    orderFacadeMock = { getOrderDetails: vi.fn() };
    orderHistoryFacadeMock = { getOrderDetails: vi.fn() };
    opfResourceLoaderServiceMock = {
      executeScriptFromHtml: vi.fn(),
      loadResources: vi.fn(),
      clearAllResources: vi.fn(),
    };
    cmsServiceMock = { getCurrentPage: vi.fn() };
    currentProductMock = { getProduct: vi.fn() };
    opfBaseFacadeMock = { getActiveConfigurationsState: vi.fn() };
    opfCtaFacadeMock = { getCtaScripts: vi.fn() };
    opfDynamicCtaServiceMock = {
      initiateEvents: vi.fn(),
      stopEvents: vi.fn(),
      fillCtaRequestforCartPage: vi.fn(),
      fillCtaRequestforProductPage: vi.fn(),
      registerScriptReadyEvent: vi.fn(),
    };
    opfStaticCtaServiceMock = { fillCtaRequestforPagesWithOrder: vi.fn() };

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
    opfStaticCtaServiceMock.fillCtaRequestforPagesWithOrder.mockReturnValue(
      of(ctaScriptsRequestForOrderMock)
    );
    opfDynamicCtaServiceMock.fillCtaRequestforProductPage.mockReturnValue(
      of(ctaScriptsRequestForPdpMock)
    );
    opfDynamicCtaServiceMock.fillCtaRequestforCartPage.mockReturnValue(
      of(ctaScriptsRequestForCartPageMock)
    );
    opfDynamicCtaServiceMock.initiateEvents.mockReturnValue();
    opfDynamicCtaServiceMock.stopEvents.mockReturnValue();
    opfDynamicCtaServiceMock.registerScriptReadyEvent.mockReturnValue();
    orderFacadeMock.getOrderDetails.mockReturnValue(of(mockOrder));
    orderHistoryFacadeMock.getOrderDetails.mockReturnValue(of(mockOrder));

    opfResourceLoaderServiceMock.executeScriptFromHtml.mockReturnValue();
    opfResourceLoaderServiceMock.loadResources.mockReturnValue(
      Promise.resolve()
    );
    currentProductMock.getProduct.mockReturnValue(of(mockProduct));
    cmsServiceMock.getCurrentPage.mockReturnValue(of(mockPage));
    opfBaseFacadeMock.getActiveConfigurationsState.mockReturnValue(
      of(activeConfigurationsMock)
    );
    opfCtaFacadeMock.getCtaScripts.mockReturnValue(of(ctaScriptsResponseMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call opfStaticCtaService for CTA on ConfirmationPage', async () => {
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
    });
  });

  it('should call StaticCtaService for CTA on order page', async () => {
    cmsServiceMock.getCurrentPage.mockReturnValue(
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
    });
  });

  it('should call DynamicCtaService for CTA on PDP', async () => {
    cmsServiceMock.getCurrentPage.mockReturnValue(
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
    });
  });

  it('should call DynamicCtaService for CTA on Cart page', async () => {
    cmsServiceMock.getCurrentPage.mockReturnValue(
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
    });
  });

  it('should throw an error when empty CTA scripts response from OPF server', async () => {
    opfCtaFacadeMock.getCtaScripts.mockReturnValue(of({ value: [] }));

    service.getCtaHtmlList().subscribe({
      error: (error) => {
        expect(error).toEqual('Invalid CTA Scripts Response');
      },
    });
  });

  it('should throw an error when ScriptLocation is invalid', async () => {
    cmsServiceMock.getCurrentPage.mockReturnValue(
      of({ ...mockPage, pageId: 'testPage' })
    );

    service.getCtaHtmlList().subscribe({
      next: () => {
        fail('Invalid script should fail');
      },
      error: (error) => {
        expect(error).toEqual('Invalid Script Location');
      },
    });
  });

  it('should throw an error when empty ScriptLocation', async () => {
    cmsServiceMock.getCurrentPage.mockReturnValue(
      of({ ...mockPage, pageId: undefined })
    );

    service.getCtaHtmlList().subscribe({
      next: () => {
        fail('Empty script should fail');
      },
      error: (error) => {
        expect(error).toEqual('Invalid Script Location');
      },
    });
  });

  it('should execute script from script response html', async () => {
    service.loadAndRunScript(dynamicScriptMock).then((scriptResponse) => {
      expect(
        opfResourceLoaderServiceMock.executeScriptFromHtml
      ).toHaveBeenCalled();
      expect(scriptResponse?.html).toEqual(dynamicScriptMock.html);
    });
  });

  it('should not execute script when html from script response is empty', async () => {
    service
      .loadAndRunScript({ ...dynamicScriptMock, html: '' })
      .then((scriptResponse) => {
        expect(
          opfResourceLoaderServiceMock.executeScriptFromHtml
        ).not.toHaveBeenCalled();
        expect(scriptResponse).toBeFalsy();
      });
  });

  it('should not execute script when resource loading failed', async () => {
    opfResourceLoaderServiceMock.loadResources.mockReturnValue(
      Promise.reject()
    );
    service
      .loadAndRunScript({ ...dynamicScriptMock, html: '' })
      .then((scriptResponse) => {
        expect(
          opfResourceLoaderServiceMock.executeScriptFromHtml
        ).not.toHaveBeenCalled();
        expect(scriptResponse).toBeFalsy();
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
