import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import {
  Configurator,
  GenericConfigurator,
  GenericConfigUtilsService,
} from '@spartacus/core';
import { ConfiguratorActions } from '../actions';
import {
  CONFIGURATOR_FEATURE,
  StateWithConfiguration,
} from '../configuration-state';
import * as fromReducers from '../reducers/index';
import { ConfiguratorSelectors } from './index';

describe('Configurator selectors', () => {
  let store: Store<StateWithConfiguration>;
  let configuratorUtils: GenericConfigUtilsService;
  const productCode = 'CONF_LAPTOP';
  let owner: GenericConfigurator.Owner = {};
  let configuration: Configurator.Configuration = {
    configId: 'a',
  };
  let configurationWithInteractionState: Configurator.Configuration = {
    ...configuration,
    interactionState: {
      currentGroup: null,
      groupsStatus: {},
      groupsVisited: {},
      menuParentGroup: null,
      issueNavigationDone: true,
    },
  };
  const GROUP_ID = 'currentGroupId';
  const GROUP_ID2 = 'currentGroupId2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATOR_FEATURE,
          fromReducers.getConfiguratorReducers()
        ),
      ],
    });

    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    owner = {
      type: GenericConfigurator.OwnerType.PRODUCT,
      id: productCode,
    };
    configuration = {
      configId: 'a',
      productCode: productCode,
      owner: owner,
    };
    configurationWithInteractionState = {
      ...configurationWithInteractionState,
      ...configuration,
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
      .subscribe((value) => (result = value));

    expect(result).toEqual(undefined);
  });

  it('should return configuration content when selecting with content selector when action was successful', () => {
    let result: Configurator.Configuration;
    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );

    store
      .pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
        )
      )
      .subscribe((value) => (result = value));

    expect(result).toEqual(configurationWithInteractionState);
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
      .subscribe((value) => expect(value).toEqual(undefined));
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

  it('should get group status for group', () => {
    store.dispatch(
      new ConfiguratorActions.SetGroupsError({
        entityKey: configuration.owner.key,
        errorGroups: [GROUP_ID],
      })
    );
    store.dispatch(
      new ConfiguratorActions.SetGroupsCompleted({
        entityKey: configuration.owner.key,
        completedGroups: [GROUP_ID2],
      })
    );

    store
      .pipe(
        select(
          ConfiguratorSelectors.getGroupStatus(
            configuration.owner.key,
            GROUP_ID
          )
        )
      )
      .subscribe((value) =>
        expect(value).toEqual(Configurator.GroupStatus.ERROR)
      );

    store
      .pipe(
        select(
          ConfiguratorSelectors.getGroupStatus(
            configuration.owner.key,
            GROUP_ID2
          )
        )
      )
      .subscribe((value) =>
        expect(value).toEqual(Configurator.GroupStatus.COMPLETE)
      );
  });
});
