import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConsentTemplate } from '@spartacus/core';
import { LoaderState } from '../../../state';
import * as fromActions from '../actions/user-consents.action';
import * as fromReducers from '../reducers/index';
import { StateWithUser, USER_FEATURE } from '../user-state';
import * as fromSelectors from './user-consents.selectors';

const consents: ConsentTemplate[] = [{ id: 'xxx' }];

describe('User consents selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getConsentsState', () => {
    it('should return consents', () => {
      store.dispatch(new fromActions.LoadUserConsentsSuccess(consents));

      let result: LoaderState<ConsentTemplate[]>;
      store
        .pipe(select(fromSelectors.getConsentsState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: consents,
      });
    });
  });
  describe('getConsentsValue', () => {
    it('should return the value', () => {
      store.dispatch(new fromActions.LoadUserConsentsSuccess(consents));

      let result: ConsentTemplate[];
      store
        .pipe(select(fromSelectors.getConsentsValue))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(consents);
    });
  });
  describe('getConsentsLoading', () => {
    it('should return the loading flag', () => {
      store.dispatch(new fromActions.LoadUserConsents('xxx@xxx.xxx'));

      let result = false;
      store
        .pipe(select(fromSelectors.getConsentsLoading))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getConsentsSuccess', () => {
    it('should return the success value', () => {
      store.dispatch(new fromActions.LoadUserConsentsSuccess([]));

      let result = false;
      store
        .pipe(select(fromSelectors.getConsentsSuccess))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getConsentsError', () => {
    it('should return the error flag', () => {
      store.dispatch(new fromActions.LoadUserConsentsFail('error'));

      let result = false;
      store
        .pipe(select(fromSelectors.getConsentsError))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
