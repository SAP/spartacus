import { TestBed, inject } from '@angular/core/testing';

import { SearchBoxComponentService } from './search-box-component.service';
import { CmsComponentData, ProductSearchService } from '@spartacus/storefront';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRouting from '../../routing/store';

const mockQueryString = '?query=mockQuery';

const productSearchServiceMock = {
  search() {
    return of([]);
  },
  getSuggestions() {
    return of({});
  }
};
const storeMock = { pipe: () => of([]), dispatch() {} };
const componentDataMock = { data$: of({}) };

describe('SearchBoxComponentService', () => {
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsComponentData,
          useValue: componentDataMock
        },
        {
          provide: Store,
          useValue: storeMock
        },
        {
          provide: ProductSearchService,
          useValue: productSearchServiceMock
        },
        SearchBoxComponentService
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
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
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromRouting.Go({ path: ['/search', mockQueryString] })
      );
    }
  ));

  it('should get sugesstions from search)', inject(
    [SearchBoxComponentService],
    (service: SearchBoxComponentService) => {
      const productSearchService = TestBed.get(ProductSearchService);
      spyOn(productSearchService, 'getSuggestions').and.callThrough();
      spyOn(productSearchService, 'search').and.callThrough();

      const searchConfig = { pageSize: 5 };
      service.search(of('testQuery')).subscribe(() => {
        console.log('asdsa');
        expect(productSearchService.getSuggestions).toHaveBeenCalledWith(
          'testQuery',
          searchConfig
        );
      });
    }
  ));
});
