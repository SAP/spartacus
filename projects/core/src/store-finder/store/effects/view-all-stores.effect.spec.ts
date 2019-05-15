import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/view-all-stores.action';
import { OccConfig } from '../../../occ';

import * as fromEffects from './view-all-stores.effect';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreCountList } from '../../../model/store.model';

const mockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const storesCountResult: StoreCountList = { countriesAndRegionsStoreCount: [] };

const mockStoreFinderConnector = {
  getCount: jasmine
    .createSpy('connector.getCount')
    .and.returnValue(of(storesCountResult)),
};

describe('ViewAllStores Effects', () => {
  let actions$: Observable<any>;
  let effects: fromEffects.ViewAllStoresEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: StoreFinderConnector, useValue: mockStoreFinderConnector },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        fromEffects.ViewAllStoresEffect,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(fromEffects.ViewAllStoresEffect);
  });

  describe('viewAllStores$', () => {
    it('should return searchResult from ViewAllStoresSuccess', () => {
      const action = new fromActions.ViewAllStores();
      const completion = new fromActions.ViewAllStoresSuccess(
        storesCountResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.viewAllStores$).toBeObservable(expected);
    });
  });
});
