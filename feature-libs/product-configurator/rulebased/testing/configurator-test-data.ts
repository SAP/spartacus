import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorTestUtils } from './configurator-test-utils';

export const PRODUCT_CODE = 'CONF_LAPTOP';
export const CONFIGURATOR_TYPE = ConfiguratorType.VARIANT;
export const CONFIG_ID = '1234-56-7890';

export const GROUP_ID_1 = '1234-56-7891';
export const GROUP_ID_2 = '1234-56-7892';
export const GROUP_ID_3 = '1234-56-7893';
export const GROUP_ID_4 = '1234-56-7894';
export const GROUP_ID_5 = '1234-56-7895';
export const GROUP_ID_6 = '1234-56-7896';
export const GROUP_ID_7 = '1234-56-7897';
export const GROUP_ID_8 = '1234-56-7898';
export const GROUP_ID_9 = '1234-56-7899';
export const GROUP_ID_10 = '1234-56-7900';

export const GROUP_ID_CONFLICT_HEADER = '9999-99-0000';
export const GROUP_ID_CONFLICT_1 = '9999-99-0001';
export const GROUP_ID_CONFLICT_2 = '9999-99-0002';
export const GROUP_ID_CONFLICT_3 = '9999-99-0003';
export const ATTRIBUTE_1_CHECKBOX = 'ATTRIBUTE_1_CHECKBOX';

export const VALUE_01 = 'VALUE_01';
export const VALUE_02 = 'VALUE_02';
export const VALUE_03 = 'VALUE_03';

export const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';

export const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    semanticRoute: CONFIGURATOR_ROUTE,
  },
};

const groupsWithoutIssues: Configurator.Group = {
  id: GROUP_ID_1,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  attributes: [
    {
      name: ATTRIBUTE_1_CHECKBOX,
      uiType: Configurator.UiType.CHECKBOXLIST,
      required: true,
      incomplete: false,
    },
  ],
  subGroups: [],
};

export const subGroupWith2Attributes: Configurator.Group = {
  id: GROUP_ID_4,
  configurable: true,
  description: 'Description for ' + GROUP_ID_4,
  subGroups: [],
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  attributes: [
    {
      name: 'ATTRIBUTE_5_STRING',
      uiType: Configurator.UiType.STRING,
      required: true,
      incomplete: false,
    },
    {
      name: 'ATTRIBUTE_5_DROPDOWN',
      uiType: Configurator.UiType.DROPDOWN,
      required: true,
      incomplete: true,
      values: [
        {
          name: VALUE_01,
          valueCode: VALUE_01,
          valueDisplay: 'Value 01',
          images: [],
        },
        {
          name: VALUE_02,
          valueCode: VALUE_02,
          valueDisplay: 'Value 02',
          images: [],
        },
        {
          name: VALUE_03,
          valueCode: VALUE_03,
          valueDisplay: 'Value 03',
          images: [],
        },
      ],
    },
  ],
};

export const productConfigurationWithoutIssues: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    CONFIG_ID,
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  ),
  productCode: PRODUCT_CODE,
  totalNumberOfIssues: 0,
  groups: [groupsWithoutIssues],
  flatGroups: [groupsWithoutIssues],
};

export const attributeRadioButton: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_RADIOBUTTON',
  uiType: Configurator.UiType.RADIOBUTTON,
  required: false,
  incomplete: false,
  values: [
    {
      name: VALUE_01,
      valueCode: VALUE_01,
      valueDisplay: 'Value 01',
      images: [],
    },
    {
      name: VALUE_02,
      valueCode: VALUE_02,
      valueDisplay: 'Value 02',
      images: [],
    },
    {
      name: VALUE_03,
      valueCode: VALUE_03,
      valueDisplay: 'Value 03',
      images: [],
    },
  ],
};

export const attributeCheckbox: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_RADIOBUTTON',
  uiType: Configurator.UiType.RADIOBUTTON,
  required: false,
  incomplete: false,
  groupId: '1',
  attrCode: 123,
  values: [
    {
      name: VALUE_01,
      valueCode: VALUE_01,
      valueDisplay: 'Value 01',
      images: [],
    },
    {
      name: VALUE_02,
      valueCode: VALUE_02,
      valueDisplay: 'Value 02',
      images: [],
    },
    {
      name: VALUE_03,
      valueCode: VALUE_03,
      valueDisplay: 'Value 03',
      images: [],
    },
  ],
};

