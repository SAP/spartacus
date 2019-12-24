import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  PageContext,
  PageType,
  ProductSearchPage,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from './../connectors/strategy/converters';
import { MerchandisingUserContext } from './../model/merchandising-user-context.model';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';

const emptyPageSearchResults: ProductSearchPage = {};
class RoutingServiceStub {
  getPageContext(): Observable<PageContext> {
    return of();
  }
}
class ProductSearchServiceStub {
  getResults(): Observable<ProductSearchPage> {
    return of();
  }
}

describe('CdsMerchandisingUserContextService', () => {
  let cdsMerchandisingUserContextService: CdsMerchandisingUserContextService;
  let routingService: RoutingService;
  let productSearchService: ProductSearchService;
  let converterService: ConverterService;

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
          useClass: ConverterService,
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
    converterService = TestBed.get(ConverterService as Type<ConverterService>);
  });

  it('should be created', () => {
    expect(cdsMerchandisingUserContextService).toBeTruthy();
  });

  it('should not return a valid MerchandisingUserContext object, if the page is not a PRODUCT_PAGE or CATEGORY_PAGE', () => {
    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('homepage', PageType.CONTENT_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(undefined);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a brandCode exists, and the page is a CATEGORY_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: 'brand123',
      facets: undefined,
    };

    spyOn(converterService, 'pipeable')
      .withArgs(MERCHANDISING_FACET_NORMALIZER)
      .and.returnValue(map(() => undefined))
      .withArgs(MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER)
      .and.returnValue(map(() => undefined));

    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );
    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('brand123', PageType.CATEGORY_PAGE))
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a categoryCode exists, and the page is a CATEGORY_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: '574',
      facets: undefined,
    };

    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('574', PageType.CATEGORY_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );
    spyOn(converterService, 'pipeable')
      .withArgs(MERCHANDISING_FACET_NORMALIZER)
      .and.returnValue(map(() => undefined))
      .withArgs(MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER)
      .and.returnValue(map(() => undefined));

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a productCode exists, and the page is a PRODUCT_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      products: ['12345'],
    };

    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('12345', PageType.PRODUCT_PAGE))
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

  it('should not return a valid MerchandisingUserContext object, if there are facets, but the page type is not a PRODUCT_PAGE or CATEGORY_PAGE', () => {
    const pageSearchResults: ProductSearchPage = {
      breadcrumbs: [
        {
          facetCode: 'category',
          facetName: 'Category',
          facetValueCode: '584',
          facetValueName: 'Hand-held Camcorders',
        },
        {
          facetCode: 'price',
          facetName: 'Price',
          facetValueCode: '$200-$499.99',
          facetValueName: '$200-$499.99',
        },
      ],
    };

    const merchandisingFacets = [
      {
        code: pageSearchResults.breadcrumbs[0].facetCode,
        value: pageSearchResults.breadcrumbs[0].facetValueCode,
      },
      {
        code: pageSearchResults.breadcrumbs[1].facetCode,
        value: pageSearchResults.breadcrumbs[1].facetValueCode,
      },
    ];

    const queryParams = `${merchandisingFacets[0].code}:${merchandisingFacets[0].value}:${merchandisingFacets[1].code}:${merchandisingFacets[1].value}`;

    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('homepage', PageType.CONTENT_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(pageSearchResults)
    );
    spyOn(converterService, 'pipeable')
      .withArgs(MERCHANDISING_FACET_NORMALIZER)
      .and.returnValue(map(() => merchandisingFacets))
      .withArgs(MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER)
      .and.returnValue(map(() => queryParams));

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe(userContext => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(undefined);
  });
});
