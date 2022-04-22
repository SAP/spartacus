import { TestBed } from '@angular/core/testing';
import {
  CmsComponent,
  createFrom,
  EventService,
  I18nTestingModule,
  Product,
  ProductSearchPage,
  RoutingService,
  SearchboxService,
  Suggestion,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SearchBoxComponentService } from './search-box-component.service';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';
import { SearchBoxConfig, SearchResults } from './search-box.model';
import createSpy = jasmine.createSpy;

const mockQueryString = '?query=mockQuery';

const searchBoxConfig: SearchBoxConfig = {
  minCharactersBeforeRequest: 1,
  displayProducts: true,
  displaySuggestions: true,
  maxProducts: 5,
  maxSuggestions: 5,
  displayProductImages: false,
};

class MockSearchBoxService {
  getResults(): Observable<ProductSearchPage> {
    return of();
  }
  getSuggestionResults(): Observable<Suggestion[]> {
    return of();
  }
}

const mockRouterState = {
  state: {
    params: {
      query: 'test',
    },
  },
};

const MockRoutingService = {
  go: createSpy('go'),
  getRouterState() {
    return of(mockRouterState);
  },
};
const MockComponentData = <CmsComponentData<CmsComponent>>{
  data$: of({}),
};

class MockTranslationService {
  translate(value: string, options: any) {
    return of(value + (options ? JSON.stringify(options) : ''));
  }
}

const mockSearchResults: ProductSearchPage = {
  products: [
    {
      code: '123',
    },
    {
      code: '456',
    },
  ],
  freeTextSearch: 'query',
};

const mockSuggestions: Suggestion[] = [
  { value: 'camera' },
  { value: 'test1' },
  { value: 'test2' },
];

const mockProduct: Product = {
  code: '123456',
};

