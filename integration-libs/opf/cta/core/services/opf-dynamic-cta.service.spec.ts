import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CurrencyService,
  EventService,
  LanguageService,
  Product,
  WindowRef,
} from '@spartacus/core';
import { OpfCtaFacade, OpfCtaScriptsLocation } from '@spartacus/opf/cta/root';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfDynamicCtaService } from './opf-dynamic-cta.service';

describe('OpfDynamicCtaService', () => {
  let service: OpfDynamicCtaService;
  let globalFunctionsFacadeMock: any;
  let eventServiceMock: any;
  let currencyServiceMock: any;
  let languageServiceMock: any;
  let activeCartFacadeMock: any;
  let opfCtaFacadeMock: any;
  let currentProductServiceMock: any;

  beforeEach(() => {
    // Prevent external link navigation
    window.onbeforeunload = function () {
      return '';
    };
    globalFunctionsFacadeMock = { registerGlobalFunctions: vi.fn(), unregisterGlobalFunctions: vi.fn() };

    eventServiceMock = { get: vi.fn() };

    currencyServiceMock = { getActive: vi.fn() };
    languageServiceMock = { getActive: vi.fn() };
    opfCtaFacadeMock = { listenScriptReadyEvent: vi.fn() };
    currentProductServiceMock = { getProduct: vi.fn() };
    activeCartFacadeMock = { takeActive: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        WindowRef,
        OpfDynamicCtaService,
        {
          provide: OpfGlobalFunctionsFacade,
          useValue: globalFunctionsFacadeMock,
        },
        { provide: EventService, useValue: eventServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: ActiveCartFacade, useValue: activeCartFacadeMock },
        { provide: LanguageService, useValue: languageServiceMock },
        { provide: OpfCtaFacade, useValue: opfCtaFacadeMock },
        { provide: CurrentProductService, useValue: currentProductServiceMock },
      ],
    });
    service = TestBed.inject(OpfDynamicCtaService);
    currencyServiceMock.getActive.mockReturnValue(of(mockCurrency));
    languageServiceMock.getActive.mockReturnValue(of(mockLanguage));
    eventServiceMock.get.mockReturnValue(of(true));
    opfCtaFacadeMock.listenScriptReadyEvent.mockReturnValue(of(mockScriptId));
    globalFunctionsFacadeMock.registerGlobalFunctions.mockReturnValue();
    globalFunctionsFacadeMock.unregisterGlobalFunctions.mockReturnValue();
    currentProductServiceMock.getProduct.mockReturnValue(of(mockProduct));
    activeCartFacadeMock.takeActive.mockReturnValue(of(mockCart));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call activeCart on fillCtaRequestforCartPage', async () => {
    service
      .fillCtaRequestforCartPage(
        OpfCtaScriptsLocation.CART_MESSAGING,
        mockAccountIds
      )
      .subscribe((ctaRequest) => {
        expect(activeCartFacadeMock.takeActive).toHaveBeenCalled();
        expect(languageServiceMock.getActive).toHaveBeenCalled();
        expect(ctaRequest.scriptLocations).toEqual([
          OpfCtaScriptsLocation.CART_MESSAGING,
        ]);      });
  });

  it('should call productService on fillCtaRequestforProductPage', async () => {
    service
      .fillCtaRequestforProductPage(
        OpfCtaScriptsLocation.PDP_MESSAGING,
        mockAccountIds
      )
      .subscribe((ctaRequest) => {
        expect(currentProductServiceMock.getProduct).toHaveBeenCalled();
        expect(languageServiceMock.getActive).toHaveBeenCalled();
        expect(ctaRequest.scriptLocations).toEqual([
          OpfCtaScriptsLocation.PDP_MESSAGING,
        ]);
        expect(
          ctaRequest.additionalData?.find(
            (keyVal) => keyVal.key === 'scriptIdentifier'
          )?.value
        ).toEqual(mockScriptId);      });
  });

  it('should start cartListener on cart page initiateEvents', async () => {
    service
      .fillCtaRequestforCartPage(
        OpfCtaScriptsLocation.CART_MESSAGING,
        mockAccountIds
      )
      .subscribe(() => {
        service.initiateEvents();
        expect(eventServiceMock.get).toHaveBeenCalled();      });
  });

  it('should not start cartListener on pdp initiateEvents', async () => {
    service
      .fillCtaRequestforProductPage(
        OpfCtaScriptsLocation.PDP_MESSAGING,
        mockAccountIds
      )
      .subscribe(() => {
        service.initiateEvents();
        expect(eventServiceMock.get).not.toHaveBeenCalled();      });
  });

  it('should register ScriptReadyEvent global function', () => {
    service.registerScriptReadyEvent();
    expect(
      globalFunctionsFacadeMock.registerGlobalFunctions
    ).toHaveBeenCalled();
  });

  it('should remove global functions on stopEvents', async () => {
    service
      .fillCtaRequestforProductPage(
        OpfCtaScriptsLocation.CART_MESSAGING,
        mockAccountIds
      )
      .subscribe(() => {
        service.initiateEvents();
        service.stopEvents();
        expect(
          globalFunctionsFacadeMock.unregisterGlobalFunctions
        ).toHaveBeenCalled();      });
  });

  const mockAccountIds = [51, 22];
  const mockScriptId = '0001';

  const mockLanguage = 'en';
  const mockCurrency = 'UDS';

  const mockProduct: Product = {
    name: 'mockProduct',
    code: 'code1',
    stock: {
      stockLevel: 333,
      stockLevelStatus: 'inStock',
    },
  };

  const mockCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    entries: [
      { entryNumber: 0, product: { code: '1234' } },
      { entryNumber: 1, product: { code: '01234' } },
      { entryNumber: 2, product: { code: '3234' } },
    ],
    totalPrice: {
      currencyIso: 'USD',
      value: 100,
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      value: 0,
    },
    user: { uid: 'test' },
  };
});
