import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BaseSiteService,
  ImageType,
  LanguageService,
  PageType,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingProducts } from './../model/merchandising.products.model';
import { CdsMerchandisingProductService } from './cds-merchandising-product.service';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';

const MERCHANDISING_PRODUCTS_METADATA: Map<string, string> = new Map<
  string,
  string
>();
MERCHANDISING_PRODUCTS_METADATA.set(
  'test-metadata-field',
  'test-metadata-value'
);
const MERCHANDISING_PRODUCTS: MerchandisingProducts = {
  products: [
    {
      code: 'test-product-id',
      name: 'test-product',
      price: {
        formattedValue: '20.99',
        value: 20.99,
      },
      images: {
        PRIMARY: {
          product: {
            url: 'http://some-main-image-url',
            format: 'product',
            imageType: ImageType.PRIMARY,
          },
        },
      },
    },
  ],
  metadata: MERCHANDISING_PRODUCTS_METADATA,
};

class MockStrategyConnector {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(MERCHANDISING_PRODUCTS));
}
class MockBaseSiteService {
  getActive = createSpy('baseSiteService.getActive').and.callFake(() =>
    of('electronics-spa')
  );
}
class MockLanguageService {
  getActive = createSpy('languageService.getActive').and.callFake(() =>
    of('en')
  );
}

describe('CdsMerchandisingProductService', () => {
  let cdsMerchandisingPrductService: CdsMerchandisingProductService;
  let strategyConnector: MerchandisingStrategyConnector;
  let routingService: jasmine.SpyObj<RoutingService>;

  beforeEach(() => {
    const routingServiceSpy = jasmine.createSpyObj('RoutingService', [
      'getRouterState',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MerchandisingStrategyConnector,
          useClass: MockStrategyConnector,
        },
        {
          provide: BaseSiteService,
          useClass: MockBaseSiteService,
        },
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: RoutingService,
          useValue: routingServiceSpy,
        },
      ],
    });
    cdsMerchandisingPrductService = TestBed.get(
      CdsMerchandisingProductService as Type<CdsMerchandisingProductService>
    );
    strategyConnector = TestBed.get(MerchandisingStrategyConnector as Type<
      MerchandisingStrategyConnector
    >);
    routingService = TestBed.get(RoutingService);
  });

  it('should be created', () => {
    expect(cdsMerchandisingPrductService).toBeTruthy();
  });

  it('loadProductsForStrategy should call connector', () => {
    const strategyRequest = {
      site: 'electronics-spa',
      language: 'en',
      pageSize: 10,
      productId: undefined,
    };
    const router = {
      state: {
        url: '/',
        queryParams: {},
        params: {},
        context: { id: '1', type: PageType.PRODUCT_PAGE },
        cmsRequired: false,
      },
      navigationId: 1,
    };

    routingService.getRouterState.and.returnValue(of(router));
    let actualMerchandisingProducts: MerchandisingProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();
    expect(actualMerchandisingProducts).toEqual(MERCHANDISING_PRODUCTS);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });

  it('should retrieve the product Id from the state send this in the StrategyRequest to the StrategyConnector', () => {
    const strategyRequest = {
      site: 'electronics-spa',
      language: 'en',
      pageSize: 10,
      productId: '123456',
    };
    const router = {
      state: {
        url: '/',
        queryParams: {},
        params: { productCode: '123456' },
        context: { id: '1', type: PageType.PRODUCT_PAGE },
        cmsRequired: false,
      },
      navigationId: 1,
    };

    routingService.getRouterState.and.returnValue(of(router));
    let actualMerchandisingProducts: MerchandisingProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();
    expect(actualMerchandisingProducts).toEqual(MERCHANDISING_PRODUCTS);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });
});
