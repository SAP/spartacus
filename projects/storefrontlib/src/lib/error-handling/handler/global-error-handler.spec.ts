import { TestBed } from '@angular/core/testing';

import { StoreModule, combineReducers, Store } from '@ngrx/store';

import * as fromRoot from '../../routing/store';

import * as fromStore from '../store/reducers';
import * as fromAction from '../store/actions';
import { GlobalErrorHandler } from './global-error-handler';

describe(`GlobalErrorHandler`, () => {
  let service: GlobalErrorHandler;
  let store: Store<fromStore.ErrorState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          errors: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [GlobalErrorHandler]
    });

    service = TestBed.get(GlobalErrorHandler);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe(`when an error occurs`, () => {
    it(`should dispatch an action`, () => {
      const error = `an error`;
      service.handleError(error);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromAction.GlobalErrorHandlingAction(error)
      );
    });
  });
});
