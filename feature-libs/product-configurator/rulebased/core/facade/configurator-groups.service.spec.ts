import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { firstValueFrom, Observable, of } from 'rxjs';
import {
  CONFIG_ID,
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_3,
  GROUP_ID_4,
  GROUP_ID_10,
  GROUP_ID_CONFLICT_3,
  DESCRIPTION_FOR,
  productConfiguration,
  productConfigurationWithConflicts,
} from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { Configurator } from './../model/configurator.model';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';
import { vi } from 'vitest';

const PRODUCT_CONFIG_CURRENT_GROUP_IS_CONFLICT: Configurator.Configuration = {
  ...productConfigurationWithConflicts,
  interactionState: {
    ...productConfigurationWithConflicts.interactionState,
    currentGroup: GROUP_ID_CONFLICT_3,
    isConflictResolutionMode: true,
  },
};

class MockActiveCartService {}
class MockConfiguratorCartService {
  checkForActiveCartUpdateDone(): Observable<boolean> {
    return of(true);
  }
}

describe('ConfiguratorGroupsService', () => {
  let classUnderTest: ConfiguratorGroupsService;
  let store: Store<StateWithConfigurator>;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configGroupStatusService: ConfiguratorGroupStatusService;
  let configFacadeUtilsService: ConfiguratorUtilsService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorGroupsService,
        ConfiguratorCommonsService,
        ConfiguratorGroupStatusService,
        ConfiguratorUtilsService,
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        {
          provide: ConfiguratorCartService,
          useClass: MockConfiguratorCartService,
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configGroupStatusService = TestBed.inject(
      ConfiguratorGroupStatusService as Type<ConfiguratorGroupStatusService>
    );
    configFacadeUtilsService = TestBed.inject(
      ConfiguratorUtilsService as Type<ConfiguratorUtilsService>
    );

    vi.spyOn(store, 'dispatch').mockImplementation(() => {});
    vi.spyOn(store, 'pipe').mockReturnValue(of(productConfiguration));

    vi.spyOn(configGroupStatusService, 'setGroupStatusVisited');
    vi.spyOn(configGroupStatusService, 'isGroupVisited');
    vi.spyOn(configFacadeUtilsService, 'getParentGroup');
    vi.spyOn(configFacadeUtilsService, 'hasSubGroups');
    vi.spyOn(configFacadeUtilsService, 'getGroupById');
  });

  it('should create service', () => {
    vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
      of(productConfiguration)
    );
    expect(classUnderTest).toBeDefined();
  });

  describe('getCurrentGroupId', () => {
    it('should return a current group ID from state', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const currentGroup = classUnderTest.getCurrentGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      const groupId = await firstValueFrom(currentGroup);
      expect(groupId).toBe(GROUP_ID_2);
    });

    it('should return a current group ID from configuration', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of({
          ...productConfiguration,
          interactionState: { currentGroup: null },
        })
      );
      const currentGroup = classUnderTest.getCurrentGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      const groupId = await firstValueFrom(currentGroup);
      expect(groupId).toBe(GROUP_ID_1);
    });

    it('should return undefined if no group exist', async () => {
      const configNoGroups: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'abc',
          ConfiguratorModelUtils.createInitialOwner()
        ),
      };
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configNoGroups)
      );

      const currentGroupId = classUnderTest.getCurrentGroupId(
        productConfiguration.owner
      );
      const groupId = await firstValueFrom(currentGroupId);
      expect(groupId).toBeUndefined();
    });
  });

  describe('getMenuParentGroup', () => {
    it('should get the parentGroup from uiState', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const parentGroup = classUnderTest.getMenuParentGroup(
        productConfiguration.owner
      );

      expect(parentGroup).toBeDefined();
      const group = await firstValueFrom(parentGroup);
      expect(group).toBe(productConfiguration.groups[2]);
    });

    it('should return undefined if menu parent group is not availaible in uiState', async () => {
      const configurationWoMenuParentGroup =
        ConfiguratorTestUtils.createConfiguration(
          CONFIG_ID,
          ConfiguratorModelUtils.createInitialOwner()
        );
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configurationWoMenuParentGroup)
      );
      const parentGroup = classUnderTest.getMenuParentGroup(
        productConfiguration.owner
      );

      expect(parentGroup).toBeDefined();
      const group = await firstValueFrom(parentGroup);
      expect(group).toBeUndefined();
    });

    it('should return undefined if menu parent group cannot be found', async () => {
      const configurationWoMenuParentGroup: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          CONFIG_ID,
          ConfiguratorModelUtils.createInitialOwner()
        ),
        interactionState: {
          menuParentGroup: 'Conflict header group that is gone',
        },
      };
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configurationWoMenuParentGroup)
      );
      const parentGroup = classUnderTest.getMenuParentGroup(
        productConfiguration.owner
      );

      expect(parentGroup).toBeDefined();
      const group = await firstValueFrom(parentGroup);
      expect(group).toBeUndefined();
    });
  });

  describe('getNextGroupId', () => {
    it('should return a next group', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const currentGroup = classUnderTest.getNextGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      const groupId = await firstValueFrom(currentGroup);
      expect(groupId).toBe(GROUP_ID_4);
    });
  });

  describe('getDescriptionForGroupId', () => {
    it('should return description for group', () => {
      expect(
        classUnderTest['getDescriptionForGroupId'](
          GROUP_ID_4,
          productConfiguration
        )
      ).toBe(DESCRIPTION_FOR + GROUP_ID_4);
    });

    it('should return description of first gropu if group id cannot be found', () => {
      expect(
        classUnderTest['getDescriptionForGroupId'](
          'unknownGroupId',
          productConfiguration
        )
      ).toBe(DESCRIPTION_FOR + GROUP_ID_1);
    });
  });

  describe('getNextGroupDescription', () => {
    it('should return description of next group', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const nextGroupDescription =
        classUnderTest.getNextGroupDescription(productConfiguration);

      expect(nextGroupDescription).toBeDefined();
      const description = await firstValueFrom(nextGroupDescription);
      expect(description).toBe(DESCRIPTION_FOR + GROUP_ID_4);
    });

    it('should return empty string if no next group exists', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      productConfiguration.interactionState.currentGroup = GROUP_ID_10;
      const nextGroupDescription =
        classUnderTest.getNextGroupDescription(productConfiguration);

      expect(nextGroupDescription).toBeDefined();
      const description = await firstValueFrom(nextGroupDescription);
      expect(description).toBe('');
      productConfiguration.interactionState.currentGroup = GROUP_ID_2;
    });
  });

  describe('getPreviousGroupId', () => {
    it('should return a previous group ID', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const currentGroup = classUnderTest.getPreviousGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      const groupId = await firstValueFrom(currentGroup);
      expect(groupId).toBe(GROUP_ID_1);
    });

    it('should return null in case configuration is in immediate conflict resolution and previous group is a conflict one', async () => {
      let configurationWithConflicts = structuredClone(
        productConfigurationWithConflicts
      );
      configurationWithConflicts.immediateConflictResolution = true;

      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configurationWithConflicts)
      );
      const currentGroup = classUnderTest.getPreviousGroupId(
        configurationWithConflicts.owner
      );

      expect(currentGroup).toBeDefined();
      const groupId = await firstValueFrom(currentGroup);
      expect(groupId).toBeUndefined();
    });

    it('should return a previous group ID in case configuration is in immediate conflict resolution and previous group not is a conflict one', async () => {
      let configurationWithConflicts = structuredClone(
        productConfigurationWithConflicts
      );
      configurationWithConflicts.immediateConflictResolution = true;
      configurationWithConflicts.interactionState.currentGroup = GROUP_ID_2;
      configurationWithConflicts.interactionState.menuParentGroup = GROUP_ID_3;

      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configurationWithConflicts)
      );
      const currentGroup = classUnderTest.getPreviousGroupId(
        configurationWithConflicts.owner
      );

      expect(currentGroup).toBeDefined();
      const groupId = await firstValueFrom(currentGroup);
      expect(groupId).toBe(GROUP_ID_1);
    });
  });

  describe('getPreviousGroupDescription', () => {
    it('should return description of previous group', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const previousGroupDescription =
        classUnderTest.getPreviousGroupDescription(productConfiguration);

      expect(previousGroupDescription).toBeDefined();
      const description = await firstValueFrom(previousGroupDescription);
      expect(description).toBe(DESCRIPTION_FOR + GROUP_ID_1);
    });

    it('should return empty string if no previous group exists', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      productConfiguration.interactionState.currentGroup = GROUP_ID_1;
      const previousGroupDescription =
        classUnderTest.getPreviousGroupDescription(productConfiguration);

      expect(previousGroupDescription).toBeDefined();
      const description = await firstValueFrom(previousGroupDescription);
      expect(description).toBe('');
      productConfiguration.interactionState.currentGroup = GROUP_ID_2;
    });
  });

  describe('setGroupStatusVisited', () => {
    it('should call setGroupStatusVisited of groupStatusService', () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      classUnderTest.setGroupStatusVisited(
        productConfiguration.owner,
        productConfiguration.groups[0].id
      );

      expect(configGroupStatusService.setGroupStatusVisited).toHaveBeenCalled();
    });
  });

  it('should delegate setting the parent group to the store', () => {
    vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
      of(productConfiguration)
    );
    classUnderTest.setMenuParentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new ConfiguratorActions.SetMenuParentGroup({
      entityKey: productConfiguration.owner.key,
      menuParentGroup: GROUP_ID_1,
    });
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call group status in navigate to different group', () => {
    vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
      of(productConfiguration)
    );
    classUnderTest.navigateToGroup(
      productConfiguration,
      productConfiguration.groups[2].id
    );

    expect(configGroupStatusService.setGroupStatusVisited).toHaveBeenCalled();
  });

  it('should check whether isGroupVisited has been called by the configuration group utils service', () => {
    classUnderTest.isGroupVisited(productConfiguration.owner, GROUP_ID_4);
    expect(configGroupStatusService.isGroupVisited).toHaveBeenCalledWith(
      productConfiguration.owner,
      GROUP_ID_4
    );
    expect(configGroupStatusService.isGroupVisited).toHaveBeenCalled();
  });

  it('should get first conflict group from configuration, no conflicts', () => {
    expect(classUnderTest.getFirstConflictGroup(productConfiguration)).toBe(
      undefined
    );
  });

  it('should get first conflict group from configuration', () => {
    expect(
      classUnderTest.getFirstConflictGroup(productConfigurationWithConflicts)
    ).toBe(productConfigurationWithConflicts.flatGroups[0]);
  });

  describe('navigateToConflictSolver', () => {
    it('should trigger change group action in case conflict group deviates from current one', () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfigurationWithConflicts)
      );
      classUnderTest.navigateToConflictSolver(
        productConfigurationWithConflicts.owner
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.ChangeGroup({
          configuration: productConfigurationWithConflicts,
          groupId: productConfigurationWithConflicts.flatGroups[0].id,
          parentGroupId: productConfigurationWithConflicts.groups[0].id,
          conflictResolutionMode: true,
        })
      );
    });
    it('should also trigger change group action in case current group is already the first conflict group because group menu component relies on interactionState.issueNavigationDone', () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(PRODUCT_CONFIG_CURRENT_GROUP_IS_CONFLICT)
      );
      classUnderTest.navigateToConflictSolver(
        PRODUCT_CONFIG_CURRENT_GROUP_IS_CONFLICT.owner
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.ChangeGroup({
          configuration: PRODUCT_CONFIG_CURRENT_GROUP_IS_CONFLICT,
          groupId: PRODUCT_CONFIG_CURRENT_GROUP_IS_CONFLICT.flatGroups[0].id,
          parentGroupId: PRODUCT_CONFIG_CURRENT_GROUP_IS_CONFLICT.groups[0].id,
          conflictResolutionMode: true,
        })
      );
    });
    it('should not navigate in case no conflict group is present', () => {
      const consistentConfiguration =
        ConfiguratorTestUtils.createConfiguration('1');
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(consistentConfiguration)
      );
      classUnderTest.navigateToConflictSolver(consistentConfiguration.owner);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('navigateToFirstIncompleteGroup', () => {
    it('should go to first incomplete group', () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      classUnderTest.navigateToFirstIncompleteGroup(productConfiguration.owner);

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.ChangeGroup({
          configuration: productConfiguration,
          groupId: productConfiguration.flatGroups[0].id,
          parentGroupId: undefined,
          conflictResolutionMode: false,
        })
      );
    });
    it('should not navigate in case no incomplete group is present', () => {
      const completeConfiguration =
        ConfiguratorTestUtils.createConfiguration('1');
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(completeConfiguration)
      );
      classUnderTest.navigateToFirstIncompleteGroup(productConfiguration.owner);

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  it('should delegate calls for parent group to the facade utils service', () => {
    classUnderTest.getParentGroup(
      productConfiguration.groups,
      productConfiguration.groups[2].subGroups[0]
    );
    expect(configFacadeUtilsService.getParentGroup).toHaveBeenCalledWith(
      productConfiguration.groups,
      productConfiguration.groups[2].subGroups[0]
    );
  });

  it('should delegate calls for sub groups to the facade utils service', () => {
    classUnderTest.hasSubGroups(productConfiguration.groups[2]);
    expect(configFacadeUtilsService.hasSubGroups).toHaveBeenCalledWith(
      productConfiguration.groups[2]
    );
    expect(configFacadeUtilsService.hasSubGroups).toHaveBeenCalled();
  });

  it('should return true if groupType is a conflict group type otherwise false', () => {
    expect(
      classUnderTest.isConflictGroupType(
        Configurator.GroupType.CONFLICT_HEADER_GROUP
      )
    ).toBe(true);
    expect(
      classUnderTest.isConflictGroupType(Configurator.GroupType.CONFLICT_GROUP)
    ).toBe(true);
    expect(
      classUnderTest.isConflictGroupType(Configurator.GroupType.ATTRIBUTE_GROUP)
    ).toBe(false);
  });

  describe('getConflictGroupForImmediateConflictResolution', () => {
    it('should not return any conflict group because showConflictSolverDialog is not defined', async () => {
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(productConfiguration)
      );
      const conflictGroups =
        classUnderTest.getConflictGroupForImmediateConflictResolution(
          productConfiguration.owner
        );

      expect(conflictGroups).toBeDefined();
      const group = await firstValueFrom(conflictGroups);
      expect(group).toBeUndefined();
    });

    it('should not return any conflict group because showConflictSolverDialog is set to false', async () => {
      let configurationWithConflicts = structuredClone(
        productConfigurationWithConflicts
      );
      configurationWithConflicts.interactionState.showConflictSolverDialog =
        false;
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configurationWithConflicts)
      );
      const conflictGroups =
        classUnderTest.getConflictGroupForImmediateConflictResolution(
          configurationWithConflicts.owner
        );

      expect(conflictGroups).toBeDefined();
      const group = await firstValueFrom(conflictGroups);
      expect(group).toBeUndefined();
    });

    it('should return a conflict group', async () => {
      let configurationWithConflicts = structuredClone(
        productConfigurationWithConflicts
      );
      configurationWithConflicts.interactionState.showConflictSolverDialog =
        true;
      vi.spyOn(configuratorCommonsService, 'getConfiguration').mockReturnValue(
        of(configurationWithConflicts)
      );
      const conflictGroups =
        classUnderTest.getConflictGroupForImmediateConflictResolution(
          configurationWithConflicts.owner
        );

      expect(conflictGroups).toBeDefined();
      const group = await firstValueFrom(conflictGroups);
      expect(group).not.toBeUndefined();
      expect(group?.id).toEqual(GROUP_ID_CONFLICT_3);
    });
  });

  describe('isConflictGroupInImmediateConflictResolutionMode', () => {
    it('should return false in case group type is undefined', () => {
      expect(
        classUnderTest['isConflictGroupInImmediateConflictResolutionMode'](
          undefined
        )
      ).toBe(false);
    });

    it('should return false in case group type is AttributeGroup', () => {
      const result = classUnderTest[
        'isConflictGroupInImmediateConflictResolutionMode'
      ](Configurator.GroupType.ATTRIBUTE_GROUP, true);
      expect(result).toBe(false);
    });

    it('should return false in case immediateConflictResolution attributes is set to false', () => {
      expect(
        classUnderTest['isConflictGroupInImmediateConflictResolutionMode'](
          Configurator.GroupType.CONFLICT_GROUP
        )
      ).toBe(false);
    });

    it('should return true in case group type is ConflictGroup and immediateConflictResolution is set to true', () => {
      expect(
        classUnderTest['isConflictGroupInImmediateConflictResolutionMode'](
          Configurator.GroupType.CONFLICT_GROUP,
          true
        )
      ).toBe(true);
    });
  });
});
