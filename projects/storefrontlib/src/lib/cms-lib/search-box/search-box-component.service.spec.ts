import { TestBed, inject } from '@angular/core/testing';
import { SearchBoxComponentService } from './search-box-component.service';
import { of } from 'rxjs';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { ProductSearchService } from '@spartacus/core';
import { RoutingService } from '@spartacus/core';
import createSpy = jasmine.createSpy;

const mockQueryString = '?query=mockQuery';

const productSearchServiceMock = {
  searchSuggestions$: of([]),
  auxSearchResults$: of([]),
  searchAuxiliary: createSpy().and.returnValue(of([])),
  getSuggestions: createSpy().and.returnValue(of({}))
};

const routingServiceMock = { goToPage: createSpy('goToPage') };
const componentDataMock = { data$: of({}) };

describe('SearchBoxComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsComponentData,
          useValue: componentDataMock
        },
        {
          provide: RoutingService,
          useValue: routingServiceMock
        },
        {
          provide: ProductSearchService,
          useValue: productSearchServiceMock
        },
        SearchBoxComponentService
      ]
    });
  });

  it('should be created', inject(
    [SearchBoxComponentService],
    (service: SearchBoxComponentService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should navigate at launchSearchPage(query: string)', inject(
    [SearchBoxComponentService],
    (service: SearchBoxComponentService) => {
      spyOn(service, 'launchSearchPage').and.callThrough();

      service.launchSearchPage(mockQueryString);
      expect(service.launchSearchPage).toHaveBeenCalled();
      expect(routingServiceMock.goToPage).toHaveBeenCalledWith(
        ['search'],
        [{ query: mockQueryString }]
      );
    }
  ));

  it('should get sugesstions from search)', inject(
    [SearchBoxComponentService],
    (service: SearchBoxComponentService) => {
      const productSearchService = TestBed.get(ProductSearchService);

      const searchConfig = { pageSize: 5 };
      service.search(of('testQuery')).subscribe(() => {
        expect(productSearchService.getSuggestions).toHaveBeenCalledWith(
          'testQuery',
          searchConfig
        );
      });
    }
  ));
});
