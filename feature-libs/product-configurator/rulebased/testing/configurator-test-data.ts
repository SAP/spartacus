/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

export const GROUP_ID_CONFLICT_HEADER = 'CONFLICT_HEADER';
export const GROUP_ID_CONFLICT_1 = 'CONFLICT9999-99-0001';
export const GROUP_ID_CONFLICT_2 = 'CONFLICT9999-99-0002';
export const GROUP_ID_CONFLICT_3 = 'CONFLICT9999-99-0003';
export const ATTRIBUTE_1_CHECKBOX = 'ATTRIBUTE_1_CHECKBOX';

export const VALUE_01 = 'VALUE_01';
export const VALUE_02 = 'VALUE_02';
export const VALUE_03 = 'VALUE_03';

export const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';
export const DESCRIPTION_FOR = 'Description for ';

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
  description: DESCRIPTION_FOR + GROUP_ID_4,
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

export const attributeRadioButtons: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_RADIOBUTTON',
  uiType: Configurator.UiType.RADIOBUTTON,
  visible: true,
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

export const attributeRadioButtonsWithNumericAdditionalInput: Configurator.Attribute =
  {
    name: 'ATTRIBUTE_2_RADIOBUTTON_NUMERIC_ADDITIONAL_INPUT',
    uiType: Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT,
    visible: true,
    required: false,
    incomplete: false,
    validationType: Configurator.ValidationType.NUMERIC,
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

export const attributeRadioButtonsWithAlphaNumericAdditionalInput: Configurator.Attribute =
  {
    name: 'ATTRIBUTE_2_RADIOBUTTON_ALPHANUMERIC_ADDITIONAL_INPUT',
    uiType: Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT,
    visible: true,
    required: false,
    incomplete: false,
    validationType: Configurator.ValidationType.NONE,
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

export const attributeSingleSelectionImages: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_SINGLE_SELECTION_IMAGE',
  uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
  visible: true,
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

export const attributeDropDown: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_DROPDOWN',
  uiType: Configurator.UiType.DROPDOWN,
  visible: true,
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

export const attributeDropDownWithNumericAdditionalInput: Configurator.Attribute =
  {
    name: 'ATTRIBUTE_2_DROPDOWN_NUMERIC_ADDITIONAL_INPUT',
    uiType: Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT,
    visible: true,
    required: false,
    incomplete: false,
    validationType: Configurator.ValidationType.NUMERIC,
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

export const attributeDropDownWithAlphaNumericAdditionalInput: Configurator.Attribute =
  {
    name: 'ATTRIBUTE_2_DROPDOWN_ALPHANUMERIC_ADDITIONAL_INPUT',
    uiType: Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT,
    visible: true,
    required: false,
    incomplete: false,
    validationType: Configurator.ValidationType.NONE,
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

export const attrCode = 123;
export const groupId = '1';

export const attributeSingleSelectionBundle: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_RADIOBUTTON_PRODUCT',
  uiType: Configurator.UiType.RADIOBUTTON_PRODUCT,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
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

export const attributeDropdownSelectionBundle: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_DROPDOWN_PRODUCT',
  uiType: Configurator.UiType.DROPDOWN_PRODUCT,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
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

export const attributeMultiSelectionBundle: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_CHECKBOXLIST_PRODUCT',
  uiType: Configurator.UiType.CHECKBOXLIST_PRODUCT,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
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

export const attributeCheckBoxes: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_CHECKBOX_LIST',
  uiType: Configurator.UiType.CHECKBOXLIST,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
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

export const attributeMultiSelectionImages: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_MULTI_SELECTION_IMAGE',
  uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
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

export const attributeCheckBox: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_CHECKBOX',
  uiType: Configurator.UiType.CHECKBOX,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
  values: [
    {
      name: VALUE_01,
      valueCode: VALUE_01,
      valueDisplay: 'Value 01',
      images: [],
    },
  ],
};

export const attributeNotImplemented: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_NOT_IMPLEMENTED',
  uiType: Configurator.UiType.NOT_IMPLEMENTED,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
  values: [
    {
      name: VALUE_01,
      valueCode: VALUE_01,
      valueDisplay: 'Value 01',
      images: [],
    },
  ],
};

export const attributeReadOnly: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_READ_ONLY',
  uiType: Configurator.UiType.READ_ONLY,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
  values: [
    {
      name: VALUE_01,
      valueCode: VALUE_01,
      valueDisplay: 'Value 01',
      images: [],
    },
  ],
};

export const attributeInputField: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_STRING',
  uiType: Configurator.UiType.STRING,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
  values: [],
};

export const attributeNumericInputField: Configurator.Attribute = {
  name: 'ATTRIBUTE_2_NUMERIC',
  uiType: Configurator.UiType.NUMERIC,
  visible: true,
  required: false,
  incomplete: false,
  groupId: groupId,
  attrCode: attrCode,
  values: [],
};

