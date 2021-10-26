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
import { ProfileTagEventService } from './../../profiletag/services/profiletag-event.service';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from './../connectors/strategy/converters';
import { MerchandisingUserContext } from './../model/merchandising-user-context.model';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import {
  ConsentChangedPushEvent,
  ProfileTagLifecycleService,
} from '@spartacus/cds';

const consentReference = '75b75543-950f-4e53-a36c-ab8737a0974a';
const emptyPageSearchResults: ProductSearchPage = {};
const consentNotGrantedEvent: ConsentChangedPushEvent =
  new ConsentChangedPushEvent(false);
const consentGrantedEvent: ConsentChangedPushEvent =
  new ConsentChangedPushEvent(true);
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
class ProfileTagEventServiceStub {
  getConsentReference(): Observable<string> {
    return of();
  }
  handleConsentWithdrawn(): void {}
}
class ProfileTagLifecycleServiceStub {
  consentChanged(): Observable<ConsentChangedPushEvent> {
    return of(consentNotGrantedEvent);
  }
}
describe('CdsMerchandisingUserContextService', () => {
  let cdsMerchandisingUserContextService: CdsMerchandisingUserContextService;
  let routingService: RoutingService;
  let productSearchService: ProductSearchService;
  let converterService: ConverterService;
  let profileTagEventService: ProfileTagEventService;
  let profileTagLifecycleService: ProfileTagLifecycleService;

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
        {
          provide: ProfileTagEventService,
          useClass: ProfileTagEventServiceStub,
        },
        {
          provide: ProfileTagLifecycleService,
          useClass: ProfileTagLifecycleServiceStub,
        },
      ],
    });
    cdsMerchandisingUserContextService = TestBed.inject(
      CdsMerchandisingUserContextService
    );
    routingService = TestBed.inject(RoutingService);
    productSearchService = TestBed.inject(ProductSearchService);
    converterService = TestBed.inject(ConverterService);
    profileTagEventService = TestBed.inject(ProfileTagEventService);
    profileTagLifecycleService = TestBed.inject(ProfileTagLifecycleService);
  });

  it('should be created', () => {
    expect(cdsMerchandisingUserContextService).toBeTruthy();
  });

  it('should return a valid MerchandisingUserContext object, if the page is not a PRODUCT_PAGE or CATEGORY_PAGE', () => {
    const expectedMerchandisingUserContext = {
      consentReference: '',
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
      facets: undefined,
      consentReference: '',
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
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedUserContext);
  });

  it('should return a valid MerchandisingUserContext object, if there are no facets, but a categoryCode exists, and the page is a CATEGORY_PAGE', () => {
    const expectedUserContext: MerchandisingUserContext = {
      category: '574',
      facets: undefined,
      consentReference: '',
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
    };

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
      .subscribe((userContext) => (merchandisingUserContext = userContext))
      .unsubscribe();
    expect(merchandisingUserContext).toEqual(expectedMerchandisingUserContext);
  });
});
