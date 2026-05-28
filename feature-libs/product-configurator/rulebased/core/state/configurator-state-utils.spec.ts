import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorStateUtils } from './configurator-state-utils';

const SUB_GROUP_ID = 'groupId@subGroupId';

describe('ConfiguratorStateUtils', () => {
  describe('getAttributeName', () => {
    it('should return attribute name', () => {
      expect(
        ConfiguratorStateUtils['getAttributeName'](
          SUB_GROUP_ID + '@attributeId'
        )
      ).toEqual('attributeId');
    });
  });

  describe('getKey', () => {
    it('should return a key', () => {
      expect(
        ConfiguratorStateUtils['getKey'](
          'groupId@subGroupId@attributeId',
          'attributeId'
        )
      ).toEqual('groupId@subGroupId');
    });
  });

  describe('isTargeGroup', () => {
    const groupId = 'group1';
    const groupMatchingSupplement: Configurator.Group = {
      id: groupId,
      subGroups: [],
    };
    const groupNotMatchingSupplement: Configurator.Group = {
      id: SUB_GROUP_ID,
      subGroups: [],
    };
    const attributeSupplements: Configurator.AttributeSupplement[] =
      ConfiguratorTestUtils.createListOfAttributeSupplements(false, 1, 0, 2, 2);
    it('should tell that a group needs to be enriched with pricing data in case group ID matches supplement key', () => {
      expect(
        ConfiguratorStateUtils['isTargetGroup'](
          groupMatchingSupplement,
          attributeSupplements
        )
      ).toBe(true);
    });

    it('should tell that a group does not need to be enriched if group ID does not match', () => {
      expect(
        ConfiguratorStateUtils['isTargetGroup'](
          groupNotMatchingSupplement,
          attributeSupplements
        )
      ).toBe(false);
    });

    it('should throw an error if supplements array is empty', () => {
      expect(() =>
        ConfiguratorStateUtils['isTargetGroup'](groupNotMatchingSupplement, [])
      ).toThrow();
    });
  });

  describe('updateArrayElement', () => {
    const code0 = 'VALUE_CODE_0';
    const code1 = 'VALUE_CODE_1';
    const code2 = 'VALUE_CODE_2';

    const priceDetails: Configurator.PriceDetails = {
      currencyIso: 'EUR',
      value: 12,
    };
    let values: Configurator.Value[] = [
      { valueCode: code0 },
      { valueCode: code1 },
      { valueCode: code2 },
    ];
    const valueSupplement: Configurator.ValueSupplement = {
      attributeValueKey: code1,
      priceValue: priceDetails,
      obsoletePriceValue: priceDetails,
    };

    it('should create shallow copies for untouched entries and a single new entry if the predicate matches', () => {
      const mergedValues = ConfiguratorStateUtils['updateArrayElement'](
        values,
        (value) => value.valueCode === valueSupplement.attributeValueKey,
        (value) => {
          return {
            ...value,
          };
        }
      );
      if (mergedValues) {
        expect(mergedValues[0]).toBe(values[0]);
        expect(mergedValues[1]).not.toBe(values[1]);
        expect(mergedValues[2]).toBe(values[2]);

        //no shallow copy, but the actual attributes should match according to the projection
        expect(mergedValues[1].valueCode).toBe(values[1].valueCode);
      } else {
        fail();
      }
    });

    it('should create new array in case predicate matches', () => {
      const mergedValues = ConfiguratorStateUtils['updateArrayElement'](
        values,
        (value) => value.valueCode === valueSupplement.attributeValueKey,
        (value) => {
          return {
            ...value,
          };
        }
      );
      expect(mergedValues).not.toBe(values);
    });

    it('should return same array if no match is found', () => {
      const mergedValues = ConfiguratorStateUtils['updateArrayElement'](
        values,
        (value) => value.valueCode === 'NOT EXISTING',
        (value) => {
          return {
            ...value,
          };
        }
      );
      expect(mergedValues).toBe(values);
    });

    it('should cope with undefined input', () => {
      const mergedValues = ConfiguratorStateUtils['updateArrayElement'](
        undefined,
        (value) => value === 'NOT EXISTING',
        (value) => {
          return value;
        }
      );
      expect(mergedValues).toBeUndefined();
    });
  });

  describe('mergeGroupsWithSupplements', () => {
    it('should not update value prices in case the list of groups is empty', () => {
      const groups: Configurator.Group[] = [];
      const attributeSupplements: Configurator.AttributeSupplement[] = [];
      ConfiguratorStateUtils.mergeGroupsWithSupplements(
        groups,
        attributeSupplements
      );
      expect(groups.length).toBe(0);
    });

    it('should throw an error if groups are present but attribute supplements are empty', () => {
      const groups: Configurator.Group[] =
        ConfiguratorTestUtils.createListOfGroups(1, 0, 3, 3);
      const attributeSupplements: Configurator.AttributeSupplement[] = [];
      expect(() =>
        ConfiguratorStateUtils.mergeGroupsWithSupplements(
          groups,
          attributeSupplements
        )
      ).toThrow();
    });

    it('should update value prices for simple product', () => {
      const groups: Configurator.Group[] =
        ConfiguratorTestUtils.createListOfGroups(1, 0, 3, 3);
      const attributeSupplements: Configurator.AttributeSupplement[] =
        ConfiguratorTestUtils.createListOfAttributeSupplements(
          false,
          1,
          0,
          1,
          3
        );
      const mergedGroups = ConfiguratorStateUtils.mergeGroupsWithSupplements(
        groups,
        attributeSupplements
      );

      expect(mergedGroups.length).toBe(1);
      expect(mergedGroups[0].subGroups.length).toBe(0);
      expect(mergedGroups[0].attributes?.length).toBe(3);

      const attributes = mergedGroups[0]
        ? mergedGroups[0].attributes
          ? mergedGroups[0].attributes
          : []
        : [];
      const values = attributes[0]
        ? attributes[0].values
          ? attributes[0].values
          : []
        : [];
      const valueSupplements = attributeSupplements[0].valueSupplements;
      expect(values?.length).toBe(3);

      expect(values[0].valueCode).toEqual(
        valueSupplements[0].attributeValueKey
      );
      expect(values[0].valuePrice?.formattedValue).toEqual(
        valueSupplements[0].priceValue.formattedValue
      );
      expect(values[1].valueCode).toEqual(
        valueSupplements[1].attributeValueKey
      );
      expect(values[1].valuePrice?.formattedValue).toEqual(
        valueSupplements[1].priceValue.formattedValue
      );
      expect(values[2].valueCode).toEqual(
        valueSupplements[2].attributeValueKey
      );
      expect(values[2].valuePrice?.formattedValue).toEqual(
        valueSupplements[2].priceValue.formattedValue
      );
    });

    it('should update value prices for complex product', () => {
      const groups: Configurator.Group[] =
        ConfiguratorTestUtils.createListOfGroups(3, 3, 3, 3);
      const attributeSupplements: Configurator.AttributeSupplement[] =
        ConfiguratorTestUtils.createListOfAttributeSupplements(
          true,
          1,
          3,
          1,
          3
        );
      const mergedGroups = ConfiguratorStateUtils.mergeGroupsWithSupplements(
        groups,
        attributeSupplements
      );

      expect(mergedGroups.length).toBe(3);
      expect(mergedGroups[0].subGroups.length).toBe(1);
      expect(mergedGroups[0].attributes?.length).toBe(0);
      expect(mergedGroups[0].subGroups[0].subGroups.length).toBe(1);
      expect(mergedGroups[0].subGroups[0].attributes?.length).toBe(0);
      expect(mergedGroups[0].subGroups[0].subGroups[0].subGroups.length).toBe(
        1
      );
      expect(mergedGroups[0].subGroups[0].subGroups[0].attributes?.length).toBe(
        0
      );
      expect(
        mergedGroups[0].subGroups[0].subGroups[0].subGroups[0].subGroups.length
      ).toBe(0);
      expect(
        mergedGroups[0].subGroups[0].subGroups[0].subGroups[0].attributes
          ?.length
      ).toBe(3);

      const deepSubgroup =
        mergedGroups[0].subGroups[0].subGroups[0].subGroups[0];

      const firstAttribute: Configurator.Attribute = deepSubgroup.attributes
        ? deepSubgroup.attributes[0]
        : { name: '' };

      const values: Configurator.Value[] = firstAttribute.values
        ? firstAttribute.values
        : [];

      const valueSupplements = attributeSupplements[0].valueSupplements;

      expect(values[0].valuePrice?.formattedValue).toEqual(
        valueSupplements[0].priceValue.formattedValue
      );
      expect(values[1].valueCode).toEqual(
        valueSupplements[1].attributeValueKey
      );
      expect(values[1].valuePrice?.formattedValue).toEqual(
        valueSupplements[1].priceValue.formattedValue
      );
      expect(values[2].valueCode).toEqual(
        valueSupplements[2].attributeValueKey
      );
      expect(values[2].valuePrice?.formattedValue).toEqual(
        valueSupplements[2].priceValue.formattedValue
      );
    });
  });

  describe('mergeConfigurationGroups', () => {
    it('should return existing groups if incoming groups are empty', () => {
      const existingGroups = [ConfiguratorTestUtils.createGroup('group1')];

      expect(
        ConfiguratorStateUtils.mergeConfigurationGroups(existingGroups, [])
      ).toBe(existingGroups);
    });

    it('should return incoming groups if existing groups are empty', () => {
      const incomingGroups = [ConfiguratorTestUtils.createGroup('group1')];
      expect(
        ConfiguratorStateUtils.mergeConfigurationGroups([], incomingGroups)
      ).toEqual(incomingGroups);
    });

    it('should keep attributes of previously loaded groups when incoming group has no attributes', () => {
      const existingAttribute: Configurator.Attribute = { name: 'attr1' };
      const existingGroups: Configurator.Group[] = [
        {
          ...ConfiguratorTestUtils.createGroup('group1'),
          attributes: [existingAttribute],
        },
        ConfiguratorTestUtils.createGroup('group2'),
      ];
      const incomingGroups: Configurator.Group[] = [
        {
          ...ConfiguratorTestUtils.createGroup('group1'),
          attributes: [],
        },
        {
          ...ConfiguratorTestUtils.createGroup('group2'),
          attributes: [{ name: 'attr2' }],
        },
      ];

      const mergedGroups = ConfiguratorStateUtils.mergeConfigurationGroups(
        existingGroups,
        incomingGroups
      );

      expect(mergedGroups[0].attributes).toEqual([existingAttribute]);
      expect(mergedGroups[1].attributes?.[0].name).toBe('attr2');
    });

    it('should keep incoming group unchanged when no existing group matches', () => {
      const existingGroups: Configurator.Group[] = [
        ConfiguratorTestUtils.createGroup('existing'),
      ];
      const incomingGroup: Configurator.Group = {
        ...ConfiguratorTestUtils.createGroup('incoming'),
        attributes: [{ name: 'incomingAttr' }],
      };

      const mergedGroups = ConfiguratorStateUtils.mergeConfigurationGroups(
        existingGroups,
        [incomingGroup]
      );

      expect(mergedGroups[0]).toBe(incomingGroup);
    });

    it('should recursively merge subgroups and preserve loaded subgroup attributes', () => {
      const existingSubGroup: Configurator.Group = {
        ...ConfiguratorTestUtils.createGroup('sub-1'),
        attributes: [{ name: 'persistedAttr' }],
      };
      const existingGroups: Configurator.Group[] = [
        {
          ...ConfiguratorTestUtils.createGroup('root'),
          subGroups: [existingSubGroup],
        },
      ];
      const incomingGroups: Configurator.Group[] = [
        {
          ...ConfiguratorTestUtils.createGroup('root'),
          subGroups: [
            {
              ...ConfiguratorTestUtils.createGroup('sub-1'),
              attributes: [],
            },
          ],
        },
      ];

      const mergedGroups = ConfiguratorStateUtils.mergeConfigurationGroups(
        existingGroups,
        incomingGroups
      );

      expect(mergedGroups[0].subGroups[0].attributes?.[0].name).toBe(
        'persistedAttr'
      );
    });
  });

  describe('findGroupById', () => {
    it('should find nested group recursively', () => {
      const groups: Configurator.Group[] = [
        {
          ...ConfiguratorTestUtils.createGroup('root'),
          subGroups: [ConfiguratorTestUtils.createGroup('nested')],
        },
      ];

      expect(
        ConfiguratorStateUtils['findGroupById'](groups, 'nested')?.id
      ).toBe('nested');
    });

    it('should return undefined when group cannot be found', () => {
      const groups: Configurator.Group[] = [
        ConfiguratorTestUtils.createGroup('root'),
      ];

      expect(
        ConfiguratorStateUtils['findGroupById'](groups, 'missing')
      ).toBeUndefined();
    });
  });
});
