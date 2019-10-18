import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConfiguratorUiActions } from '../actions';
import {
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
  UiState,
} from '../configuration-state';
import * as fromReducers from '../reducers/index';
import { ConfiguratorUiSelectors } from './index';

describe('Configurator selectors', () => {
  let store: Store<StateWithConfiguration>;
  const PRODUCT_CODE = 'CONF_PRODUCT';
  const uiState: UiState = {
    currentGroup: 'currentGroupId',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromReducers.getConfiguratorReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: UiState;
    store
      .pipe(select(ConfiguratorUiSelectors.getUiStateFactory(PRODUCT_CODE)))
      .subscribe(value => (result = value));

    expect(result).toEqual(undefined);
  });

  it('should return configuration content when selecting with content selector when action was successful', () => {
    let result: UiState;
    store
      .pipe(select(ConfiguratorUiSelectors.getUiStateFactory(PRODUCT_CODE)))
      .subscribe(value => (result = value));

    store.dispatch(new ConfiguratorUiActions.SetUiState(PRODUCT_CODE, uiState));

    expect(result).toEqual(uiState);
  });
});
