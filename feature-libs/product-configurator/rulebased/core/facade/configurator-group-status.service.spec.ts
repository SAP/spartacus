import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {
  GROUP_ID_1,
  GROUP_ID_3,
  GROUP_ID_4,
  GROUP_ID_5,
  GROUP_ID_6,
  GROUP_ID_7,
  GROUP_ID_8,
  productConfiguration,
  productConfigurationWithConflicts,
} from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

describe('ConfiguratorGroupStatusService', () => {
  let classUnderTest: ConfiguratorGroupStatusService;
  let store: Store<StateWithConfigurator>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [ConfiguratorUtilsService, ConfiguratorGroupStatusService],
    }).compileComponents();
  }));

  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorGroupStatusService as Type<ConfiguratorGroupStatusService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(productConfiguration));
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('Group Status Tests', () => {
    it('should call setGroupVisisted action on setGroupStatus method call', () => {
      classUnderTest.setGroupStatusVisited(
        productConfiguration,
        productConfiguration.groups[0].id
      );

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_1],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get parent group, when all subgroups are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));
      classUnderTest.setGroupStatusVisited(productConfiguration, GROUP_ID_4);

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_4, GROUP_ID_3],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should not get parent group, when not all subgroups are visited', () => {
      //Not all subgroups are visited
      spyOn(store, 'select').and.returnValue(of(false));

      classUnderTest.setGroupStatusVisited(productConfiguration, GROUP_ID_6);

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_6],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get all parent groups, when lowest subgroup are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));

      classUnderTest.setGroupStatusVisited(productConfiguration, GROUP_ID_8);

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_8, GROUP_ID_7, GROUP_ID_5],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('getFirstIncompleteGroup', () => {
    const PARENT_TAB_ID = 'parent-tab';
    const ROW_GROUP_ID = 'CONTAINER_ROW@1067@row-1';
    const NESTED_TAB_ID = `${ROW_GROUP_ID}@1`;
    const NESTED_TAB_2_ID = `${ROW_GROUP_ID}@2`;
    const LATER_TAB_ID = 'later-tab';

    function createAttributeGroup(
      id: string,
      options: {
        complete?: boolean;
        messages?: Configurator.Message[];
        subGroups?: Configurator.Group[];
      } = {}
    ): Configurator.Group {
      return {
        ...ConfiguratorTestUtils.createGroup(id),
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        complete: options.complete,
        messages: options.messages,
        subGroups: options.subGroups ?? [],
      };
    }

    function createRowGroup(
      id: string,
      subGroups: Configurator.Group[],
      options: {
        complete?: boolean;
        messages?: Configurator.Message[];
      } = {}
    ): Configurator.Group {
      return {
        ...ConfiguratorTestUtils.createGroup(id),
        groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
        complete: options.complete,
        messages: options.messages,
        subGroups,
      };
    }

    function createConfig(
      groups: Configurator.Group[],
      flatGroups: Configurator.Group[]
    ): Configurator.Configuration {
      return {
        ...ConfiguratorTestUtils.createConfiguration('1'),
        groups,
        flatGroups,
      };
    }

    it('should get first incomplete group', () => {
      expect(
        classUnderTest.getFirstIncompleteGroup(productConfiguration)?.id
      ).toBe(productConfiguration.flatGroups[0].id);
    });

    it('should get first incomplete group - only consider non conflict groups', () => {
      expect(
        classUnderTest.getFirstIncompleteGroup(
          productConfigurationWithConflicts
        )?.id
      ).toBe(productConfigurationWithConflicts.flatGroups[3].id);
    });

    it('should return a complete navigable group that carries a warning message', () => {
      const warningGroup = createAttributeGroup(GROUP_ID_1, {
        complete: true,
        messages: [
          {
            message: 'Too many units',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
      });
      const configuration = createConfig([warningGroup], [warningGroup]);

      expect(classUnderTest.getFirstIncompleteGroup(configuration)?.id).toBe(
        GROUP_ID_1
      );
    });

    it('should not treat a complete group with only an info message as incomplete', () => {
      const infoGroup = createAttributeGroup(GROUP_ID_1, {
        complete: true,
        messages: [
          {
            message: 'Check quantity',
            severity: Configurator.MessageSeverity.INFO,
          },
        ],
      });
      const configuration = createConfig([infoGroup], [infoGroup]);

      expect(
        classUnderTest.getFirstIncompleteGroup(configuration)
      ).toBeUndefined();
    });

    it('should not treat a complete group with a message without severity as incomplete', () => {
      const unspecifiedGroup = createAttributeGroup(GROUP_ID_1, {
        complete: true,
        messages: [{ message: 'Unspecified tip' }],
      });
      const configuration = createConfig(
        [unspecifiedGroup],
        [unspecifiedGroup]
      );

      expect(
        classUnderTest.getFirstIncompleteGroup(configuration)
      ).toBeUndefined();
    });

    it('should resolve a container row group with a warning message to its first nested tab', () => {
      const nestedTab = createAttributeGroup(NESTED_TAB_ID, {
        complete: true,
      });
      const rowGroup = createRowGroup(ROW_GROUP_ID, [nestedTab], {
        complete: true,
        messages: [
          {
            message: 'Check zoom range',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
      });
      const parentTab = createAttributeGroup(PARENT_TAB_ID, {
        complete: true,
        subGroups: [rowGroup],
      });
      const configuration = createConfig([parentTab], [parentTab, nestedTab]);

      expect(classUnderTest.getFirstIncompleteGroup(configuration)?.id).toBe(
        NESTED_TAB_ID
      );
    });

    it('should prefer an incomplete nested tab over the first nested tab of a warning row group', () => {
      const completeNestedTab = createAttributeGroup(NESTED_TAB_ID, {
        complete: true,
      });
      const incompleteNestedTab = createAttributeGroup(NESTED_TAB_2_ID, {
        complete: false,
      });
      const rowGroup = createRowGroup(
        ROW_GROUP_ID,
        [completeNestedTab, incompleteNestedTab],
        {
          complete: true,
          messages: [
            {
              message: 'Check zoom range',
              severity: Configurator.MessageSeverity.WARNING,
            },
          ],
        }
      );
      const parentTab = createAttributeGroup(PARENT_TAB_ID, {
        complete: true,
        subGroups: [rowGroup],
      });
      const configuration = createConfig(
        [parentTab],
        [parentTab, completeNestedTab, incompleteNestedTab]
      );

      expect(classUnderTest.getFirstIncompleteGroup(configuration)?.id).toBe(
        NESTED_TAB_2_ID
      );
    });

    it('should resolve a container row group flagged incomplete to its nested configuration', () => {
      const nestedTab = createAttributeGroup(NESTED_TAB_ID, {
        complete: true,
      });
      const rowGroup = createRowGroup(ROW_GROUP_ID, [nestedTab], {
        complete: false,
      });
      const parentTab = createAttributeGroup(PARENT_TAB_ID, {
        complete: true,
        subGroups: [rowGroup],
      });
      const configuration = createConfig([parentTab], [parentTab, nestedTab]);

      expect(classUnderTest.getFirstIncompleteGroup(configuration)?.id).toBe(
        NESTED_TAB_ID
      );
    });

    it('should never return a non-navigable group itself', () => {
      const nestedTab = createAttributeGroup(NESTED_TAB_ID, {
        complete: true,
      });
      const rowGroup = createRowGroup(ROW_GROUP_ID, [nestedTab], {
        complete: true,
        messages: [
          {
            message: 'Check zoom range',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
      });
      const parentTab = createAttributeGroup(PARENT_TAB_ID, {
        complete: true,
        subGroups: [rowGroup],
      });
      const configuration = createConfig([parentTab], [parentTab, nestedTab]);

      const result = classUnderTest.getFirstIncompleteGroup(configuration);
      expect(result?.id).not.toBe(ROW_GROUP_ID);
      expect(result?.groupType).not.toBe(
        Configurator.GroupType.CONTAINER_ROW_GROUP
      );
    });

    it('should skip a non-navigable group without navigable descendants and continue', () => {
      const orphanRowGroup = createRowGroup(ROW_GROUP_ID, [], {
        complete: true,
        messages: [
          {
            message: 'Check zoom range',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
      });
      const laterTab = createAttributeGroup(LATER_TAB_ID, {
        complete: false,
      });
      const configuration = createConfig(
        [orphanRowGroup, laterTab],
        [laterTab]
      );

      expect(classUnderTest.getFirstIncompleteGroup(configuration)?.id).toBe(
        LATER_TAB_ID
      );
    });

    it('should skip conflict groups and conflict header groups', () => {
      const conflictHeader: Configurator.Group = {
        ...ConfiguratorTestUtils.createGroup('CONFLICT_HEADER'),
        groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
        complete: false,
        subGroups: [
          {
            ...ConfiguratorTestUtils.createGroup('CONFLICT_1'),
            groupType: Configurator.GroupType.CONFLICT_GROUP,
            complete: false,
          },
        ],
      };
      const attributeGroup = createAttributeGroup(GROUP_ID_1, {
        complete: false,
      });
      const configuration = createConfig(
        [conflictHeader, attributeGroup],
        [conflictHeader.subGroups[0], attributeGroup]
      );

      expect(classUnderTest.getFirstIncompleteGroup(configuration)?.id).toBe(
        GROUP_ID_1
      );
    });
  });
});
