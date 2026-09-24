import { TestBed } from '@angular/core/testing';
import {
  CdsMerchandisingProductService,
  CdsMerchandisingSiteContextService,
  CdsMerchandisingUserContextService,
  MerchandisingSiteContext,
  MerchandisingStrategyConnector,
  MerchandisingUserContext,
  StrategyProducts,
  StrategyResponse,
} from '@spartacus/cds';
import { EMPTY, Observable, of } from 'rxjs';
import { vi } from 'vitest';

const CONSENT_REFERENCE = '75b75543-950f-4e53-a36c-ab8737a0974a';
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
  loadProductsForStrategy = vi
    .fn()
    .mockImplementation(() => of(strategyProducts));
}

class SiteContextServiceStub {
  getSiteContext(): Observable<MerchandisingSiteContext> {
    return EMPTY;
  }
}
class UserContextServiceStub {
  getUserContext(): Observable<MerchandisingUserContext> {
    return EMPTY;
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
    cdsMerchandisingPrductService = TestBed.inject(
      CdsMerchandisingProductService
    );
    strategyConnector = TestBed.inject(MerchandisingStrategyConnector);
    siteContextService = TestBed.inject(CdsMerchandisingSiteContextService);
    userContextService = TestBed.inject(CdsMerchandisingUserContextService);
  });

  it('should be created', () => {
    expect(cdsMerchandisingPrductService).toBeTruthy();
  });

  it('loadProductsForStrategy should call connector', () => {
    const strategyRequest = {
      queryParams: {
        site: 'electronics-spa',
        language: 'en',
        products: undefined,
        facets: undefined,
        category: '574',
        pageSize: 10,
        searchPhrase: undefined,
      },
      headers: {
        consentReference: undefined,
      },
    };
    const userContext: MerchandisingUserContext = {
      category: '574',
    };
    vi.spyOn(siteContextService, 'getSiteContext').mockReturnValue(
      of(siteContext)
    );
    vi.spyOn(userContextService, 'getUserContext').mockReturnValue(
      of(userContext)
    );

    let actualStrategyProducts: StrategyResponse;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe((productsForStrategy) => {
        actualStrategyProducts = productsForStrategy;
      })
      .unsubscribe();
    expect(actualStrategyProducts.products).toEqual(strategyProducts);
    expect(actualStrategyProducts.request).toEqual(strategyRequest);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });

  it('loadProductsForStrategy should call connector and pass in the consent-reference as a header', () => {
    const strategyRequest = {
      queryParams: {
        site: 'electronics-spa',
        language: 'en',
        products: undefined,
        facets: undefined,
        category: '574',
        pageSize: 10,
        searchPhrase: undefined,
      },
      headers: {
        consentReference: `${CONSENT_REFERENCE}`,
      },
    };
    const userContext: MerchandisingUserContext = {
      category: '574',
      consentReference: `${CONSENT_REFERENCE}`,
    };
    vi.spyOn(siteContextService, 'getSiteContext').mockReturnValue(
      of(siteContext)
    );
    vi.spyOn(userContextService, 'getUserContext').mockReturnValue(
      of(userContext)
    );

    let actualStrategyProducts: StrategyResponse;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe((productsForStrategy) => {
        actualStrategyProducts = productsForStrategy;
      })
      .unsubscribe();
    expect(actualStrategyProducts.products).toEqual(strategyProducts);
    expect(actualStrategyProducts.request).toEqual(strategyRequest);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });

  it('loadProductsForStrategy should call connector and pass the seach phrase as a query param', () => {
    const searchPhrase = 'camera';
    const strategyRequest = {
      queryParams: {
        site: 'electronics-spa',
        language: 'en',
        products: undefined,
        facets: undefined,
        category: '574',
        pageSize: 10,
        searchPhrase: searchPhrase,
      },
      headers: {
        consentReference: undefined,
      },
    };
    const userContext: MerchandisingUserContext = {
      category: '574',
      searchPhrase: searchPhrase,
    };
    vi.spyOn(siteContextService, 'getSiteContext').mockReturnValue(
      of(siteContext)
    );
    vi.spyOn(userContextService, 'getUserContext').mockReturnValue(
      of(userContext)
    );

    let actualStartegyProducts: StrategyResponse;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe((productsForStrategy) => {
        actualStartegyProducts = productsForStrategy;
      })
      .unsubscribe();
    expect(actualStartegyProducts.products).toEqual(strategyProducts);
    expect(actualStartegyProducts.request).toEqual(strategyRequest);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });

  it('should retrieve the product Id from the state send this in the StrategyRequest to the StrategyConnector', () => {
    const strategyRequest = {
      queryParams: {
        site: 'electronics-spa',
        language: 'en',
        products: ['123456'],
        facets: undefined,
        category: undefined,
        pageSize: 10,
        searchPhrase: undefined,
      },
      headers: {
        consentReference: undefined,
      },
    };

    vi.spyOn(siteContextService, 'getSiteContext').mockReturnValue(
      of(siteContext)
    );
    vi.spyOn(userContextService, 'getUserContext').mockReturnValue(
      of({ products: ['123456'] })
    );

    let actualStrategyProducts: StrategyResponse;
    cdsMerchandisingPrductService
      .loadProductsForStrategy(STRATEGY_ID, 10)
      .subscribe((productsForStrategy) => {
        actualStrategyProducts = productsForStrategy;
      })
      .unsubscribe();
    expect(actualStrategyProducts.products).toEqual(strategyProducts);
    expect(actualStrategyProducts.request).toEqual(strategyRequest);
    expect(strategyConnector.loadProductsForStrategy).toHaveBeenCalledWith(
      STRATEGY_ID,
      strategyRequest
    );
  });
});
