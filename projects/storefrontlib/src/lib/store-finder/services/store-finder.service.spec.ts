import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromStore from '../store';

import { StoreFinderService } from './store-finder.service';

describe('StoreFinderService', () => {
  let service: StoreFinderService;
  let store: Store<fromStore.StoresState>;

  const queryText: string = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          store: combineReducers(fromStore.reducers)
        })
      ],
      providers: [StoreFinderService]
    });

    service = TestBed.get(StoreFinderService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should inject StoreFinderService', inject(
    [StoreFinderService],
    (StoreFinderService: StoreFinderService) => {
      expect(StoreFinderService).toBeTruthy();
    }
  ));

  describe('Find Stores', () => {
    it('should dispatch a new action', () => {
      service.findStores(queryText);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStores({ queryText })
      );
    });
  });
});
