import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import {
  ATTRIBUTE_1_CHECKBOX,
  CONFIG_ID,
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_3,
  GROUP_ID_4,
  GROUP_ID_5,
  GROUP_ID_6,
  GROUP_ID_7,
  GROUP_ID_8,
  GROUP_ID_9,
  PRODUCT_CODE,
  GROUP_ID_CONFLICT_HEADER,
  GROUP_ID_CONFLICT_1,
} from '../../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorBasicEffectService } from './configurator-basic-effect.service';

const group: Configurator.Group = {
  id: GROUP_ID_8,
  attributes: [{ name: ATTRIBUTE_1_CHECKBOX }],
  subGroups: [],
};

const groupWithSubGroup: Configurator.Group = {
  id: GROUP_ID_9,
  attributes: [
    {
      name: ATTRIBUTE_1_CHECKBOX,
      values: [{ name: 'val', valueCode: '1' }],
    },
  ],
  subGroups: [group],
};
const productConfigurationBase: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    CONFIG_ID,
    ConfiguratorModelUtils.createInitialOwner()
  ),
  productCode: PRODUCT_CODE,
  groups: [group, groupWithSubGroup],
  flatGroups: [group],
  priceSummary: {},
  priceSupplements: [],
};
let productConfiguration: Configurator.Configuration;

const groupListWithConflicts: Configurator.Group[] = [
  {
    id: GROUP_ID_CONFLICT_HEADER,
    groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
    attributes: [],
    subGroups: [
      {
        id: GROUP_ID_CONFLICT_1,
        groupType: Configurator.GroupType.CONFLICT_GROUP,
        attributes: [{ name: ATTRIBUTE_1_CHECKBOX }],
        subGroups: [],
      },
    ],
  },
  {
    id: GROUP_ID_1,
    attributes: [],
    subGroups: [
      {
        id: GROUP_ID_2,
        attributes: [],
        subGroups: [],
      },
      {
        id: GROUP_ID_3,
        attributes: [],
        subGroups: [],
      },
    ],
  },
  {
    id: GROUP_ID_4,
    attributes: [],
    subGroups: structuredClone(productConfigurationBase.groups),
  },
  {
    id: GROUP_ID_5,
    attributes: [],
    subGroups: [
      {
        id: GROUP_ID_6,
        attributes: [],
        subGroups: [],
      },
    ],
  },
];

const groupListWithConflictsAndAttributesOnRootLevel: Configurator.Group[] = [
  {
    id: GROUP_ID_CONFLICT_HEADER,
    groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
    attributes: [],
    subGroups: [
      {
        id: GROUP_ID_CONFLICT_1,
        groupType: Configurator.GroupType.CONFLICT_GROUP,
        attributes: [{ name: ATTRIBUTE_1_CHECKBOX }],
        subGroups: [],
      },
    ],
  },
  {
    id: GROUP_ID_1,
    attributes: [],
    subGroups: [],
  },
  {
    id: GROUP_ID_4,
    attributes: [
      {
        name: ATTRIBUTE_1_CHECKBOX,
        values: [{ name: 'val', valueCode: '1' }],
      },
    ],
    subGroups: [],
  },
];

