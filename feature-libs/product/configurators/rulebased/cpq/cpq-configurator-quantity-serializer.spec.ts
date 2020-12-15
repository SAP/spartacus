import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from './../core/model/configurator.model';
import { CpqConfiguratorQuantitySerializer } from './cpq-configurator-quantity-serializer';
import { Cpq } from './cpq.models';

const configId = '1';
const attrCode = 222;
const attributeName = '9999';
const valueCode = 'abc';

const configuration: Configurator.Configuration = {
  configId: configId,
  groups: [
    {
      attributes: [
        {
          attrCode: attrCode,
          name: attributeName,
          values: [{ valueCode: valueCode, quantity: 5 }],
        },
      ],
    },
  ],
};

describe('CpqConfiguratorQuantitySerializer', () => {
  let cpqConfiguratorSerializer: CpqConfiguratorQuantitySerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqConfiguratorQuantitySerializer],
    });

    cpqConfiguratorSerializer = TestBed.inject(
      CpqConfiguratorQuantitySerializer as Type<
        CpqConfiguratorQuantitySerializer
      >
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
  });
});
