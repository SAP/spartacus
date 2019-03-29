import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import * as fromActions from '../../../state/utils/entity-loader/entity-loader.action';
import { PROCESS_FEATURE, StateWithProcess } from '../process-state';
import * as fromReducers from '../reducers';

import * as fromSelectors from './process.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';

const MOCK_UPDATE_STATE = 'update-mock';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithProcess<void>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PROCESS_FEATURE, fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
  });

  describe('getProcessStateFactory', () => {
    it('should return requested process slice of the state', () => {
      store.dispatch(
        new fromActions.EntitySuccessAction(PROCESS_FEATURE, MOCK_UPDATE_STATE)
      );

      let result: LoaderState<void>;
      store
        .pipe(select(fromSelectors.getProcessStateFactory(MOCK_UPDATE_STATE)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        success: true,
        error: false,
        value: undefined
      });
    });
  });

  describe('getProcessLoadingFactory', () => {
    it('should return loading flag', () => {
      store.dispatch(
        new fromActions.EntityLoadAction(PROCESS_FEATURE, MOCK_UPDATE_STATE)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getProcessLoadingFactory(MOCK_UPDATE_STATE)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getSelectedProductSuccessFactory', () => {
    it('should return success flag', () => {
      store.dispatch(
        new fromActions.EntitySuccessAction(PROCESS_FEATURE, MOCK_UPDATE_STATE)
      );

      let result: boolean;
      store
        .pipe(
          select(
            fromSelectors.getSelectedProductSuccessFactory(MOCK_UPDATE_STATE)
          )
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getSelectedProductErrorFactory', () => {
    it('should return success flag', () => {
      store.dispatch(
        new fromActions.EntityFailAction(PROCESS_FEATURE, MOCK_UPDATE_STATE)
      );

      let result: boolean;
      store
        .pipe(
          select(
            fromSelectors.getSelectedProductErrorFactory(MOCK_UPDATE_STATE)
          )
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
