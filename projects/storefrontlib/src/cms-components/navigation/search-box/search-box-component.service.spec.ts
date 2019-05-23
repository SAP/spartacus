import { TestBed } from '@angular/core/testing';
import {
  Component as SpaComponent,
  ProductSearchPage,
  RoutingService,
  SearchboxService,
  Suggestion,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SearchBoxComponentService } from './search-box-component.service';
import createSpy = jasmine.createSpy;

const mockQueryString = '?query=mockQuery';

class MockSearchboxService {
  searchAuxiliary = createSpy().and.returnValue(of([]));
  getSuggestions = createSpy().and.returnValue(of({}));

  getSuggestionResults(): Observable<Suggestion[]> {
    return of();
  }
  getResults(): Observable<ProductSearchPage> {
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
const MockComponentData = <CmsComponentData<SpaComponent>>{
  data$: of({}),
};

class MockTranslationService {}

describe('SearchBoxComponentService', () => {
  let service: SearchBoxComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
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
          useClass: MockSearchboxService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        SearchBoxComponentService,
        WindowRef,
      ],
    });
    service = TestBed.get(SearchBoxComponentService);
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

  it('should get suggestions from search)', () => {
    const productSearchService = TestBed.get(SearchboxService);

    const searchConfig = { pageSize: 5 };
    service.getResults().subscribe(() => {
      expect(productSearchService.getSuggestions).toHaveBeenCalledWith(
        'testQuery',
        searchConfig
      );
    });
  });
});
