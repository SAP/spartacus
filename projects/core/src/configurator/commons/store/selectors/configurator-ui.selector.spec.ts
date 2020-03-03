import { Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { select, Store, StoreModule } from "@ngrx/store";
import { ConfiguratorUiActions } from "../actions";
import { CONFIGURATION_FEATURE, StateWithConfiguration, UiState } from "../configuration-state";
import * as fromReducers from "../reducers/index";
import { ConfiguratorUiSelectors } from "./index";

describe('Configurator selectors', () => {
  let store: Store<StateWithConfiguration>;
  const PRODUCT_CODE = 'CONF_PRODUCT';
  const GROUP_ID = 'currentGroupId';
  const uiState: UiState = {
    currentGroup: GROUP_ID,
    menuParentGroup: null,
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

    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: UiState;
    store
      .pipe(select(ConfiguratorUiSelectors.getUiStateForProduct(PRODUCT_CODE)))
      .subscribe(value => (result = value));

    expect(result).toEqual(undefined);
  });

  it('should return configuration content when selecting with content selector when action was successful', () => {
    store.dispatch(new ConfiguratorUiActions.SetUiState(PRODUCT_CODE, uiState));
    store
      .pipe(select(ConfiguratorUiSelectors.getUiStateForProduct(PRODUCT_CODE)))
      .subscribe(value => expect(value).toEqual(uiState));
  });

  it('should return current group content selector when action was successful', () => {
    store.dispatch(new ConfiguratorUiActions.SetUiState(PRODUCT_CODE, uiState));
    store
      .pipe(
        select(ConfiguratorUiSelectors.getCurrentGroupForProduct(PRODUCT_CODE))
      )
      .subscribe(value => expect(value).toEqual(GROUP_ID));
  });
});
