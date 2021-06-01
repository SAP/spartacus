import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Configurator,
  ConfiguratorTestUtils,
} from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorValueSerializer } from './cpq-configurator-value-serializer';

const configId = '1';
const attrCode = 222;
const attributeName = '9999';
const valueCode = 'abc';
const groupIdOfChangedAttribute = '1';

const configuration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(configId),
  groups: [
    {
      attributes: [
        {
          attrCode: attrCode,
          name: attributeName,
          values: [{ valueCode: valueCode, quantity: 5 }],
          groupId: groupIdOfChangedAttribute,
        },
      ],
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
    const updateValue: Cpq.UpdateValue = cpqConfiguratorSerializer.convert(
      configuration
    );
    expect(updateValue.configurationId).toBe(configId);
    expect(updateValue.standardAttributeCode).toBe(attrCode.toString());
    expect(updateValue.attributeValueId).toBe(valueCode);
    expect(updateValue.quantity).toBe(5);
    expect(updateValue.tabId).toBe(groupIdOfChangedAttribute);
  });
});