export const productConfigurationWithoutBasePrice: Configurator.Configuration =
  {
    configId: CONFIG_ID,
    productCode: PRODUCT_CODE,
    priceSummary: {
      basePrice: {
        formattedValue: undefined,
        currencyIso: 'USD',
        value: 123.56,
      },
      selectedOptions: {
        formattedValue: '$500',
        currencyIso: 'USD',
        value: 500,
      },
      currentTotal: {
        formattedValue: '$623.56',
        currencyIso: 'USD',
        value: 623.56,
      },
    },
    groups: [
      {
        id: GROUP_ID_1,
        configurable: true,
        description: DESCRIPTION_FOR + GROUP_ID_1,
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        attributes: [attributeCheckBoxes],
        subGroups: [],
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
  };

export const mockProductConfigurationWithoutTotalPrice: Configurator.Configuration =
  {
    configId: CONFIG_ID,
    productCode: PRODUCT_CODE,
    priceSummary: {
      basePrice: {
        formattedValue: '$123.56',
        currencyIso: 'USD',
        value: 123.56,
      },
      selectedOptions: {
        formattedValue: '$500',
        currencyIso: 'USD',
        value: 500,
      },
      currentTotal: {
        formattedValue: undefined,
        currencyIso: 'USD',
        value: 623.56,
      },
    },
    groups: [
      {
        id: GROUP_ID_1,
        configurable: true,
        description: DESCRIPTION_FOR + GROUP_ID_1,
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        attributes: [attributeCheckBoxes],
        subGroups: [],
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
  };

export const mockProductConfigurationWithPriceSummaryButNoPrices: Configurator.Configuration =
  {
    configId: CONFIG_ID,
    productCode: PRODUCT_CODE,
    priceSummary: {
      basePrice: {
        formattedValue: undefined,
        currencyIso: 'USD',
        value: 50,
      },
      selectedOptions: {
        formattedValue: undefined,
        currencyIso: 'USD',
        value: 20,
      },
      currentTotal: {
        formattedValue: undefined,
        currencyIso: 'USD',
        value: 30,
      },
    },
    groups: [
      {
        id: GROUP_ID_1,
        configurable: true,
        description: DESCRIPTION_FOR + GROUP_ID_1,
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        attributes: [attributeCheckBoxes],
        subGroups: [],
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
  };

export const productConfigurationWithoutSelectedOptions: Configurator.Configuration =
  {
    configId: CONFIG_ID,
    productCode: PRODUCT_CODE,
    priceSummary: {
      basePrice: {
        formattedValue: '$123.56',
        currencyIso: 'USD',
        value: 123.56,
      },
      selectedOptions: {
        formattedValue: '',
        currencyIso: 'USD',
        value: 500,
      },
      currentTotal: {
        formattedValue: '$623.56',
        currencyIso: 'USD',
        value: 623.56,
      },
    },
    groups: [
      {
        id: GROUP_ID_1,
        configurable: true,
        description: DESCRIPTION_FOR + GROUP_ID_1,
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        attributes: [attributeCheckBoxes],
        subGroups: [],
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
  };
export const OV_GROUP_DESCRIPTION = 'Group 1';
export const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  immediateConflictResolution: false,
  priceSummary: {
    basePrice: { formattedValue: '$123.56', currencyIso: 'USD', value: 123.56 },
    selectedOptions: { formattedValue: '$500', currencyIso: 'USD', value: 500 },
    currentTotal: {
      formattedValue: '$623.56',
      currencyIso: 'USD',
      value: 623.56,
    },
  },
  groups: [
    {
      id: GROUP_ID_1,
      configurable: true,
      description: DESCRIPTION_FOR + GROUP_ID_1,
      name: GROUP_ID_1,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [
        attributeCheckBoxes,
        attributeCheckBox,
        attributeNotImplemented,
        attributeReadOnly,
        attributeInputField,
        attributeNumericInputField,
        attributeRadioButtons,
        attributeRadioButtonsWithNumericAdditionalInput,
        attributeRadioButtonsWithAlphaNumericAdditionalInput,
        attributeSingleSelectionImages,
        attributeDropDown,
        attributeDropDownWithNumericAdditionalInput,
        attributeDropDownWithAlphaNumericAdditionalInput,
        attributeMultiSelectionImages,
        attributeSingleSelectionBundle,
        attributeDropdownSelectionBundle,
        attributeMultiSelectionBundle,
      ],
      subGroups: [],
    },
    {
      id: GROUP_ID_2,
      configurable: true,
      description: 'Description for ' + GROUP_ID_2,
      attributes: [attributeRadioButtons],
      subGroups: [],
    },
    {
      id: GROUP_ID_3,
      configurable: true,
      description: DESCRIPTION_FOR + GROUP_ID_3,
      attributes: [
        {
          name: 'ATTRIBUTE_3_SINGLE_SELECTION_IMAGE',
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
      description: DESCRIPTION_FOR + GROUP_ID_5,
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
          description: DESCRIPTION_FOR + GROUP_ID_6,
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          subGroups: [],
          attributes: [
            {
              name: 'ATTRIBUTE_3_SINGLE_SELECTION_IMAGE',
              uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
              required: true,
              incomplete: true,
            },
          ],
        },
        {
          id: GROUP_ID_7,
          description: DESCRIPTION_FOR + GROUP_ID_7,
          subGroups: [
            {
              id: GROUP_ID_8,
              configurable: false,
              description: DESCRIPTION_FOR + GROUP_ID_8,
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
      description: DESCRIPTION_FOR + GROUP_ID_9,
      subGroups: [
        {
          id: GROUP_ID_10,
          configurable: true,
          description: DESCRIPTION_FOR + GROUP_ID_10,
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
    productCode: PRODUCT_CODE,
    groups: [
      {
        id: '1',
        groupDescription: OV_GROUP_DESCRIPTION,
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
        subGroups: [
          {
            id: '2.1',
            groupDescription: 'Group 2.1',
            attributes: [
              {
                attribute: 'C2.1',
                value: 'V2.1',
              },
            ],
          },
          {
            id: '2.2',
            groupDescription: 'Group 2.2',
            attributes: [
              {
                attribute: 'C2.2',
                value: 'V2.2',
              },
            ],
            subGroups: [
              {
                id: '3.1',
                groupDescription: 'Group 3.1',
                attributes: [
                  {
                    attribute: 'C3.1',
                    value: 'V3.1',
                  },
                ],
              },
              {
                id: '3.2',
                groupDescription: 'Group 3.2',
                attributes: [
                  {
                    attribute: 'C3.2',
                    value: 'V3.2',
                  },
                ],
                subGroups: [
                  {
                    id: '4.1',
                    groupDescription: 'Group 4.1',
                    attributes: [
                      {
                        attribute: 'C4.1',
                        value: 'V4.1',
                      },
                    ],
                  },
                  {
                    id: '4.2',
                    groupDescription: 'Group 4.2',
                    attributes: [
                      {
                        attribute: 'C4.2',
                        value: 'V4.2',
                      },
                    ],
                    subGroups: [
                      {
                        id: '5.1',
                        groupDescription: 'Group 5.1',
                        attributes: [
                          {
                            attribute: 'C5.1',
                            value: 'V5.1',
                          },
                        ],
                      },
                      {
                        id: '5.2',
                        groupDescription: 'Group 5.2',
                        attributes: [
                          {
                            attribute: 'C5.2',
                            value: 'V5.2',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const productConfigurationWithConflicts: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  immediateConflictResolution: false,
  totalNumberOfIssues: 3,
  groups: [
    {
      id: GROUP_ID_CONFLICT_HEADER,
      name: GROUP_ID_CONFLICT_HEADER,
      groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
      attributes: [],
      description: GROUP_ID_CONFLICT_HEADER,
      subGroups: [
        {
          id: GROUP_ID_CONFLICT_3,
          name: GROUP_ID_CONFLICT_3,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [attributeCheckBoxes, attributeRadioButtons],
          description: GROUP_ID_CONFLICT_3,
        },
        {
          id: GROUP_ID_CONFLICT_1,
          name: GROUP_ID_CONFLICT_1,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [
            { name: 'ATTRIBUTE_1_CHECKBOX', key: 'ATTRIBUTE_1' },
            { name: 'ATTRIBUTE_2_RADIOBUTTON', key: 'ATTRIBUTE_2' },
          ],
          description: GROUP_ID_CONFLICT_1,
        },
        {
          id: GROUP_ID_CONFLICT_2,
          name: GROUP_ID_CONFLICT_2,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [{ name: 'ATTRIBUTE_5_STRING', key: 'ATTRIBUTE_5' }],
          description: GROUP_ID_CONFLICT_2,
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
          key: 'ATTRIBUTE_1',
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
          key: 'ATTRIBUTE_2',
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
              key: 'ATTRIBUTE_5',
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
      id: GROUP_ID_CONFLICT_3,
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      subGroups: [],
      attributes: undefined,
    },
    {
      id: GROUP_ID_CONFLICT_1,
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      subGroups: [],
      attributes: [
        { name: 'ATTRIBUTE_1_CHECKBOX', key: 'ATTRIBUTE_1' },
        { name: 'ATTRIBUTE_2_RADIOBUTTON', key: 'ATTRIBUTE_2' },
      ],
    },
    {
      id: GROUP_ID_CONFLICT_2,
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      subGroups: [],
      attributes: [{ name: 'ATTRIBUTE_5_STRING', key: 'ATTRIBUTE_5' }],
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
          key: 'ATTRIBUTE_1',
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
          key: 'ATTRIBUTE_2',
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
          key: 'ATTRIBUTE_5',
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
    currentGroup: GROUP_ID_1,
    menuParentGroup: undefined,
    groupsVisited: {},
  },
};
