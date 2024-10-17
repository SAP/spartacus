import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CurrencyService,
  EventService,
  LanguageService,
  Product,
  WindowRef,
} from '@spartacus/core';
import { CtaScriptsLocation, OpfCtaFacade } from '@spartacus/opf/cta/root';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfDynamicCtaService } from './opf-dynamic-cta.service';

describe('OpfDynamicCtaService', () => {
  let service: OpfDynamicCtaService;
  let globalFunctionsFacadeMock: jasmine.SpyObj<OpfGlobalFunctionsFacade>;
  let eventServiceMock: jasmine.SpyObj<EventService>;
  let currencyServiceMock: jasmine.SpyObj<CurrencyService>;
  let languageServiceMock: jasmine.SpyObj<LanguageService>;
  let activeCartFacadeMock: jasmine.SpyObj<ActiveCartFacade>;
  let opfCtaFacadeMock: jasmine.SpyObj<OpfCtaFacade>;
  let currentProductServiceMock: jasmine.SpyObj<CurrentProductService>;

  beforeEach(() => {
    // Prevent external link navigation
    window.onbeforeunload = function () {
      return '';
    };
    globalFunctionsFacadeMock = jasmine.createSpyObj('GlobalFunctionsFacade', [
      'registerGlobalFunctions',
      'removeGlobalFunctions',
    ]);

    eventServiceMock = jasmine.createSpyObj('EventService', ['get']);

    currencyServiceMock = jasmine.createSpyObj('CurrencyService', [
      'getActive',
    ]);
    languageServiceMock = jasmine.createSpyObj('LanguageService', [
      'getActive',
    ]);
    opfCtaFacadeMock = jasmine.createSpyObj('OpfCtaFacade', [
      'listenScriptReadyEvent',
    ]);
    currentProductServiceMock = jasmine.createSpyObj('CurrentProductService', [
      'getProduct',
    ]);
    activeCartFacadeMock = jasmine.createSpyObj('ActiveCartFacade', [
      'takeActive',
    ]);

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
    currencyServiceMock.getActive.and.returnValue(of(mockCurrency));
    languageServiceMock.getActive.and.returnValue(of(mockLanguage));
    eventServiceMock.get.and.returnValue(of(true));
    opfCtaFacadeMock.listenScriptReadyEvent.and.returnValue(of(mockScriptId));
    globalFunctionsFacadeMock.registerGlobalFunctions.and.returnValue();
    globalFunctionsFacadeMock.removeGlobalFunctions.and.returnValue();
    currentProductServiceMock.getProduct.and.returnValue(of(mockProduct));
    activeCartFacadeMock.takeActive.and.returnValue(of(mockCart));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call activeCart on fillCtaRequestforCartPage', (done) => {
    service
      .fillCtaRequestforCartPage(
        CtaScriptsLocation.CART_MESSAGING,
        mockAccountIds
      )
      .subscribe((ctaRequest) => {
        expect(activeCartFacadeMock.takeActive).toHaveBeenCalled();
        expect(languageServiceMock.getActive).toHaveBeenCalled();
        expect(ctaRequest.scriptLocations).toEqual([
          CtaScriptsLocation.CART_MESSAGING,
        ]);
        done();
      });
  });

  it('should call productService on fillCtaRequestforProductPage', (done) => {
    service
      .fillCtaRequestforProductPage(
        CtaScriptsLocation.PDP_MESSAGING,
        mockAccountIds
      )
      .subscribe((ctaRequest) => {
        expect(currentProductServiceMock.getProduct).toHaveBeenCalled();
        expect(languageServiceMock.getActive).toHaveBeenCalled();
        expect(ctaRequest.scriptLocations).toEqual([
          CtaScriptsLocation.PDP_MESSAGING,
        ]);
        expect(
          ctaRequest.additionalData?.find(
            (keyVal) => keyVal.key === 'scriptIdentifier'
          )?.value
        ).toEqual(mockScriptId);
        done();
      });
  });

  it('should start cartListener on cart page initiateEvents', (done) => {
    service
      .fillCtaRequestforCartPage(
        CtaScriptsLocation.CART_MESSAGING,
        mockAccountIds
      )
      .subscribe(() => {
        service.initiateEvents();
        expect(eventServiceMock.get).toHaveBeenCalled();
        done();
      });
  });

  it('should not start cartListener on pdp initiateEvents', (done) => {
    service
      .fillCtaRequestforProductPage(
        CtaScriptsLocation.PDP_MESSAGING,
        mockAccountIds
      )
      .subscribe(() => {
        service.initiateEvents();
        expect(eventServiceMock.get).not.toHaveBeenCalled();
        done();
      });
  });

  it('should register ScriptReadyEvent global function', () => {
    service.registerScriptReadyEvent();
    expect(
      globalFunctionsFacadeMock.registerGlobalFunctions
    ).toHaveBeenCalled();
  });

  it('should remove global functions on stopEvents', (done) => {
    service
      .fillCtaRequestforProductPage(
        CtaScriptsLocation.CART_MESSAGING,
        mockAccountIds
      )
      .subscribe(() => {
        service.initiateEvents();
        service.stopEvents();
        expect(
          globalFunctionsFacadeMock.removeGlobalFunctions
        ).toHaveBeenCalled();

        done();
      });
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
