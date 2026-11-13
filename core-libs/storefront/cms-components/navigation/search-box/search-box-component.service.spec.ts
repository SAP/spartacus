import { TestBed } from '@angular/core/testing';
import {
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
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { SearchBoxComponentService } from './search-box-component.service';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';
import { SearchBoxConfig, SearchResults } from './search-box.model';

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
    return EMPTY;
  }
  getSuggestionResults(): Observable<Suggestion[]> {
    return EMPTY;
  }
  clearResults(): void {}
  searchWithCompletion(_query: string, _config: any): Observable<any> {
    return EMPTY;
  }
  searchSuggestionsWithCompletion(
    _query: string,
    _config: any
  ): Observable<any> {
    return EMPTY;
  }
}

class MockRoutingService {
  go() {}

  getRouterState() {
    return of({
      state: {
        params: {
          query: 'test',
        },
      },
    });
  }
}

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
  let featureToggles: MockFeatureTogglesController;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: SearchboxService,
          useClass: MockSearchBoxService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        provideMockFeatureToggles({
          searchBoxRecentSearchesRemoval: false,
          searchBoxEmptyQueryResultsPanel: false,
        }),
        SearchBoxComponentService,
        WindowRef,
      ],
    });
    searchBoxService = TestBed.inject(SearchboxService);
    eventService = TestBed.inject(EventService);
    featureToggles = TestBed.inject(MockFeatureTogglesController);
    routingService = TestBed.inject(RoutingService);

    service = TestBed.inject(SearchBoxComponentService);
  });

  afterEach(() => {
    document.body.classList.remove('has-searchbox-results');
    featureToggles.set('searchBoxEmptyQueryResultsPanel', false);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate at launchSearchPage(query: string)', () => {
    vi.spyOn(service, 'launchSearchPage');
    vi.spyOn(routingService, 'go');

    service.launchSearchPage(mockQueryString);

    service.searchCompleted.next(true);

    expect(service.launchSearchPage).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'search',
      params: { query: mockQueryString },
    });
  });

  it('should get suggestions results', () => {
    vi.spyOn(searchBoxService, 'getSuggestionResults');
    service.getResults(searchBoxConfig).subscribe().unsubscribe();
    expect(searchBoxService.getSuggestionResults).toHaveBeenCalledWith();
  });

  it('should return 2 products', () => {
    let result!: SearchResults;
    vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
      of(mockSearchResults)
    );
    vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(of([]));
    service
      .getResults(searchBoxConfig)
      .subscribe((results) => (result = results));
    expect(result.products?.length).toEqual(2);
  });

  it('should not return products when config.displayProducts = false', () => {
    vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
      of([{ value: 'sug1' }, { value: 'sug2' }] as any)
    );

    let result!: SearchResults;
    service
      .getResults({ displaySuggestions: true, displayProducts: false })
      .subscribe((results) => (result = results));
    expect(result.products).toBeFalsy();
  });

  describe('search result suggestions', () => {
    let result: SearchResults;
    beforeEach(() => {
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
        of(mockSearchResults)
      );
    });

    it('should return 2 suggestions', () => {
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([{ value: 'sug1' }, { value: 'sug2' }] as any)
      );

      service
        .getResults(searchBoxConfig)
        .subscribe((results) => (result = results));
      expect(result.suggestions?.length).toEqual(2);
    });

    it('should not return suggestions when config.displaySuggestions = false', () => {
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([{ value: 'sug1' }, { value: 'sug2' }] as any)
      );

      service
        .getResults({ displaySuggestions: false, displayProducts: true })
        .subscribe((results) => (result = results));
      expect(result.suggestions?.length).toEqual(0);
    });

    it('should have exact match suggestion when there are no suggestions but at least one product', () => {
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service
        .getResults(searchBoxConfig)
        .subscribe((results) => (result = results));
      expect(result.suggestions).toEqual([
        'searchBox.help.exactMatch{"term":"query"}',
      ]);
    });

    it('should not get an exact match suggestion when there are suggestions returned', () => {
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([{ value: 'sug1' }] as any)
      );

      service
        .getResults(searchBoxConfig)
        .subscribe((results) => (result = results));
      expect(result.suggestions).not.toContain(
        'searchBox.help.exactMatch{"term":"query"}'
      );
    });
  });

  it('should not search when query is empty', () => {
    vi.spyOn(searchBoxService, 'clearResults');
    vi.spyOn(searchBoxService, 'searchWithCompletion');
    vi.spyOn(searchBoxService, 'searchSuggestionsWithCompletion');
    service.setRecentSearches(false);
    service.setTrendingSearches(false);

    service.search('', searchBoxConfig);

    expect(searchBoxService.clearResults).toHaveBeenCalled();
    expect(searchBoxService.searchWithCompletion).not.toHaveBeenCalled();
    expect(
      searchBoxService.searchSuggestionsWithCompletion
    ).not.toHaveBeenCalled();
  });

  describe('search result message', () => {
    let result: SearchResults;

    beforeEach(() => {
      result = {} as SearchResults;
    });

    it('should not get a message when there are no results ', () => {
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(of({}));
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeFalsy();
    });

    it('should get a not found message when there are no products and suggestions ', () => {
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
        of({ products: [] })
      );
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeTruthy();

      expect(result.message).toEqual('searchBox.help.noMatch');
    });

    it('should not mark the body as having searchbox results for leftover OCC data when the query is empty', () => {
      featureToggles.set('searchBoxEmptyQueryResultsPanel', true);
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
        of({ products: [] })
      );
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.getResults(searchBoxConfig).subscribe();

      expect(document.body.classList).not.toContain('has-searchbox-results');
    });

    it('should mark the body as having searchbox results when trending searches are enabled with an empty query', () => {
      featureToggles.set('searchBoxEmptyQueryResultsPanel', true);
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(of({}));
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.getResults(searchBoxConfig).subscribe();
      service.setTrendingSearches(true);

      expect(document.body.classList).toContain('has-searchbox-results');

      service.setTrendingSearches(false);
    });

    it('should mark the body as having searchbox results for OCC data when the query is not empty', () => {
      featureToggles.set('searchBoxEmptyQueryResultsPanel', true);
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
        of(mockSearchResults)
      );
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.search('ab', {
        ...searchBoxConfig,
        minCharactersBeforeRequest: 3,
      });
      service.getResults(searchBoxConfig).subscribe();

      expect(document.body.classList).toContain('has-searchbox-results');
    });

    it('should not get a message when there are products ', () => {
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
        of(mockSearchResults)
      );
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.search('ab', {
        ...searchBoxConfig,
        minCharactersBeforeRequest: 3,
      });
      service.getResults(searchBoxConfig).subscribe();

      expect(document.body.classList).toContain('has-searchbox-results');
    });

    it('should not get a message when there are products ', () => {
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(
        of(mockSearchResults)
      );
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([])
      );

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeFalsy();
    });

    it('should not get a message when there are suggestions ', () => {
      vi.spyOn(searchBoxService, 'getResults').mockReturnValue(EMPTY);
      vi.spyOn(searchBoxService, 'getSuggestionResults').mockReturnValue(
        of([{ value: 'sug1' }] as any)
      );

      service.getResults(searchBoxConfig).subscribe((r) => (result = r));
      expect(result.message).toBeFalsy();
    });
  });

  describe('clearResults()', () => {
    beforeEach(() => {
      vi.spyOn(searchBoxService, 'clearResults');
      vi.spyOn(service, 'toggleBodyClass');
    });

    it('should clear the SearchboxService results', () => {
      service.clearResults();

      expect(searchBoxService.clearResults).toHaveBeenCalled();
    });

    it('should remove the `has-searchbox-results` body class', () => {
      document.body.classList.add('has-searchbox-results');

      service.clearResults();

      expect(service.toggleBodyClass).toHaveBeenCalledWith(
        'has-searchbox-results',
        false
      );
      expect(document.body.classList).not.toContain('has-searchbox-results');
    });

    it('should reset hasKeywordRedirect and currentQueryLength', () => {
      // Trigger a search so internal state is set, then clear
      vi.spyOn(searchBoxService, 'searchWithCompletion').mockReturnValue(
        of({
          type: 'SEARCH_PRODUCTS_SUCCESS',
          payload: { keywordRedirectUrl: 'http://example.com' },
        })
      );
      vi.spyOn(
        searchBoxService,
        'searchSuggestionsWithCompletion'
      ).mockReturnValue(of({}));
      service.search('cam', searchBoxConfig);

      service.clearResults();

      // After clearing, launchSearchPage should navigate (no keyword redirect)
      vi.spyOn(service['routingService'], 'go');
      service.searchCompleted.next(true);
      service.launchSearchPage('cam');
      service.searchCompleted.next(true);
      expect(service['routingService'].go).toHaveBeenCalledWith({
        cxRoute: 'search',
        params: { query: 'cam' },
      });
    });

    describe('with searchBoxEmptyQueryResultsPanel feature toggle', () => {
      beforeEach(() => {
        featureToggles.set('searchBoxEmptyQueryResultsPanel', true);
      });

      it('should disable enableTrendingSearches and enableRecentSearches', () => {
        service.setTrendingSearches(true);
        service.setRecentSearches(true);

        service.clearResults();

        expect((service as any).enableTrendingSearches).toBe(false);
        expect((service as any).enableRecentSearches).toBe(false);
      });
    });

    describe('without searchBoxEmptyQueryResultsPanel feature toggle', () => {
      it('should not touch enableTrendingSearches or enableRecentSearches', () => {
        (service as any).enableTrendingSearches = true;
        (service as any).enableRecentSearches = true;

        service.clearResults();

        expect((service as any).enableTrendingSearches).toBe(true);
        expect((service as any).enableRecentSearches).toBe(true);
      });
    });
  });

  describe('shareEvent()', () => {
    it('should emit the event on sharedEvent observable', async () => {
      const event = new KeyboardEvent('c');
      service.shareEvent(event);

      const actual = await firstValueFrom(service.sharedEvent);

      expect(actual).toBe(event);
    });
  });

  describe('changeSelectedWord()', () => {
    it('should emit the new word on chosenWord observable', async () => {
      const word = 'camera';
      service.changeSelectedWord(word);

      const actual = await firstValueFrom(service.chosenWord);

      expect(actual).toBe(word);
    });
  });

  describe('setSearchResultsShown()', () => {
    it('should apply the `has-searchbox-results` class', () => {
      service.setSearchResultsShown(true);

      expect(document.body.classList).toContain('has-searchbox-results');
    });

    it('should remove the `has-searchbox-results` class', () => {
      document.body.classList.add('has-searchbox-results');

      service.setSearchResultsShown(false);

      expect(document.body.classList).not.toContain('has-searchbox-results');
    });
  });

  describe('toggleBodyClass()', () => {
    const className = 'has-searchbox-results';

    it('should apply the class when it is absent', () => {
      document.body.classList.remove(className);

      service.toggleBodyClass(className);

      expect(document.body.classList).toContain(className);
    });

    it('should remove the class when it is present', () => {
      document.body.classList.add(className);

      service.toggleBodyClass(className);

      expect(document.body.classList).not.toContain(className);
    });

    it('should not remove the class when the add parameter is true', () => {
      document.body.classList.add(className);

      service.toggleBodyClass(className, true);

      expect(document.body.classList).toContain(className);
    });

    it('should not add the class when the add parameter is false', () => {
      document.body.classList.remove(className);

      service.toggleBodyClass(className, false);
      expect(document.body.classList).not.toContain(className);
    });
  });

  describe('hasBodyClass()', () => {
    const className = 'has-searchbox-results';

    it('should return false when the class is absent', () => {
      document.body.classList.remove(className);

      const actual = service.hasBodyClass(className);

      expect(actual).toBe(false);
    });

    it('should return true when the class is present', () => {
      document.body.classList.add(className);

      const actual = service.hasBodyClass(className);

      expect(actual).toBe(true);
    });
  });

  describe('UI Events', () => {
    describe('Suggestion Event', () => {
      it('should fire the correct event', () => {
        let result!: SearchBoxSuggestionSelectedEvent;
        eventService
          .get(SearchBoxSuggestionSelectedEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        const mockEventData: SearchBoxSuggestionSelectedEvent = {
          freeText: 'camera',
          selectedSuggestion: mockSuggestions[0].value ?? '',
          searchSuggestions: mockSuggestions,
        };

        const searchBoxSuggestionSelectedEvent = createFrom(
          SearchBoxSuggestionSelectedEvent,
          mockEventData
        );

        service.dispatchSuggestionSelectedEvent(mockEventData);

        expect(result).toEqual(
          expect.objectContaining(searchBoxSuggestionSelectedEvent)
        );
      });

      it('should fire multiple event', () => {
        const result: SearchBoxSuggestionSelectedEvent[] = [];
        eventService
          .get(SearchBoxSuggestionSelectedEvent)
          .subscribe((value) => result.push(value));

        const mockEventData1 = {
          freeText: 'camera',
          selectedSuggestion: mockSuggestions[0].value ?? '',
          searchSuggestions: mockSuggestions,
        };

        const mockEventData2 = {
          freeText: 'camileo',
          selectedSuggestion: mockSuggestions[1].value ?? '',
          searchSuggestions: mockSuggestions,
        };

        const mockEventData3 = {
          freeText: 'cameras',
          selectedSuggestion: mockSuggestions[2].value ?? '',
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
        let result!: SearchBoxProductSelectedEvent;
        eventService
          .get(SearchBoxProductSelectedEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        const mockEventData: SearchBoxProductSelectedEvent = {
          freeText: 'camera',
          productCode: mockProduct.code ?? '',
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
          expect.objectContaining(searchBoxProductSelectedEvent)
        );
      });
    });
  });
});
