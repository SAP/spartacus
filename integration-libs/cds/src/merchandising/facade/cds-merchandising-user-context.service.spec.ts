import { TestBed } from '@angular/core/testing';
import {
  CdsMerchandisingUserContextService,
  ConsentChangedPushEvent,
  MerchandisingUserContext,
  ProfileTagEventService,
  ProfileTagLifecycleService,
} from '@spartacus/cds';
import {
  PageContext,
  PageType,
  ProductSearchPage,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { FacetList, FacetService } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';

const consentReference = '75b75543-950f-4e53-a36c-ab8737a0974a';
const emptyPageSearchResults: ProductSearchPage = {};
const consentNotGrantedEvent: ConsentChangedPushEvent =
  new ConsentChangedPushEvent(false);
const consentGrantedEvent: ConsentChangedPushEvent =
  new ConsentChangedPushEvent(true);
class RoutingServiceStub {
  getPageContext(): Observable<PageContext> {
    return EMPTY;
  }
}
class ProductSearchServiceStub {
  getResults(): Observable<ProductSearchPage> {
    return EMPTY;
  }
}
class ProfileTagEventServiceStub {
  getConsentReference(): Observable<string> {
    return EMPTY;
  }
  handleConsentWithdrawn(): void {}
}
class ProfileTagLifecycleServiceStub {
  consentChanged(): Observable<ConsentChangedPushEvent> {
    return of(consentNotGrantedEvent);
  }
}
class FacetServiceStub {
  facetList$ = EMPTY;
}
describe('CdsMerchandisingUserContextService', () => {
  let cdsMerchandisingUserContextService: CdsMerchandisingUserContextService;
  let routingService: RoutingService;
  let productSearchService: ProductSearchService;
  let profileTagEventService: ProfileTagEventService;
  let profileTagLifecycleService: ProfileTagLifecycleService;
  let facetService: FacetService;

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
          provide: ProfileTagEventService,
          useClass: ProfileTagEventServiceStub,
        },
        {
          provide: ProfileTagLifecycleService,
          useClass: ProfileTagLifecycleServiceStub,
        },
        {
          provide: FacetService,
          useClass: FacetServiceStub,
        },
      ],
    });
    cdsMerchandisingUserContextService = TestBed.inject(
      CdsMerchandisingUserContextService
    );
    routingService = TestBed.inject(RoutingService);
    productSearchService = TestBed.inject(ProductSearchService);
    profileTagEventService = TestBed.inject(ProfileTagEventService);
    profileTagLifecycleService = TestBed.inject(ProfileTagLifecycleService);
    facetService = TestBed.inject(FacetService);
  });

  it('should be created', () => {
    expect(cdsMerchandisingUserContextService).toBeTruthy();
  });

  it('should return a valid MerchandisingUserContext object, if the page is not a PRODUCT_PAGE or CATEGORY_PAGE', () => {
    const expectedMerchandisingUserContext = {
      consentReference: '',
      facets: undefined,
      searchPhrase: undefined,
    };
    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('homepage', PageType.CONTENT_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedMerchandisingUserContext);
  });

  it('should return a valid MerchandisingUserContext object, with a valid consent reference, if the page is not a PRODUCT_PAGE or CATEGORY_PAGE', () => {
    const expectedMerchandisingUserContext = {
      consentReference: `${consentReference}`,
      facets: undefined,
      searchPhrase: undefined,
    };
    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('homepage', PageType.CONTENT_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );
    spyOn(profileTagEventService, 'getConsentReference').and.returnValue(
      of(consentReference)
    );
    spyOn(profileTagLifecycleService, 'consentChanged').and.returnValue(
      of(consentGrantedEvent)
    );
    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedMerchandisingUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a brandCode exists, and the page is a CATEGORY_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: 'brand123',
      consentReference: '',
      facets: undefined,
      searchPhrase: undefined,
    };

    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );
    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('brand123', PageType.CATEGORY_PAGE))
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a categoryCode exists, and the page is a CATEGORY_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: '574',
      consentReference: '',
      facets: undefined,
      searchPhrase: undefined,
    };

    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('574', PageType.CATEGORY_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(emptyPageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a productCode exists, and the page is a PRODUCT_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      products: ['12345'],
      consentReference: '',
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
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are facets, but the page type is not a PRODUCT_PAGE or CATEGORY_PAGE', () => {
    const expectedMerchandisingUserContext = {
      consentReference: '',
      facets: 'category:584:price:$200-$499.99',
      searchPhrase: 'something',
    };

    const pageSearchResults: ProductSearchPage = {
      freeTextSearch: 'something',
    };

    const merchandisingFacets = {
      activeFacets: [
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
    } as FacetList;
    facetService.facetList$ = of(merchandisingFacets);

    spyOn(routingService, 'getPageContext').and.returnValue(
      of(new PageContext('homepage', PageType.CONTENT_PAGE))
    );
    spyOn(productSearchService, 'getResults').and.returnValue(
      of(pageSearchResults)
    );

    let merchandisingUserContext: MerchandisingUserContext;
    cdsMerchandisingUserContextService
      .getUserContext()
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedMerchandisingUserContext);
  });
});
