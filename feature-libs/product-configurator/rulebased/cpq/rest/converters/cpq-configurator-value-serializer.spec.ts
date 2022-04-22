import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorValueSerializer } from './cpq-configurator-value-serializer';

const configId = '1';
const attrCode = 222;
const attributeName = '9999';
const valueCode = 'abc';
const groupIdOfChangedAttribute = '1';

const attribute = {
  attrCode: attrCode,
  name: attributeName,
  values: [{ valueCode: valueCode, quantity: 5 }],
  groupId: groupIdOfChangedAttribute,
};

const attributeWoValues = {
  ...attribute,
  values: undefined,
};

const attributeValuesEmpty = {
  ...attribute,
  values: [],
};
const configuration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(configId),
  groups: [
    {
      ...ConfiguratorTestUtils.createGroup(groupIdOfChangedAttribute),
      attributes: [attribute],
    },
  ],
};

describe('CpqConfiguratorValueSerializer', () => {
  let cpqConfiguratorSerializer: CpqConfiguratorValueSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqConfiguratorValueSerializer],
    });

    cpqConfiguratorSerializer = TestBed.inject(
      CpqConfiguratorValueSerializer as Type<CpqConfiguratorValueSerializer>
    );
  });

  it('should convert configuration correctly', () => {
    const updateValue: Cpq.UpdateValue =
      cpqConfiguratorSerializer.convert(configuration);
    expect(updateValue.configurationId).toBe(configId);
    expect(updateValue.standardAttributeCode).toBe(attrCode.toString());
    expect(updateValue.attributeValueId).toBe(valueCode);
    expect(updateValue.quantity).toBe(5);
    expect(updateValue.tabId).toBe(groupIdOfChangedAttribute);
  });

  describe('findFirstChangedValue', () => {
    it('should find value if present', () => {
      const value =
        cpqConfiguratorSerializer['findFirstChangedValue'](attribute);
      expect(value.valueCode).toBe(valueCode);
    });

    it('should throw error if no value was found', () => {
      expect(() =>
        cpqConfiguratorSerializer['findFirstChangedValue'](attributeValuesEmpty)
      ).toThrowError();
    });

    it('should throw error if values are not defined', () => {
      expect(() =>
        cpqConfiguratorSerializer['findFirstChangedValue'](attributeWoValues)
      ).toThrowError();
    });
  });
});
