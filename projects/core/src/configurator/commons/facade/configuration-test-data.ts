import { Configurator, GenericConfigurator } from '@spartacus/core';

export const PRODUCT_CODE = 'CONF_LAPTOP';
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

export const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [
    {
      id: GROUP_ID_1,
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
      attributes: [
        {
          name: 'ATTRIBUTE_3_SINGLESELECTIONIMAGE',
          uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [{ id: GROUP_ID_4, subGroups: [], attributes: [] }],
    },
    {
      id: GROUP_ID_5,
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
        { id: GROUP_ID_6, subGroups: [], attributes: [] },
        {
          id: GROUP_ID_7,
          subGroups: [{ id: GROUP_ID_8, subGroups: [], attributes: [] }],
          attributes: [],
        },
      ],
    },

    {
      id: GROUP_ID_9,
      subGroups: [
        {
          id: GROUP_ID_10,
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
    { id: GROUP_ID_1 },
    { id: GROUP_ID_2 },
    { id: GROUP_ID_4 },
    { id: GROUP_ID_6 },
    { id: GROUP_ID_7 },
    { id: GROUP_ID_10 },
  ],
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
  interactionState: {
    currentGroup: GROUP_ID_2,
    menuParentGroup: GROUP_ID_3,
    groupsStatus: {},
    groupsVisited: {},
  },
};
