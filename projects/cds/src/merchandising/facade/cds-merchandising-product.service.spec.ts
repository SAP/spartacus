import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { StrategyProducts } from '../model/strategy-products.model';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingSiteContext } from './../model/merchandising-site-context.model';
import { MerchandisingUserContext } from './../model/merchandising-user-context.model';
import { CdsMerchandisingProductService } from './cds-merchandising-product.service';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import createSpy = jasmine.createSpy;

const STRATEGY_ID = 'test-strategy-id';

const strategyProducts: StrategyProducts = {
  products: [
    {
      id: 'test-product-id',
    },
  ],
  metadata: {
    'test-metadata-field': 'test-metadata-value',
  },
};

const siteContext: MerchandisingSiteContext = {
  site: 'electronics-spa',
  language: 'en',
};

class MockStrategyConnector {
  loadProductsForStrategy = createSpy(
    'StrategyAdapter.loadProductsForStrategy'
  ).and.callFake(() => of(strategyProducts));
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
      category: '574',
    };
    const userContext: MerchandisingUserContext = {
      category: '574',
    };
    spyOn(siteContextService, 'getSiteContext').and.returnValue(
      of(siteContext)
    );
    spyOn(userContextService, 'getUserContext').and.returnValue(
      of(userContext)
    );

    let actualStartegyProducts: StrategyProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(productsForStrategy => {
        actualStartegyProducts = productsForStrategy;
      })
      .unsubscribe();
    expect(actualStartegyProducts).toEqual(strategyProducts);
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
      products: ['123456'],
    };

    spyOn(siteContextService, 'getSiteContext').and.returnValue(
      of(siteContext)
    );
    spyOn(userContextService, 'getUserContext').and.returnValue(
      of({ products: ['123456'] })
    );

    let actualStrategyProducts: StrategyProducts;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe(productsForStrategy => {
        actualStrategyProducts = productsForStrategy;
      })
      .unsubscribe();
    expect(actualStrategyProducts).toEqual(strategyProducts);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });
});
