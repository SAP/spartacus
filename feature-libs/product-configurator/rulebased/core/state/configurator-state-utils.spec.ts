import { ConfiguratorTestUtils } from '../../shared/testing/configurator-test-utils';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorStateUtils } from './configurator-state-utils';
describe('ConfiguratorStateUtils', () => {
  const PRODUCT_CODE = 'CONF_LAPTOP';

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
    it('should return undefined because both key and name are undefined', () => {
      expect(
        ConfiguratorStateUtils.getKey(undefined, undefined)
      ).toBeUndefined();
    });

    it('should return undefined because the key is undefined', () => {
      expect(
        ConfiguratorStateUtils.getKey(undefined, 'attributeId')
      ).toBeUndefined();
    });

    it('should return undefined because the name is undefined', () => {
      expect(
        ConfiguratorStateUtils.getKey(
          'groupId@subGroupId@attributeId',
          undefined
        )
      ).toBeUndefined();
    });

    it('should return a key', () => {
      expect(
        ConfiguratorStateUtils.getKey(
          'groupId@subGroupId@attributeId',
          'attributeId'
        )
      ).toEqual('groupId@subGroupId');
    });
  });

  describe('getGroup', () => {
    it('should return undefined because there are no groups', () => {
      const groups: Configurator.Group[] = [];
      expect(
        ConfiguratorStateUtils.getGroup(
          groups,
          'groupId@subGroupId@attributeId'
        )
      ).toBeUndefined();
    });

    it('should return undefined because there is no search group in the groups list', () => {
      const groups: Configurator.Group[] = [];
      for (let index = 1; index <= 4; index++) {
        const groupId = 'group' + index;
        const group: Configurator.Group = ConfiguratorTestUtils.createGroup(
          groupId
        );
        groups.push(group);
      }

      expect(
        ConfiguratorStateUtils.getGroup(
          groups,
          'groupId@subGroupId@attributeId'
        )
      ).toBeUndefined();
    });

    it('should return undefined because attribute UI key is undefined or null', () => {
      const groups: Configurator.Group[] = [];
      for (let index = 1; index <= 4; index++) {
        const groupId = 'group' + index;
        const group: Configurator.Group = ConfiguratorTestUtils.createGroup(
          groupId
        );
        groups.push(group);
      }

      expect(ConfiguratorStateUtils.getGroup(groups, null)).toBeUndefined();
    });

    it('should return a searched group', () => {
      const groups: Configurator.Group[] = [];
      for (let index = 1; index <= 4; index++) {
        const groupId = 'group' + index;
        const group: Configurator.Group = ConfiguratorTestUtils.createGroup(
          groupId
        );
        groups.push(group);
      }

      const result = ConfiguratorStateUtils.getGroup(
        groups,
        'group3@subGroupId@attributeId'
      );
      expect(result.id).toEqual('group3');
    });
  });

  describe('getAttribute', () => {
    it('should return undefined because there are no attribute', () => {
      const attributes: Configurator.Attribute[] = [];
      expect(
        ConfiguratorStateUtils.getAttribute(attributes, 'attributeId')
      ).toBeUndefined();
    });

    it('should return undefined because there is no search attribute in the attributes list', () => {
      const attributes: Configurator.Attribute[] = ConfiguratorTestUtils.createListOfAttributes(
        1,
        5,
        0
      );
      expect(
        ConfiguratorStateUtils.getAttribute(attributes, 'attributeId')
      ).toBeUndefined();
    });

    it('should return undefined because attribute name is undefined or null null', () => {
      const attributes: Configurator.Attribute[] = ConfiguratorTestUtils.createListOfAttributes(
        1,
        5,
        0
      );
      expect(
        ConfiguratorStateUtils.getAttribute(attributes, null)
      ).toBeUndefined();
    });

    it('should return a searched attribute', () => {
      const attributes: Configurator.Attribute[] = ConfiguratorTestUtils.createListOfAttributes(
        1,
        5,
        0
      );

      const result = ConfiguratorStateUtils.getAttribute(
        attributes,
        'attribute_1_3'
      );
      expect(result.name).toEqual('attribute_1_3');
    });
  });

  describe('getValue', () => {
    it('should return undefined because there are no values', () => {
      const values: Configurator.Value[] = [];
      expect(
        ConfiguratorStateUtils.getValue(values, 'valueId')
      ).toBeUndefined();
    });

    it('should return undefined because there is no search value in the values list', () => {
      const values: Configurator.Value[] = ConfiguratorTestUtils.createListOfValues(
        1,
        5
      );
      expect(
        ConfiguratorStateUtils.getValue(values, 'value_1_10')
      ).toBeUndefined();
    });

    it('should return undefined because value code is undefined or null', () => {
      const values: Configurator.Value[] = ConfiguratorTestUtils.createListOfValues(
        1,
        5
      );
      expect(ConfiguratorStateUtils.getValue(values, null)).toBeUndefined();
    });

    it('should return a searched value', () => {
      const values: Configurator.Value[] = ConfiguratorTestUtils.createListOfValues(
        1,
        5
      );
      const result = ConfiguratorStateUtils.getValue(values, 'value_1_3');
      expect(result.valueCode).toEqual('value_1_3');
    });
  });

  describe('updateValuePrices', () => {
    it('should not update value prices because the list of groups is empty', () => {
      const groups: Configurator.Group[] = [];
      const attributeSupplements: Configurator.AttributeSupplement[] = [];
      ConfiguratorStateUtils.updateValuePrices(groups, attributeSupplements);
      expect(groups?.length).toBe(0);
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
      ConfiguratorStateUtils.updateValuePrices(groups, attributeSupplements);

      expect(groups.length).toBe(1);
      expect(groups[0].subGroups.length).toBe(0);
      expect(groups[0].attributes.length).toBe(3);

      const values = groups[0].attributes[0].values;
      const valueSupplements = attributeSupplements[0].valueSupplements;
      expect(values.length).toBe(3);
      expect(values[0].valueCode).toEqual(
        valueSupplements[0].attributeValueKey
      );
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
      ConfiguratorStateUtils.updateValuePrices(groups, attributeSupplements);

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
