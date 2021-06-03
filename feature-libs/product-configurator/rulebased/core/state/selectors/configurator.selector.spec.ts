import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { ConfiguratorTestUtils } from 'feature-libs/product-configurator/rulebased/shared/testing/configurator-test-utils';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions';
import {
  CONFIGURATOR_FEATURE,
  StateWithConfigurator,
} from '../configurator-state';
import { getConfiguratorReducers } from '../reducers/index';
import { ConfiguratorSelectors } from './index';

describe('Configurator selectors', () => {
  let store: Store<StateWithConfigurator>;
  let configuratorUtils: CommonConfiguratorUtilsService;
  const productCode = 'CONF_LAPTOP';
  let owner = ConfiguratorModelUtils.createInitialOwner();
  let configuration: Configurator.Configuration = ConfiguratorTestUtils.createConfiguration(
    'a',
    owner
  );

  const configurationWithInteractionState: Configurator.Configuration = {
    ...ConfiguratorTestUtils.createConfiguration('a', owner),
    interactionState: {
      currentGroup: undefined,
      groupsVisited: {},
      menuParentGroup: undefined,
      issueNavigationDone: true,
    },
  };
  const GROUP_ID = 'currentGroupId';
  const GROUP_ID2 = 'currentGroupId2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers()),
      ],
    });

    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    owner = ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      productCode
    );

    configuration = {
      ...ConfiguratorTestUtils.createConfiguration('a', owner),
      productCode: productCode,
    };

    configuratorUtils.setOwnerKey(owner);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: Configurator.Configuration;
    store
      .pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
        )
      )
      .subscribe((value) => {
        result = value;
        expect(result).toEqual(undefined);
      });
  });

  it('should return configuration content when selecting with content selector when action was successful', () => {
    let result: Configurator.Configuration;
    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(
        configurationWithInteractionState
      )
    );

    store
      .pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(
            configurationWithInteractionState.owner.key
          )
        )
      )
      .subscribe((value) => {
        result = value;
        expect(result).toEqual(configurationWithInteractionState);
      });
  });

  it('should return pending changes as false for an initial call', () => {
    store
      .pipe(
        select(ConfiguratorSelectors.hasPendingChanges(configuration.owner.key))
      )
      .subscribe((hasPendingChanges) => expect(hasPendingChanges).toBe(false));
  });

  it('should return pending changes as true if an update has happenend', () => {
    store.dispatch(new ConfiguratorActions.UpdateConfiguration(configuration));
    store
      .pipe(
        select(ConfiguratorSelectors.hasPendingChanges(configuration.owner.key))
      )
      .subscribe((hasPendingChanges) => expect(hasPendingChanges).toBe(true));
  });

  it('should return current group content selector when action was successful', () => {
    store.dispatch(
      new ConfiguratorActions.SetCurrentGroup({
        entityKey: configuration.owner.key,
        currentGroup: GROUP_ID,
      })
    );
    store
      .pipe(
        select(ConfiguratorSelectors.getCurrentGroup(configuration.owner.key))
      )
      .subscribe((value) => expect(value).toEqual(GROUP_ID));
  });

  it('should get visited status for group - initial', () => {
    store
      .pipe(
        select(
          ConfiguratorSelectors.isGroupVisited(
            configuration.owner.key,
            GROUP_ID
          )
        )
      )
      .subscribe((value) => expect(value).toEqual(false));
  });

  it('should get visited status for group', () => {
    store.dispatch(
      new ConfiguratorActions.SetGroupsVisited({
        entityKey: configuration.owner.key,
        visitedGroups: [GROUP_ID],
      })
    );
    store
      .pipe(
        select(
          ConfiguratorSelectors.isGroupVisited(
            configuration.owner.key,
            GROUP_ID
          )
        )
      )
      .subscribe((value) => expect(value).toEqual(true));
  });

  it('should get visited status for group many groups, not all visited', () => {
    store.dispatch(
      new ConfiguratorActions.SetGroupsVisited({
        entityKey: configuration.owner.key,
        visitedGroups: [GROUP_ID],
      })
    );
    store
      .pipe(
        select(
          ConfiguratorSelectors.areGroupsVisited(configuration.owner.key, [
            GROUP_ID2,
            GROUP_ID,
          ])
        )
      )
      .subscribe((value) => expect(value).toEqual(false));
  });

  it('should get visited status for group many groups, all visited', () => {
    store.dispatch(
      new ConfiguratorActions.SetGroupsVisited({
        entityKey: configuration.owner.key,
        visitedGroups: [GROUP_ID, GROUP_ID2],
      })
    );
    store
      .pipe(
        select(
          ConfiguratorSelectors.areGroupsVisited(configuration.owner.key, [
            GROUP_ID,
            GROUP_ID2,
          ])
        )
      )
      .subscribe((value) => expect(value).toEqual(true));
  });
});
