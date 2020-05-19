import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Configurator } from '../../../../model/configurator.model';
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
  const GROUP_ID = 'currentGroupId';
  const GROUP_ID2 = 'currentGroupId2';
  const uiState: UiState = {
    currentGroup: GROUP_ID,
    menuParentGroup: null,
    groupsStatus: { entities: {} },
    groupsVisited: { entities: {} },
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
      .pipe(select(ConfiguratorUiSelectors.getUiStateForOwner(PRODUCT_CODE)))
      .subscribe((value) => (result = value));

    expect(result).toEqual(undefined);
  });

  it('should return configuration content when selecting with content selector when action was successful', () => {
    store.dispatch(new ConfiguratorUiActions.SetUiState(PRODUCT_CODE, uiState));
    store
      .pipe(select(ConfiguratorUiSelectors.getUiStateForOwner(PRODUCT_CODE)))
      .subscribe((value) => expect(value).toEqual(uiState));
  });

  it('should return current group content selector when action was successful', () => {
    store.dispatch(new ConfiguratorUiActions.SetUiState(PRODUCT_CODE, uiState));
    store
      .pipe(
        select(ConfiguratorUiSelectors.getCurrentGroupForProduct(PRODUCT_CODE))
      )
      .subscribe((value) => expect(value).toEqual(GROUP_ID));
  });

  it('should get Visited Status for group', () => {
    store.dispatch(
      new ConfiguratorUiActions.SetGroupsVisited(PRODUCT_CODE, [GROUP_ID])
    );
    store
      .pipe(
        select(ConfiguratorUiSelectors.isGroupVisited(PRODUCT_CODE, GROUP_ID))
      )
      .subscribe((value) => expect(value).toEqual(true));
  });

  it('should get Visited Status for group many groups, not all visited', () => {
    store.dispatch(
      new ConfiguratorUiActions.SetGroupsVisited(PRODUCT_CODE, [GROUP_ID])
    );
    store
      .pipe(
        select(
          ConfiguratorUiSelectors.areGroupsVisited(PRODUCT_CODE, [
            GROUP_ID,
            GROUP_ID2,
          ])
        )
      )
      .subscribe((value) => expect(value).toEqual(false));
  });

  it('should get Visited Status for group many groups, not all visited', () => {
    store.dispatch(
      new ConfiguratorUiActions.SetGroupsVisited(PRODUCT_CODE, [
        GROUP_ID,
        GROUP_ID2,
      ])
    );
    store
      .pipe(
        select(
          ConfiguratorUiSelectors.areGroupsVisited(PRODUCT_CODE, [
            GROUP_ID,
            GROUP_ID2,
          ])
        )
      )
      .subscribe((value) => expect(value).toEqual(true));
  });

  it('should get group Status for group', () => {
    store.dispatch(
      new ConfiguratorUiActions.SetGroupsError(PRODUCT_CODE, [GROUP_ID])
    );
    store.dispatch(
      new ConfiguratorUiActions.SetGroupsCompleted(PRODUCT_CODE, [GROUP_ID2])
    );

    store
      .pipe(
        select(ConfiguratorUiSelectors.getGroupStatus(PRODUCT_CODE, GROUP_ID))
      )
      .subscribe((value) =>
        expect(value).toEqual(Configurator.GroupStatus.ERROR)
      );

    store
      .pipe(
        select(ConfiguratorUiSelectors.getGroupStatus(PRODUCT_CODE, GROUP_ID2))
      )
      .subscribe((value) =>
        expect(value).toEqual(Configurator.GroupStatus.COMPLETE)
      );
  });
});