describe('SearchBoxComponentService', () => {
  let service: SearchBoxComponentService;
  let searchBoxService: SearchboxService;
  let eventService: EventService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockComponentData,
        },
        {
          provide: RoutingService,
          useValue: MockRoutingService,
        },
        {
          provide: SearchboxService,
          useClass: MockSearchBoxService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        SearchBoxComponentService,
        WindowRef,
      ],
    });
    service = TestBed.inject(SearchBoxComponentService);
    searchBoxService = TestBed.inject(SearchboxService);
    eventService = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate at launchSearchPage(query: string)', () => {
    spyOn(service, 'launchSearchPage').and.callThrough();

    service.launchSearchPage(mockQueryString);
    expect(service.launchSearchPage).toHaveBeenCalled();
    expect(MockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'search',
      params: { query: mockQueryString },
    });
  });

  it('should get suggestions results', () => {
    spyOn(searchBoxService, 'getSuggestionResults').and.callThrough();
    service.getResults(searchBoxConfig).subscribe().unsubscribe();
    expect(searchBoxService.getSuggestionResults).toHaveBeenCalledWith();
  });

  it('should return 2 products', () => {
    let result: SearchResults;
    spyOn(searchBoxService, 'getResults').and.returnValue(
      of(mockSearchResults)
    );
    spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(of([]));
    service
      .getResults(searchBoxConfig)
      .subscribe((results) => (result = results));
    expect(result.products.length).toEqual(2);
  });

  it('should not return products when config.displayProducts = false', () => {
    spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(
      of(['sug1', 'sug2'] as any)
    );

    let result: SearchResults;
    service
      .getResults({ displaySuggestions: true, displayProducts: false })
      .subscribe((results) => (result = results));
    expect(result.products).toBeFalsy();
  });

  describe('search result suggestions', () => {
    let result: SearchResults;
    beforeEach(() => {
      spyOn(searchBoxService, 'getResults').and.returnValue(
        of(mockSearchResults)
      );
    });

    it('should return 2 suggestions', () => {
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(
        of(['sug1', 'sug2'] as any)
      );

      service
        .getResults(searchBoxConfig)
        .subscribe((results) => (result = results));
      expect(result.suggestions.length).toEqual(2);
    });

    it('should not return suggestions when config.displaySuggestions = false', () => {
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(
        of(['sug1', 'sug2'] as any)
      );

      service
        .getResults({ displaySuggestions: false, displayProducts: true })
        .subscribe((results) => (result = results));
      expect(result.suggestions.length).toEqual(0);
    });

    it('should have exact match suggestion when there are no suggestions but at least one product', () => {
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(of([]));

      service
        .getResults(searchBoxConfig)
        .subscribe((results) => (result = results));
      expect(result.suggestions).toEqual([
        'searchBox.help.exactMatch{"term":"query"}',
      ]);
    });

    it('should not get an exact match suggestion when there are suggestions returned', () => {
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(
        of(['sug1'] as any)
      );

      service
        .getResults(searchBoxConfig)
        .subscribe((results) => (result = results));
      expect(result.suggestions).not.toContain(
        'searchBox.help.exactMatch{"term":"query"}'
      );
    });
  });

  describe('search result message', () => {
    let result: SearchResults;

    it('should not get a message when there are no results ', () => {
      spyOn(searchBoxService, 'getResults').and.returnValue(of({}));
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(of([]));

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeFalsy();
    });

    it('should get a not found message when there are no products and suggestions ', () => {
      spyOn(searchBoxService, 'getResults').and.returnValue(
        of({ products: [] })
      );
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(of([]));

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeTruthy();

      expect(result.message).toEqual('searchBox.help.noMatch');
    });

    it('should not get a message when there are products ', () => {
      spyOn(searchBoxService, 'getResults').and.returnValue(
        of(mockSearchResults)
      );
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(of([]));

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeFalsy();
    });

    it('should not get a message when there are suggestions ', () => {
      spyOn(searchBoxService, 'getResults').and.returnValue(of());
      spyOn(searchBoxService, 'getSuggestionResults').and.returnValue(
        of(['sug1'] as any)
      );

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeFalsy();
    });
  });

  describe('UI Events', () => {
    describe('Suggestion Event', () => {
      it('should fire the correct event', () => {
        let result: SearchBoxSuggestionSelectedEvent;
        eventService
          .get(SearchBoxSuggestionSelectedEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        const mockEventData: SearchBoxSuggestionSelectedEvent = {
          freeText: 'camera',
          selectedSuggestion: mockSuggestions[0].value,
          searchSuggestions: mockSuggestions,
        };

        const searchBoxSuggestionSelectedEvent = createFrom(
          SearchBoxSuggestionSelectedEvent,
          mockEventData
        );

        service.dispatchSuggestionSelectedEvent(mockEventData);

        expect(result).toEqual(
          jasmine.objectContaining(searchBoxSuggestionSelectedEvent)
        );
      });

      it('should fire multiple event', () => {
        const result: SearchBoxSuggestionSelectedEvent[] = [];
        eventService
          .get(SearchBoxSuggestionSelectedEvent)
          .subscribe((value) => result.push(value));

        const mockEventData1 = {
          freeText: 'camera',
          selectedSuggestion: mockSuggestions[0].value,
          searchSuggestions: mockSuggestions,
        };

        const mockEventData2 = {
          freeText: 'camileo',
          selectedSuggestion: mockSuggestions[1].value,
          searchSuggestions: mockSuggestions,
        };

        const mockEventData3 = {
          freeText: 'cameras',
          selectedSuggestion: mockSuggestions[2].value,
          searchSuggestions: mockSuggestions,
        };

        service.dispatchSuggestionSelectedEvent(mockEventData1);
        service.dispatchSuggestionSelectedEvent(mockEventData2);
        service.dispatchSuggestionSelectedEvent(mockEventData3);

        expect(result.length).toEqual(3);
      });
    });

    describe('Product Event', () => {
      it('should fire the correct event', () => {
        let result: SearchBoxProductSelectedEvent;
        eventService
          .get(SearchBoxProductSelectedEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        const mockEventData: SearchBoxProductSelectedEvent = {
          freeText: 'camera',
          productCode: mockProduct.code,
        };

        const searchBoxProductSelectedEvent = createFrom(
          SearchBoxProductSelectedEvent,
          {
            freeText: 'camera',
            productCode: mockProduct.code,
          }
        );

        service.dispatchProductSelectedEvent(mockEventData);

        expect(result).toEqual(
          jasmine.objectContaining(searchBoxProductSelectedEvent)
        );
      });
    });
  });
});
