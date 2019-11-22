import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageType } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { MerchandisingProducts } from '../model/merchandising-products.model';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingSiteContext } from './../model/merchandising-site-context.model';
import { MerchandisingUserContext } from './../model/merchandising-user-context.model';
import { CdsMerchandisingProductService } from './cds-merchandising-product.service';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';

const merchandisingProductsMetadata: Map<string, string> = new Map<
  string,
  string
>();
merchandisingProductsMetadata.set('test-metadata-field', 'test-metadata-value');
const merchandisingProducts: MerchandisingProducts = {
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
  metadata: merchandisingProductsMetadata,
};
const siteContext: MerchandisingSiteContext = {
  site: 'electronics-spa',
  language: 'en',
};

class MockStrategyConnector {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(merchandisingProducts));
}

class SiteContextServiceStub {
  getSiteContext(): Observable<MerchandisingSiteContext> {
    return of();
  }
}
class UserContextServiceStub {
  getUserContext(): Observable<MerchandisingUserContext> {
    return of();
  }
}

describe('CdsMerchandisingProductService', () => {
  let cdsMerchandisingPrductService: CdsMerchandisingProductService;
  let strategyConnector: MerchandisingStrategyConnector;
  let siteContextService: CdsMerchandisingSiteContextService;
  let userContextService: CdsMerchandisingUserContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MerchandisingStrategyConnector,
          useClass: MockStrategyConnector,
        },
        {
          provide: CdsMerchandisingUserContextService,
          useClass: UserContextServiceStub,
        },
        {
          provide: CdsMerchandisingSiteContextService,
          useClass: SiteContextServiceStub,
        },
      ],
    });
    cdsMerchandisingPrductService = TestBed.get(
      CdsMerchandisingProductService as Type<CdsMerchandisingProductService>
    );
    strategyConnector = TestBed.get(MerchandisingStrategyConnector as Type<
      MerchandisingStrategyConnector
    >);
    siteContextService = TestBed.get(CdsMerchandisingSiteContextService as Type<
      CdsMerchandisingSiteContextService
    >);
    userContextService = TestBed.get(CdsMerchandisingUserContextService as Type<
      CdsMerchandisingUserContextService
    >);
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
      category: '574',
      facets: undefined,
    };
    const userContext: MerchandisingUserContext = {
      categoryCode: '574',
    };
    spyOn(siteContextService, 'getSiteContext').and.returnValue(
      of(siteContext)
    );
    spyOn(userContextService, 'getUserContext').and.returnValue(
      of(userContext)
    );

    let actualMerchandisingProducts: MerchandisingProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();
    expect(actualMerchandisingProducts).toEqual(merchandisingProducts);
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
      category: undefined,
      facets: undefined,
    };

    spyOn(siteContextService, 'getSiteContext').and.returnValue(
      of(siteContext)
    );
    spyOn(userContextService, 'getUserContext').and.returnValue(
      of({ productCode: '123456' })
    );

    let actualMerchandisingProducts: MerchandisingProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(strategyResult => {
        actualMerchandisingProducts = strategyResult;
      })
      .unsubscribe();
    expect(actualMerchandisingProducts).toEqual(merchandisingProducts);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });
});
