import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  ProductSearchPage,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { MerchandisingUserContext } from './../model/merchandising-user-context.model';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import createSpy = jasmine.createSpy;

const emptyPageSearchResults: ProductSearchPage = {};
const defaultRouterState: RouterState = {
  navigationId: 1,
  state: {
    url: 'electronics-spa/en/USD/',
    queryParams: {},
    context: {
      id: 'homepage',
    },
    params: {},
    cmsRequired: true,
  },
};

class RoutingServiceStub {
  getRouterState(): Observable<RouterState> {
    return of();
  }
}
class ProductSearchServiceStub {
  getResults(): Observable<ProductSearchPage> {
    return of();
  }
}
class MockConverterService {
  pipeable = createSpy().and.returnValue(x => x);
}

describe('CdsMerchandisingUserContextService', () => {
  let cdsMerchandisingUserContextService: CdsMerchandisingUserContextService;
  let routingService: RoutingService;
  let productSearchService: ProductSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: RoutingServiceStub,
        },
        {
          provide: ProductSearchService,
          useClass: ProductSearchServiceStub,
        },
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
      ],
    });
    cdsMerchandisingUserContextService = TestBed.get(
      CdsMerchandisingUserContextService as Type<
        CdsMerchandisingUserContextService
      >
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    productSearchService = TestBed.get(ProductSearchService as Type<
      ProductSearchService
    >);
  });

  it('should be created', () => {
    expect(cdsMerchandisingUserContextService).toBeTruthy();
  });

  it('should return a valid MerchandisingUserContext object, even if there are no params in the RouterStage and no facets', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: undefined,
      productId: undefined,
      facets: undefined,
    };

    spyOn(routingService, 'getRouterState').and.returnValue(
      of(defaultRouterState)
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a categoryCode exists', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: '574',
      productId: undefined,
      facets: undefined,
    };
    const routerState: RouterState = {
      navigationId: 1,
      state: {
        url: 'electronics-spa/en/USD/',
        queryParams: {},
        context: {
          id: 'homepage',
        },
        params: {
          categoryCode: '574',
        },
        cmsRequired: true,
      },
    };

    spyOn(routingService, 'getRouterState').and.returnValue(of(routerState));
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a productCode exists', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: undefined,
      productId: '12345',
      facets: undefined,
    };
    const routerState: RouterState = {
      navigationId: 1,
      state: {
        url: 'electronics-spa/en/USD/',
        queryParams: {},
        context: {
          id: 'homepage',
        },
        params: {
          productCode: '12345',
        },
        cmsRequired: true,
      },
    };

    spyOn(routingService, 'getRouterState').and.returnValue(of(routerState));
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  /** TODO: This test needs to mock out the converts */
  // it('should return a valid MerchandisingUserContext object, if there are facets', () => {
  //   const expectedUserContext: MerchandisingUserContext = {
  //     category: undefined,
  //     productId: undefined,
  //     facets: 'category:584:price:$200-$499.99',
  //   };

  //   const pageSearchResults: ProductSearchPage = {
  //     breadcrumbs: [
  //       {
  //         facetCode: 'category',
  //         facetName: 'Category',
  //         facetValueCode: '584',
  //         facetValueName: 'Hand-held Camcorders',
  //       },
  //       {
  //         facetCode: 'price',
  //         facetName: 'Price',
  //         facetValueCode: '$200-$499.99',
  //         facetValueName: '$200-$499.99',
  //       },
  //     ],
  //   };

  //   spyOn(routingService, 'getRouterState').and.returnValue(
  //     of(defaultRouterState)
  //   );
  //   spyOn(productSearchService, 'getResults').and.returnValue(
  //     of(pageSearchResults)
  //   );

  //   let merchandisingUserContext: MerchandisingUserContext;
  //   cdsMerchandisingUserContextService
  //     .getUserContext()
  //     .subscribe(userContext => (merchandisingUserContext = userContext))
  //     .unsubscribe();
  //   expect(merchandisingUserContext).toEqual(expectedUserContext);
  // });
});
