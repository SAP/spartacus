import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/view-all-stores.action';
import { OccConfig } from '../../../occ';

import * as fromEffects from './view-all-stores.effect';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('ViewAllStores Effects', () => {
  let actions$: Observable<any>;
  let connector: StoreFinderConnector;
  let effects: fromEffects.ViewAllStoresEffect;

  const searchResult: any = { stores: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StoreFinderConnector,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        fromEffects.ViewAllStoresEffect,
        provideMockActions(() => actions$),
      ],
    });

    connector = TestBed.get(StoreFinderConnector);
    effects = TestBed.get(fromEffects.ViewAllStoresEffect);

    spyOn(connector, 'getCount').and.returnValue(of(searchResult));
  });

  describe('viewAllStores$', () => {
    it('should return searchResult from ViewAllStoresSuccess', () => {
      const action = new fromActions.ViewAllStores();
      const completion = new fromActions.ViewAllStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.viewAllStores$).toBeObservable(expected);
    });
  });
});
