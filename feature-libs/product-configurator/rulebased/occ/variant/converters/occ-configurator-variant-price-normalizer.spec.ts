import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { OccConfiguratorVariantPriceNormalizer } from './occ-configurator-variant-price-normalizer';
import { Configurator } from '@spartacus/product-configurator/rulebased';

class MockConverterService {
  convert() {}
}

fdescribe('OccConfiguratorVariantPriceNormalizer', () => {
  let classUnderTest: OccConfiguratorVariantPriceNormalizer;

  function createValueSupplements(
    valueKey: string,
    formattedValuePrice: string,
    valuePrice: number
  ): OccConfigurator.ValueSupplements {
    const occValue: OccConfigurator.ValueSupplements = {
      attributeValueKey: valueKey,
      priceValue: {
        currencyIso: '',
        formattedValue: formattedValuePrice,
        value: valuePrice,
      },
      obsoletePriceValue: {
        currencyIso: '',
        formattedValue: formattedValuePrice,
        value: valuePrice,
      },
    };
    return occValue;
  }

  function createValueSupplementsList(
    attributeNr: number,
    amountOfValues: number
  ): OccConfigurator.ValueSupplements[] {
    const occValues: OccConfigurator.ValueSupplements[] = [];
    for (let index = 0; index < amountOfValues; index++) {
      const number = index + 1;
      const valueKey = 'value_' + attributeNr + '_' + number;
      const valuePrice = 100 * number;
      const formattedValuePrice = valuePrice.toString() + ' €';
      const occValue = createValueSupplements(
        valueKey,
        formattedValuePrice,
        valuePrice
      );
      occValues.push(occValue);
    }
    return occValues;
  }

  function createSupplement(
    attributeNr: number,
    attributeKey: string,
    amountOfValues: number
  ): OccConfigurator.Supplements {
    return {
      csticUiKey: attributeKey,
      selectedValues: [],
      priceSupplements: createValueSupplementsList(attributeNr, amountOfValues),
    };
  }

  function createSupplementsList(
    isMultiLevel: boolean,
    amountOfGroups: number,
    amountOfSubgroups: number,
    amountOfSupplements: number,
    amountOfValues: number
  ): OccConfigurator.Supplements[] {
    const occSupplements: OccConfigurator.Supplements[] = [];
    for (let i = 0; i < amountOfGroups; i++) {
      const groupNr = i + 1;
      let uiKey = 'group' + groupNr + '@';
      if (isMultiLevel) {
        for (let k = 0; k < amountOfSubgroups; k++) {
          const subgroupNr = k + 1;
          uiKey += 'subGroup' + subgroupNr + '@';
        }
      }
      for (let j = 0; j < amountOfSupplements; j++) {
        const attributeNr = j + 1;
        const csticUiKey = uiKey + 'attribute_' + groupNr + '_' + attributeNr;
        const occSupplement = createSupplement(
          attributeNr,
          csticUiKey,
          amountOfValues
        );
        occSupplements.push(occSupplement);
      }
    }
    return occSupplements;
  }

  function createOccConfiguratorPrices(
    isMultiLevel: boolean,
    amountOfGroups: number,
    amountOfSubgroups: number,
    amountOfSupplements: number,
    amountOfValues: number
  ): OccConfigurator.Prices {
    return {
      attributes: createSupplementsList(
        isMultiLevel,
        amountOfGroups,
        amountOfSubgroups,
        amountOfSupplements,
        amountOfValues
      ),
      priceSummary: undefined,
    };
  }

  function createGroups(
    amountOfGroups: number,
    amountOfSubgroups?: number
  ): Configurator.Group[] {
    let groups: Configurator.Group[] = [];

    for (let i = 0; i < amountOfGroups; i++) {
      const groupNr = i + 1;
      const groupId = 'groupID-' + groupNr;
      const group: Configurator.Group = {
        id: groupId,
        name: groupId,
        subGroups: [],
        attributes: [],
      };

      for (let j = 0; j < amountOfSubgroups; j++) {
        const subGroupNr = j + 1;
        const subGroupId = groupId + '@subGroupID-' + subGroupNr;
        const subGroup: Configurator.Group = {
          id: subGroupId,
          name: subGroupId,
          subGroups: [],
          attributes: [],
        };

        if (group?.subGroups.indexOf(subGroup) === -1) {
          group?.subGroups.push(subGroup);
        }
      }
      groups.push(group);
    }

    return groups;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantPriceNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    classUnderTest = TestBed.inject(
      OccConfiguratorVariantPriceNormalizer as Type<OccConfiguratorVariantPriceNormalizer>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('convertValue', () => {
    it('should return empty values list', () => {
      const occValues: OccConfigurator.ValueSupplements[] = [];
      const result = classUnderTest.convertValue(occValues);
      expect(result.length).toBe(0);
    });

    it('should return a values list with one value in it', () => {
      const occValues = createValueSupplementsList(1, 1);
      const result = classUnderTest.convertValue(occValues);
      expect(result.length).toBe(1);
      expect(result[0].valueCode).toBe('value_1_1');
      expect(result[0].valuePrice).toEqual(occValues[0].priceValue);
    });
  });

  describe('convertAttribute', () => {
    it('should return an attribute with an attribute name but with empty list of values', () => {
      const attributeName = 'attribute_1';
      const values: Configurator.Value[] = [];
      const attribute = classUnderTest.convertAttribute(attributeName, values);
      expect(attribute).toBeDefined();
      expect(attribute.name).toBe(attributeName);
      expect(attribute.values.length).toBe(0);
    });

    it('should return an attribute with an attribute name but a list of values', () => {
      const attributeName = 'attribute_1';
      const occValues = createValueSupplementsList(1, 5);
      const values = classUnderTest.convertValue(occValues);
      const attribute = classUnderTest.convertAttribute(attributeName, values);
      expect(attribute).toBeDefined();
      expect(attribute.name).toBe(attributeName);
      expect(attribute.values.length).toBe(occValues.length);
    });
  });

  describe('convertGroup', () => {
    it('should return new group', () => {
      const groups: Configurator.Group[] = createGroups(0);
      const groupId = 'groupID-1';
      const result = classUnderTest.convertGroup(groups, groupId);
      expect(result.id).toEqual(groupId);
    });

    it('should return an existing group', () => {
      const groups: Configurator.Group[] = createGroups(10);
      const groupId = 'groupID-8';
      const result = classUnderTest.convertGroup(groups, groupId);
      expect(result.id).toEqual(groupId);
    });

    it('should return an existing subgroup', () => {
      const groups: Configurator.Group[] = createGroups(5, 5);
      const groupId = 'groupID-2@subGroupID-4';
      const result = classUnderTest.convertGroup(groups, groupId);
      expect(result.id).toEqual(groupId);
    });
  });

  describe('convert', () => {
    it('should return a converted configuration with one group without any subgroups', () => {
      const source: OccConfigurator.Prices = createOccConfiguratorPrices(
        false,
        1,
        0,
        3,
        3
      );
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result).toBeDefined();
      expect(result.groups.length).toBe(1);
      expect(result.groups[0].attributes.length).toBe(3);
    });

    it('should return a converted configuration with more than one group without any subgroups', () => {
      const source: OccConfigurator.Prices = createOccConfiguratorPrices(
        false,
        3,
        0,
        3,
        3
      );
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result).toBeDefined();
      expect(result.groups.length).toBe(3);
      expect(result.groups[0].attributes.length).toBe(3);
      expect(result.groups[1].attributes.length).toBe(3);
      expect(result.groups[2].attributes.length).toBe(3);
    });

    it('should return a converted configuration with one group with one subgroup', () => {
      const source: OccConfigurator.Prices = createOccConfiguratorPrices(
        true,
        1,
        1,
        3,
        3
      );
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result).toBeDefined();
      expect(result.groups.length).toBe(1);
      expect(result.groups[0].attributes?.length).toBe(0);
      expect(result.groups[0].subGroups.length).toBe(1);
      expect(result.groups[0].subGroups[0].attributes.length).toBe(3);
    });

    fit('should return a converted configuration with two groups with more than one subgroup', () => {
      const source: OccConfigurator.Prices = createOccConfiguratorPrices(
        true,
        2,
        3,
        3,
        3
      );
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result).toBeDefined();
      expect(result.groups.length).toBe(2);
      expect(result.groups[0].id).toEqual('group1');
      expect(result.groups[0].attributes?.length).toBe(0);
      expect(result.groups[0].subGroups.length).toBe(1);
      expect(result.groups[0].subGroups[0].id).toEqual('group1@subGroup1');
      expect(result.groups[0].subGroups[0].attributes.length).toBe(0);
      expect(result.groups[0].subGroups[0].subGroups.length).toBe(1);
      expect(result.groups[0].subGroups[0].subGroups[0].id).toEqual(
        'group1@subGroup1@subGroup2'
      );
      expect(result.groups[0].subGroups[0].subGroups[0].attributes.length).toBe(
        0
      );
      expect(result.groups[0].subGroups[0].subGroups[0].subGroups.length).toBe(
        1
      );
      expect(result.groups[0].subGroups[0].subGroups[0].subGroups[0].id).toBe(
        'group1@subGroup1@subGroup2@subGroup3'
      );
      expect(
        result.groups[0].subGroups[0].subGroups[0].subGroups[0].attributes
          .length
      ).toBe(3);
      expect(
        result.groups[0].subGroups[0].subGroups[0].subGroups[0].subGroups.length
      ).toBe(0);

      expect(result.groups[1].id).toEqual('group2');
      expect(result.groups[1].attributes?.length).toBe(0);
      expect(result.groups[1].subGroups.length).toBe(1);
      expect(result.groups[1].subGroups[0].id).toEqual('group2@subGroup1');
      expect(result.groups[1].subGroups[0].attributes.length).toBe(0);
      expect(result.groups[1].subGroups[0].subGroups.length).toBe(1);
      expect(result.groups[1].subGroups[0].subGroups[0].id).toEqual(
        'group2@subGroup1@subGroup2'
      );
      expect(result.groups[1].subGroups[0].subGroups[0].attributes.length).toBe(
        0
      );
      expect(result.groups[1].subGroups[0].subGroups[0].subGroups.length).toBe(
        1
      );
      expect(result.groups[1].subGroups[0].subGroups[0].subGroups[0].id).toBe(
        'group2@subGroup1@subGroup2@subGroup3'
      );
      expect(
        result.groups[1].subGroups[0].subGroups[0].subGroups[0].attributes
          .length
      ).toBe(3);
      expect(
        result.groups[1].subGroups[0].subGroups[0].subGroups[0].subGroups.length
      ).toBe(0);
    });
  });
});