describe('ConfiguratorBasicEffectService', () => {
  let classUnderTest: ConfiguratorBasicEffectService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorBasicEffectService],
    }).compileComponents();
  }));
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorBasicEffectService as Type<ConfiguratorBasicEffectService>
    );
    productConfiguration = structuredClone(productConfigurationBase);
  });

  describe('getFirstGroupWithAttributes', () => {
    it('should find group in single level config', () => {
      expect(
        classUnderTest.getFirstGroupWithAttributes(productConfiguration)
      ).toBe(GROUP_ID_8);
    });

    it('should find conflict group as first group in single level config where conflicts exist if includeConflicts is set to true', () => {
      productConfiguration.groups =
        groupListWithConflictsAndAttributesOnRootLevel;
      expect(
        classUnderTest.getFirstGroupWithAttributes(productConfiguration, true)
      ).toBe(GROUP_ID_CONFLICT_1);
    });

    it('should find attribute group as first group in multi level config although conflicts exist (using default value for includeConflicts)', () => {
      productConfiguration.groups = groupListWithConflicts;
      expect(
        classUnderTest.getFirstGroupWithAttributes(productConfiguration)
      ).toBe(GROUP_ID_8);
    });

    it('should find attribute group as first group in multi level config although conflicts exist if includeConflicts is set to false', () => {
      productConfiguration.groups = groupListWithConflicts;
      expect(
        classUnderTest.getFirstGroupWithAttributes(productConfiguration, false)
      ).toBe(GROUP_ID_8);
    });

    it('should find conflict group as first group in multi level config where conflicts exist if includeConflicts is set to true', () => {
      productConfiguration.groups = groupListWithConflicts;
      expect(
        classUnderTest.getFirstGroupWithAttributes(productConfiguration, true)
      ).toBe(GROUP_ID_CONFLICT_1);
    });

    it('should throw error in case configuration has no attribute at all', () => {
      expect(function () {
        classUnderTest.getFirstGroupWithAttributes(
          ConfiguratorTestUtils.createConfiguration(
            'a',
            ConfiguratorModelUtils.createInitialOwner()
          )
        );
      }).toThrow();
    });
  });

  describe('getConfigurationIfTabAlreadyLoaded', () => {
    const owner = ConfiguratorModelUtils.createInitialOwner();

    it('should return configuration when requested tab is loaded with attributes', () => {
      const result = classUnderTest.getConfigurationIfTabAlreadyLoaded(
        productConfiguration,
        CONFIG_ID,
        GROUP_ID_8,
        owner
      );
      expect(result).toBeDefined();
      expect(result?.owner).toBe(owner);
      expect(result?.interactionState.currentGroup).toBe(GROUP_ID_8);
    });

    it('should return undefined when configuration is not defined', () => {
      expect(
        classUnderTest.getConfigurationIfTabAlreadyLoaded(
          undefined as unknown as Configurator.Configuration,
          CONFIG_ID,
          GROUP_ID_8,
          owner
        )
      ).toBeUndefined();
    });

    it('should return undefined when no group id is provided', () => {
      expect(
        classUnderTest.getConfigurationIfTabAlreadyLoaded(
          productConfiguration,
          CONFIG_ID,
          '',
          owner
        )
      ).toBeUndefined();
    });

    it('should return undefined when requested config id does not match', () => {
      expect(
        classUnderTest.getConfigurationIfTabAlreadyLoaded(
          productConfiguration,
          'other-config-id',
          GROUP_ID_8,
          owner
        )
      ).toBeUndefined();
    });

    it('should return undefined when requested group has no attributes', () => {
      const configuration: Configurator.Configuration = {
        ...productConfiguration,
        groups: [{ id: GROUP_ID_1, attributes: [], subGroups: [] }],
      };
      expect(
        classUnderTest.getConfigurationIfTabAlreadyLoaded(
          configuration,
          CONFIG_ID,
          GROUP_ID_1,
          owner
        )
      ).toBeUndefined();
    });

    it('should return undefined when requested group is not part of the configuration', () => {
      expect(
        classUnderTest.getConfigurationIfTabAlreadyLoaded(
          productConfiguration,
          CONFIG_ID,
          'unknown-group-id',
          owner
        )
      ).toBeUndefined();
    });
  });

  describe('getFirstGroupWithAttributesForList', () => {
    it('should find attribute group as first group in single level config although conflicts exist if includeConflicts is set to false', () => {
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](
          groupListWithConflictsAndAttributesOnRootLevel,
          false
        )
      ).toBe(GROUP_ID_4);
    });
    it('should find conflict group as first group in single level config if includeConflicts is set to true', () => {
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](
          groupListWithConflictsAndAttributesOnRootLevel,
          true
        )
      ).toBe(GROUP_ID_CONFLICT_1);
    });
    it('should find group in multi level config', () => {
      const groups: Configurator.Group[] = [
        {
          id: GROUP_ID_1,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_2,
              attributes: [],
              subGroups: [],
            },
            {
              id: GROUP_ID_3,
              attributes: [],
              subGroups: [],
            },
          ],
        },
        {
          id: GROUP_ID_4,
          attributes: [],
          subGroups: productConfiguration.groups,
        },
        {
          id: GROUP_ID_5,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_6,
              attributes: [],
              subGroups: [],
            },
          ],
        },
      ];
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](groups, false)
      ).toBe(GROUP_ID_8);
    });

    it('should find attribute group as first group in multi level config although conflicts exist if includeConflicts is set to false', () => {
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](
          groupListWithConflicts,
          false
        )
      ).toBe(GROUP_ID_8);
    });

    it('should find conflict group as first group in multi level config if includeConflicts is set to true', () => {
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](
          groupListWithConflicts,
          true
        )
      ).toBe(GROUP_ID_CONFLICT_1);
    });

    it('should find no group in multi level config in case no attributes exist at all', () => {
      const groups: Configurator.Group[] = [
        {
          id: GROUP_ID_1,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_2,
              attributes: [],
              subGroups: [],
            },
            {
              id: GROUP_ID_3,
              attributes: [],
              subGroups: [],
            },
          ],
        },
        {
          id: GROUP_ID_5,
          attributes: [],
          subGroups: [{ id: GROUP_ID_4, attributes: [], subGroups: [] }],
        },
        {
          id: GROUP_ID_6,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_7,
              attributes: [],
              subGroups: [],
            },
          ],
        },
      ];
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](groups, false)
      ).toBeUndefined();
    });
  });

  describe('getFirstTabIdOfNewlyAddedContainerRow', () => {
    const rowGroupId = `${Configurator.ContainerRowGroupIdPrefix}@1111@row-new`;
    const firstTabId = GROUP_ID_2;
    const secondTabId = GROUP_ID_3;
    const existingRow: Configurator.ContainerRow = {
      id: 'row-existing',
      productSystemId: 'EXISTING',
      selected: true,
    };
    const newRowWithConfig: Configurator.ContainerRow = {
      id: 'row-new',
      productSystemId: 'NEW_PROD',
      selected: true,
      groupId: rowGroupId,
    };
    const newRowWithoutConfig: Configurator.ContainerRow = {
      id: 'row-new',
      productSystemId: 'NEW_PROD',
      selected: true,
    };
    const nestedRowGroup: Configurator.Group = {
      id: rowGroupId,
      groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
      attributes: [],
      subGroups: [
        {
          id: firstTabId,
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          attributes: [{ name: ATTRIBUTE_1_CHECKBOX }],
          subGroups: [],
        },
        {
          id: secondTabId,
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
          attributes: [],
          subGroups: [],
        },
      ],
    };

    function createConfigurationWithContainer(
      rows: Configurator.ContainerRow[],
      subGroups: Configurator.Group[] = []
    ): Configurator.Configuration {
      return {
        ...ConfiguratorTestUtils.createConfiguration(
          CONFIG_ID,
          ConfiguratorModelUtils.createInitialOwner()
        ),
        groups: [
          {
            id: GROUP_ID_1,
            attributes: [
              {
                name: ATTRIBUTE_1_CHECKBOX,
                attrCode: 1111,
                container: { rows },
              },
            ],
            subGroups,
          },
        ],
        flatGroups: [],
      };
    }

    it('should return the first tab id of a newly added configurable row', () => {
      const previous = createConfigurationWithContainer([existingRow]);
      const next = createConfigurationWithContainer(
        [existingRow, newRowWithConfig],
        [nestedRowGroup]
      );

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(previous, next)
      ).toBe(firstTabId);
    });

    it('should return undefined when the new row has no nested configuration', () => {
      const previous = createConfigurationWithContainer([existingRow]);
      const next = createConfigurationWithContainer([
        existingRow,
        newRowWithoutConfig,
      ]);

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(previous, next)
      ).toBeUndefined();
    });

    it('should return undefined when no new selected row is present', () => {
      const previous = createConfigurationWithContainer([existingRow]);
      const next = createConfigurationWithContainer([existingRow]);

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(previous, next)
      ).toBeUndefined();
    });

    it('should find a newly added configurable row on a nested container', () => {
      const previous: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          CONFIG_ID,
          ConfiguratorModelUtils.createInitialOwner()
        ),
        groups: [
          {
            id: GROUP_ID_1,
            attributes: [],
            subGroups: [
              {
                id: GROUP_ID_4,
                attributes: [
                  {
                    name: ATTRIBUTE_1_CHECKBOX,
                    attrCode: 1111,
                    container: { rows: [existingRow] },
                  },
                ],
                subGroups: [],
              },
            ],
          },
        ],
        flatGroups: [],
      };
      const next: Configurator.Configuration = {
        ...previous,
        groups: [
          {
            id: GROUP_ID_1,
            attributes: [],
            subGroups: [
              {
                id: GROUP_ID_4,
                attributes: [
                  {
                    name: ATTRIBUTE_1_CHECKBOX,
                    attrCode: 1111,
                    container: { rows: [existingRow, newRowWithConfig] },
                  },
                ],
                subGroups: [nestedRowGroup],
              },
            ],
          },
        ],
      };

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(previous, next)
      ).toBe(firstTabId);
    });

    it('should prefer the new row that carries a nested configuration when several new rows appear', () => {
      const anotherNewRowWithoutConfig: Configurator.ContainerRow = {
        id: 'row-other',
        productSystemId: 'OTHER',
        selected: true,
      };
      const previous = createConfigurationWithContainer([existingRow]);
      const next = createConfigurationWithContainer(
        [existingRow, anotherNewRowWithoutConfig, newRowWithConfig],
        [nestedRowGroup]
      );

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(previous, next)
      ).toBe(firstTabId);
    });

    it('should return undefined when previous configuration is missing and no row carries a nested configuration', () => {
      const next = createConfigurationWithContainer([newRowWithoutConfig]);

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(undefined, next)
      ).toBeUndefined();
    });

    it('should return undefined when the nested group has no tabs', () => {
      const rowGroupWithoutTabs: Configurator.Group = {
        ...nestedRowGroup,
        subGroups: [],
      };
      const previous = createConfigurationWithContainer([]);
      const next = createConfigurationWithContainer(
        [newRowWithConfig],
        [rowGroupWithoutTabs]
      );

      expect(
        classUnderTest.getFirstTabIdOfNewlyAddedContainerRow(previous, next)
      ).toBeUndefined();
    });
  });
});
