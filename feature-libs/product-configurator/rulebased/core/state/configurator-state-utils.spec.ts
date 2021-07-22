import { ConfiguratorTestUtils } from '../../shared/testing/configurator-test-utils';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorStateUtils } from './configurator-state-utils';

describe('ConfiguratorStateUtils', () => {
  describe('getAttributeName', () => {
    it('should return attribute name', () => {
      expect(
        ConfiguratorStateUtils.getAttributeName(
          'groupId@subGroupId@attributeId'
        )
      ).toEqual('attributeId');
    });
  });

  describe('getKey', () => {
    it('should return a key', () => {
      expect(
        ConfiguratorStateUtils.getKey(
          'groupId@subGroupId@attributeId',
          'attributeId'
        )
      ).toEqual('groupId@subGroupId');
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

    it('should update value prices for simple product', () => {
      const groups: Configurator.Group[] = ConfiguratorTestUtils.createListOfGroups(
        1,
        0,
        3,
        3
      );
      const attributeSupplements: Configurator.AttributeSupplement[] = ConfiguratorTestUtils.createListOfAttributeSupplements(
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
      const groups: Configurator.Group[] = ConfiguratorTestUtils.createListOfGroups(
        3,
        3,
        3,
        3
      );
      const attributeSupplements: Configurator.AttributeSupplement[] = ConfiguratorTestUtils.createListOfAttributeSupplements(
        true,
        1,
        3,
        1,
        3
      );
      ConfiguratorStateUtils.mergeGroupsWithSupplements(
        groups,
        attributeSupplements
      );

      expect(groups.length).toBe(3);
      expect(groups[0].subGroups.length).toBe(1);
      expect(groups[0].attributes.length).toBe(0);
      expect(groups[0].subGroups[0].subGroups.length).toBe(1);
      expect(groups[0].subGroups[0].attributes.length).toBe(0);
      expect(groups[0].subGroups[0].subGroups[0].subGroups.length).toBe(1);
      expect(groups[0].subGroups[0].subGroups[0].attributes.length).toBe(0);
      expect(
        groups[0].subGroups[0].subGroups[0].subGroups[0].subGroups.length
      ).toBe(0);
      expect(
        groups[0].subGroups[0].subGroups[0].subGroups[0].attributes.length
      ).toBe(3);

      const values =
        groups[0].subGroups[0].subGroups[0].subGroups[0].attributes[0].values;
      const valueSupplements = attributeSupplements[0].valueSupplements;

      expect(values[0].valuePrice.formattedValue).toEqual(
        valueSupplements[0].priceValue.formattedValue
      );
      expect(values[1].valueCode).toEqual(
        valueSupplements[1].attributeValueKey
      );
      expect(values[1].valuePrice.formattedValue).toEqual(
        valueSupplements[1].priceValue.formattedValue
      );
      expect(values[2].valueCode).toEqual(
        valueSupplements[2].attributeValueKey
      );
      expect(values[2].valuePrice.formattedValue).toEqual(
        valueSupplements[2].priceValue.formattedValue
      );
    });
  });
});