export const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [
    {
      id: GROUP_ID_1,
      configurable: true,
      description: 'Description for ' + GROUP_ID_1,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [attributeCheckbox],
      subGroups: [],
    },
    {
      id: GROUP_ID_2,
      configurable: true,
      description: 'Description for ' + GROUP_ID_2,
      attributes: [attributeRadioButton],
      subGroups: [],
    },
    {
      id: GROUP_ID_3,
      configurable: true,
      description: 'Description for ' + GROUP_ID_3,
      attributes: [
        {
          name: 'ATTRIBUTE_3_SINGLESELECTIONIMAGE',
          uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [subGroupWith2Attributes],
    },
    {
      id: GROUP_ID_5,
      configurable: true,
      description: 'Description for ' + GROUP_ID_5,
      attributes: [
        {
          name: 'ATTRIBUTE_5_STRING',
          uiType: Configurator.UiType.STRING,
          required: true,
          incomplete: false,
        },
        {
          name: 'ATTRIBUTE_5_DROPDOWN',
          uiType: Configurator.UiType.DROPDOWN,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [
        {
          id: GROUP_ID_6,
          configurable: true,
          description: 'Description for ' + GROUP_ID_6,
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          subGroups: [],
          attributes: [
            {
              name: 'ATTRIBUTE_3_SINGLESELECTIONIMAGE',
              uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
              required: true,
              incomplete: true,
            },
          ],
        },
        {
          id: GROUP_ID_7,
          description: 'Description for ' + GROUP_ID_7,
          subGroups: [
            {
              id: GROUP_ID_8,
              configurable: false,
              description: 'Description for ' + GROUP_ID_8,
              subGroups: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      id: GROUP_ID_9,
      configurable: true,
      description: 'Description for ' + GROUP_ID_9,
      subGroups: [
        {
          id: GROUP_ID_10,
          configurable: true,
          description: 'Description for ' + GROUP_ID_10,
          attributes: [
            {
              name: 'ATTRIBUTE_10_DROPDOWN',
              uiType: Configurator.UiType.DROPDOWN,
              required: true,
              incomplete: false,
            },
          ],
          subGroups: [],
        },
      ],
    },
  ],
  flatGroups: [
    {
      id: GROUP_ID_1,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [
        {
          name: ATTRIBUTE_1_CHECKBOX,
          uiType: Configurator.UiType.CHECKBOXLIST,
          required: true,
          incomplete: true,
        },
      ],
    },
    ConfiguratorTestUtils.createGroup(GROUP_ID_2),
    ConfiguratorTestUtils.createGroup(GROUP_ID_4),
    ConfiguratorTestUtils.createGroup(GROUP_ID_6),
    ConfiguratorTestUtils.createGroup(GROUP_ID_7),
    ConfiguratorTestUtils.createGroup(GROUP_ID_10),
  ],
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    PRODUCT_CODE,
    CONFIGURATOR_TYPE
  ),
  nextOwner: ConfiguratorModelUtils.createInitialOwner(),
  interactionState: {
    currentGroup: GROUP_ID_2,
    menuParentGroup: GROUP_ID_3,
    groupsVisited: {},
    issueNavigationDone: true,
  },
  overview: {
    configId: CONFIG_ID,
    groups: [
      {
        id: '1',
        groupDescription: 'Group 1',
        attributes: [
          {
            attribute: 'C1',
            value: 'V1',
          },
        ],
      },
      {
        id: '2',
        groupDescription: 'Group 2',
        attributes: [
          {
            attribute: 'C2',
            value: 'V2',
          },
          {
            attribute: 'C3',
            value: 'V3',
          },
        ],
      },
    ],
  },
};

export const productConfigurationWithConflicts: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  totalNumberOfIssues: 3,
  groups: [
    {
      id: GROUP_ID_CONFLICT_HEADER,
      groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
      attributes: [],
      subGroups: [
        {
          id: GROUP_ID_CONFLICT_1,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [],
        },
        {
          id: GROUP_ID_CONFLICT_2,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [],
        },
        {
          id: GROUP_ID_CONFLICT_3,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [],
        },
      ],
    },
    {
      id: GROUP_ID_1,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [
        {
          name: 'ATTRIBUTE_1_CHECKBOX',
          uiType: Configurator.UiType.CHECKBOXLIST,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [],
    },

    {
      id: GROUP_ID_2,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [
        {
          name: 'ATTRIBUTE_2_RADIOBUTTON',
          uiType: Configurator.UiType.RADIOBUTTON,
          required: false,
          incomplete: false,
        },
      ],
      subGroups: [],
    },
    {
      id: GROUP_ID_3,
      groupType: Configurator.GroupType.SUB_ITEM_GROUP,
      attributes: [],
      subGroups: [
        {
          id: GROUP_ID_4,
          subGroups: [],
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          attributes: [
            {
              name: 'ATTRIBUTE_5_STRING',
              uiType: Configurator.UiType.STRING,
              required: true,
              incomplete: false,
            },
            {
              name: 'ATTRIBUTE_5_DROPDOWN',
              uiType: Configurator.UiType.DROPDOWN,
              required: true,
              incomplete: true,
            },
          ],
        },
      ],
    },
    {
      id: GROUP_ID_5,
      attributes: [],
      groupType: Configurator.GroupType.SUB_ITEM_GROUP,
      subGroups: [
        {
          id: GROUP_ID_6,
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          subGroups: [],
          attributes: [
            {
              name: 'ATTRIBUTE_3_SINGLESELECTIONIMAGE',
              uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
              required: true,
              incomplete: true,
            },
          ],
        },
        {
          id: GROUP_ID_7,
          groupType: Configurator.GroupType.SUB_ITEM_GROUP,
          subGroups: [
            {
              id: GROUP_ID_8,
              groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
              subGroups: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },

    {
      id: GROUP_ID_9,
      attributes: [],
      groupType: Configurator.GroupType.SUB_ITEM_GROUP,
      subGroups: [
        {
          id: GROUP_ID_10,
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          attributes: [
            {
              name: 'ATTRIBUTE_10_DROPDOWN',
              uiType: Configurator.UiType.DROPDOWN,
              required: true,
              incomplete: false,
              hasConflicts: true,
            },
          ],
          subGroups: [],
        },
      ],
    },
  ],
  flatGroups: [
    {
      id: GROUP_ID_CONFLICT_1,
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      subGroups: [],
      attributes: [],
    },
    {
      id: GROUP_ID_CONFLICT_2,
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      subGroups: [],
      attributes: [],
    },
    {
      id: GROUP_ID_CONFLICT_3,
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      subGroups: [],
      attributes: [],
    },
    {
      id: GROUP_ID_1,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [
        {
          name: 'ATTRIBUTE_1_CHECKBOX',
          uiType: Configurator.UiType.CHECKBOXLIST,
          required: true,
          incomplete: true,
        },
      ],
    },
    {
      id: GROUP_ID_2,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [
        {
          name: 'ATTRIBUTE_2_RADIOBUTTON',
          uiType: Configurator.UiType.RADIOBUTTON,
          required: false,
          incomplete: false,
        },
      ],
    },
    {
      id: GROUP_ID_4,
      subGroups: [],
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [
        {
          name: 'ATTRIBUTE_5_STRING',
          uiType: Configurator.UiType.STRING,
          required: true,
          incomplete: false,
        },
        {
          name: 'ATTRIBUTE_5_DROPDOWN',
          uiType: Configurator.UiType.DROPDOWN,
          required: true,
          incomplete: true,
        },
      ],
    },
    {
      id: GROUP_ID_6,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [
        {
          name: 'ATTRIBUTE_3_SINGLESELECTIONIMAGE',
          uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
          required: true,
          incomplete: true,
        },
      ],
    },
    {
      id: GROUP_ID_7,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [],
    },
    {
      id: GROUP_ID_8,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [],
    },
    {
      id: GROUP_ID_10,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [
        {
          name: 'ATTRIBUTE_10_DROPDOWN',
          uiType: Configurator.UiType.DROPDOWN,
          required: true,
          incomplete: false,
          hasConflicts: true,
        },
      ],
    },
  ],
  owner: {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
    key: CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE,
    configuratorType: ConfiguratorType.VARIANT,
  },
  interactionState: {
    currentGroup: GROUP_ID_2,
    menuParentGroup: GROUP_ID_3,
    groupsVisited: {},
  },
};
