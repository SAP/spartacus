import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromActions from '../../../state/utils/entity-loader/entity-loader.action';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { PROCESS_FEATURE, StateWithProcess } from '../process-state';
import * as fromReducers from '../reducers/index';
import { ProcessSelectors } from './index';

const MOCK_PROCESS_ID = 'mock-process-id';

describe('Process selectors', () => {
  let store: Store<StateWithProcess<void>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PROCESS_FEATURE, fromReducers.getReducers()),
      ],
    });
    store = TestBed.get(Store);
  });

  describe('getProcessStateFactory', () => {
    it('should return requested process slice of the state', () => {
      store.dispatch(
        new fromActions.EntitySuccessAction(PROCESS_FEATURE, MOCK_PROCESS_ID)
      );

      let result: LoaderState<void>;
      store
        .pipe(select(ProcessSelectors.getProcessStateFactory(MOCK_PROCESS_ID)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        success: true,
        error: false,
        value: undefined,
      });
    });
  });

  describe('getProcessLoadingFactory', () => {
    it('should return loading flag', () => {
      store.dispatch(
        new fromActions.EntityLoadAction(PROCESS_FEATURE, MOCK_PROCESS_ID)
      );

      let result = false;
      store
        .pipe(
          select(ProcessSelectors.getProcessLoadingFactory(MOCK_PROCESS_ID))
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getProcessSuccessFactory', () => {
    it('should return success flag', () => {
      store.dispatch(
        new fromActions.EntitySuccessAction(PROCESS_FEATURE, MOCK_PROCESS_ID)
      );

      let result = false;
      store
        .pipe(
          select(ProcessSelectors.getProcessSuccessFactory(MOCK_PROCESS_ID))
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getProcessErrorFactory', () => {
    it('should return success flag', () => {
      store.dispatch(
        new fromActions.EntityFailAction(PROCESS_FEATURE, MOCK_PROCESS_ID)
      );

      let result = false;
      store
        .pipe(select(ProcessSelectors.getProcessErrorFactory(MOCK_PROCESS_ID)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
