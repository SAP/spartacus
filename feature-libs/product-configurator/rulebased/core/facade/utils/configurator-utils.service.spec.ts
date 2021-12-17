import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { StateUtils } from '@spartacus/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import {
  ATTRIBUTE_1_CHECKBOX,
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_4,
  productConfiguration,
  subGroupWith2Attributes,
} from '../../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorUtilsService } from './configurator-utils.service';

const CONFIG_ID = '1234-56-7890';

const GROUP_ID_3 = '23456-45-2';
const GROUP_ID_31 = '23456-75-2';
const GROUP_ID_4_ROOT = '23456-45-3';
const GROUP_NAME = 'Software';
const GROUP_NAME_2 = 'Hardware';
const GROUP_NAME_LEVEL1_CHILD = 'Child group 1';
const GROUP_NAME_LEVEL1_CHILD_2 = 'Child group 2';
const GROUP_ROOT = 'Root level group';

const ATTRIBUTE_NAME_2 = 'Attribute_DropDown';
const ATTRIBUTE_NAME_3_1 = 'Attribute_1';
const ATTRIBUTE_NAME_3_2 = 'Attribute_DropDown';
const PRODUCT_CODE = 'CONF_LAPTOP';
const OWNER_PRODUCT = ConfiguratorModelUtils.createInitialOwner();
const group1: Configurator.Group = {
  ...ConfiguratorTestUtils.createGroup(GROUP_ID_1),
  name: GROUP_NAME,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  attributes: [
    {
      name: ATTRIBUTE_1_CHECKBOX,
      uiType: Configurator.UiType.STRING,
      userInput: 'input',
    },
    {
      name: ATTRIBUTE_NAME_2,
      uiType: Configurator.UiType.DROPDOWN,
      userInput: undefined,
    },
  ],
};

const group2: Configurator.Group = {
  ...ConfiguratorTestUtils.createGroup(GROUP_ID_2),
  name: GROUP_NAME_2,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
};

const group31: Configurator.Group = {
  ...ConfiguratorTestUtils.createGroup(GROUP_ID_31),
  name: GROUP_NAME_LEVEL1_CHILD_2,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
};

const group3: Configurator.Group = {
  id: GROUP_ID_3,
  name: GROUP_NAME_LEVEL1_CHILD,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  subGroups: [group1, group2],
  attributes: [
    {
      name: ATTRIBUTE_NAME_3_1,
      uiType: Configurator.UiType.STRING,
      userInput: 'input',
    },
    {
      name: ATTRIBUTE_NAME_3_2,
      uiType: Configurator.UiType.DROPDOWN,
      userInput: undefined,
    },
  ],
};

const group4: Configurator.Group = {
  id: GROUP_ID_4_ROOT,
  name: GROUP_ROOT,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  subGroups: [group3, group31],
};

const productConfigurationMultiLevel: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER_PRODUCT),
  productCode: PRODUCT_CODE,
  groups: [group4],
};

const updateType: Configurator.UpdateType = Configurator.UpdateType.ATTRIBUTE;

function mergeChangesAndGetFirstGroup(
  serviceUnderTest: ConfiguratorUtilsService,
  changedAttribute: Configurator.Attribute,
  configuration: Configurator.Configuration
) {
  const configurationForSendingChanges =
    serviceUnderTest.createConfigurationExtract(
      changedAttribute,
      configuration,
      updateType
    );

  expect(configurationForSendingChanges).toBeDefined();
  const groups = configurationForSendingChanges.groups;
  expect(groups).toBeDefined();
  expect(groups.length).toBe(1);
  const groupForUpdateRequest = groups[0];
  return groupForUpdateRequest;
}

describe('ConfiguratorUtilsService', () => {
  let classUnderTest: ConfiguratorUtilsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [ConfiguratorUtilsService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorUtilsService as Type<ConfiguratorUtilsService>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should find parent group from group', () => {
    const parentGroup = classUnderTest.getParentGroup(
      productConfiguration.groups,
      subGroupWith2Attributes,
      undefined
    );

    expect(parentGroup).toBe(productConfiguration.groups[2]);
  });

  it('should check if subgroups exist', () => {
    const groupWithoutSubgroups = productConfiguration.groups[1];
    expect(classUnderTest.hasSubGroups(groupWithoutSubgroups)).toBe(false);
    const groupWithSubgroups = productConfiguration.groups[3];
    expect(classUnderTest.hasSubGroups(groupWithSubgroups)).toBe(true);
  });

  describe('isConfigurationCreated', () => {
    it('should tell from config ID', () => {
      const configuration: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'a',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        flatGroups: [ConfiguratorTestUtils.createGroup('1')],
      };
      expect(classUnderTest.isConfigurationCreated(configuration)).toBe(true);
    });
    it('should tell from blank config ID', () => {
      const configuration: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          '',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        flatGroups: [],
      };
      expect(classUnderTest.isConfigurationCreated(configuration)).toBe(false);
    });
    it('should know that config is not created in case the groups are not defined', () => {
      const configuration: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'a',
          ConfiguratorModelUtils.createInitialOwner()
        ),
      };
      expect(classUnderTest.isConfigurationCreated(configuration)).toBe(false);
    });
    it('should know that config is created in case the groups are not defined but the overview aspect exists due to an order history read', () => {
      const configuration: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'a',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        overview: { configId: CONFIG_ID },
      };
      expect(classUnderTest.isConfigurationCreated(configuration)).toBe(true);
    });
  });

  describe('buildGroupPath', () => {
    it('should create a group path for a single level model', () => {
      const groupPath: Configurator.Group[] = [];
      classUnderTest.buildGroupPath(
        GROUP_ID_1,
        productConfiguration.groups,
        groupPath
      );
      expect(groupPath.length).toBe(1);
      expect(groupPath[0].id).toBe(GROUP_ID_1);
    });

    it('should create an empty group path for a single level model in case ID does not match', () => {
      const groupPath: Configurator.Group[] = [];
      classUnderTest.buildGroupPath(
        'Not known',
        productConfiguration.groups,
        groupPath
      );
      expect(groupPath.length).toBe(0);
    });

    it('should create a group path for a multi level model', () => {
      const groupPath: Configurator.Group[] = [];
      classUnderTest.buildGroupPath(
        GROUP_ID_1,
        productConfigurationMultiLevel.groups,
        groupPath
      );
      expect(groupPath.length).toBe(3);
      expect(groupPath[2].name).toBe(GROUP_ROOT);
      expect(groupPath[0].name).toBe(GROUP_NAME);
    });

    it('should create an empty group path for a multi level model in case ID does not match', () => {
      const groupPath: Configurator.Group[] = [];
      classUnderTest.buildGroupPath(
        'Not known',
        productConfigurationMultiLevel.groups,
        groupPath
      );
      expect(groupPath.length).toBe(0);
    });
  });

  describe('createConfigurationExtract', () => {
    it('should create a new configuration object for changes received, containing one group', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_1_CHECKBOX,
        groupId: GROUP_ID_1,
      };

      const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
        classUnderTest,
        changedAttribute,
        productConfiguration
      );
      expect(groupForUpdateRequest.id).toBe(GROUP_ID_1);
      //group name not needed for update
      expect(groupForUpdateRequest.name).toBeUndefined();
      expect(groupForUpdateRequest.groupType).toBe(
        Configurator.GroupType.ATTRIBUTE_GROUP
      );
    });

    it('should be able to handle multilevel configurations as well, returning a projection of the original configuration with only the path to the changes', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_1_CHECKBOX,
        groupId: GROUP_ID_1,
      };

      const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
        classUnderTest,
        changedAttribute,
        productConfigurationMultiLevel
      );
      expect(groupForUpdateRequest.id).toBe(GROUP_ID_4_ROOT);
      expect(groupForUpdateRequest.name).toBeUndefined();
      expect(groupForUpdateRequest.groupType).toBe(
        Configurator.GroupType.ATTRIBUTE_GROUP
      );

      expect(groupForUpdateRequest.subGroups?.length).toBe(1);
      const firstSubGroup = groupForUpdateRequest.subGroups
        ? groupForUpdateRequest.subGroups[0]
        : undefined;
      if (firstSubGroup?.subGroups) {
        expect(firstSubGroup.subGroups[0].attributes).toEqual([
          changedAttribute,
        ]);
      } else {
        fail();
      }
    });

    it('should create a new configuration object for changes received, containing exactly one attribute as part of the current group', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_1_CHECKBOX,
        groupId: GROUP_ID_1,
      };

      const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
        classUnderTest,
        changedAttribute,
        productConfiguration
      );
      const attributes = groupForUpdateRequest.attributes;
      expect(attributes).toBeDefined();
      expect(attributes?.length).toBe(1);
      if (attributes) {
        expect(attributes[0]).toBe(changedAttribute);
      }
    });

    it('should throw an error if group for change is not part of the configuration', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_1_CHECKBOX,
        groupId: 'unknown',
      };

      expect(function () {
        classUnderTest.createConfigurationExtract(
          changedAttribute,
          productConfiguration,
          updateType
        );
      }).toThrow();
    });

    it('should create a new configuration in case if no updateType parameter in the call', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_1_CHECKBOX,
        groupId: GROUP_ID_1,
      };
      const configurationForSendingChanges =
        classUnderTest.createConfigurationExtract(
          changedAttribute,
          productConfiguration
        );
      expect(configurationForSendingChanges.updateType).toBe(
        Configurator.UpdateType.ATTRIBUTE
      );
    });
  });

  describe('getConfigurationFromState', () => {
    it('should retrieve configuration from state', () => {
      const configurationState: StateUtils.ProcessesLoaderState<Configurator.Configuration> =
        {
          value: productConfiguration,
        };
      expect(classUnderTest.getConfigurationFromState(configurationState)).toBe(
        productConfiguration
      );
    });
    it('should throw error in case no configuration is present in state', () => {
      const configurationState: StateUtils.ProcessesLoaderState<Configurator.Configuration> =
        {};
      expect(() =>
        classUnderTest.getConfigurationFromState(configurationState)
      ).toThrowError();
    });
  });

  describe('getOptionalGroupById', () => {
    it('should find group from group id if present on the root level', () => {
      const group = classUnderTest.getOptionalGroupById(
        productConfiguration.groups,
        GROUP_ID_2
      );
      expect(group).toBe(productConfiguration.groups[1]);
    });

    it('should find group from group id if present as sub group', () => {
      const group = classUnderTest.getOptionalGroupById(
        productConfiguration.groups,
        GROUP_ID_4
      );
      expect(group).toBe(subGroupWith2Attributes);
    });

    it('should return undefined if group cannot be found', () => {
      const group = classUnderTest.getOptionalGroupById(
        productConfiguration.groups,
        'UNKNOWN_ID'
      );
      expect(group).toBeUndefined();
    });
  });

  describe('getGroupById', () => {
    it('should find group from group id if present on the root level', () => {
      const group = classUnderTest.getGroupById(
        productConfiguration.groups,
        GROUP_ID_2
      );
      expect(group).toBe(productConfiguration.groups[1]);
    });

    it('should fall back to first group if group cannot be found', () => {
      const group = classUnderTest.getGroupById(
        productConfiguration.groups,
        'UNKNOWN_ID'
      );
      expect(group).toBe(productConfiguration.groups[0]);
    });
  });
});
