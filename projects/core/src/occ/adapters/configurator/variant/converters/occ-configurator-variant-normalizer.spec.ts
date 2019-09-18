import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Attribute, Value } from '../../../../../model/configurator.model';
import { ConverterService } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantNormalizer } from './occ-configurator-variant-normalizer';

const csticName = 'name';
const valueKey = 'BK';
const valueName = 'Black';
const requiredFlag = true;

const occCstic: OccConfigurator.Characteristic = {
  name: csticName,
};
const occCsticWithValues: OccConfigurator.Characteristic = {
  name: csticName,
  required: requiredFlag,
  domainvalues: [{ key: valueKey }],
};
const configuration: OccConfigurator.Configuration = {
  complete: true,
  groups: [{ cstics: [occCsticWithValues] }],
};

const occValue: OccConfigurator.Value = {
  key: valueKey,
  langdepname: valueName,
};

class MockConverterService {
  convert() {}
}

describe('OccConfiguratorVariantNormalizer', () => {
  let occConfiguratorVariantNormalizer: OccConfiguratorVariantNormalizer;
  let converter: MockConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occConfiguratorVariantNormalizer = TestBed.get(
      OccConfiguratorVariantNormalizer as Type<OccConfiguratorVariantNormalizer>
    );
    converter = TestBed.get(ConverterService as Type<ConverterService>);
    spyOn(converter, 'convert').and.callFake(product => ({
      ...product,
      code: product.code + 'converted',
    }));
  });

  it('should be created', () => {
    expect(occConfiguratorVariantNormalizer).toBeTruthy();
  });

  it('should convert a configuration', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    expect(result.complete).toBe(true);
  });

  it('should cover attributes and values', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    const attributes = result.attributes;
    expect(attributes).toBeDefined();
    expect(attributes.length).toBe(1);
    const attribute = attributes[0];
    expect(attribute.name).toBe(csticName);
    expect(attribute.required).toBe(requiredFlag);
    const values = attribute.values;
    expect(values.length).toBe(1);
  });

  it('should convert values', () => {
    const values: Value[] = [];
    occConfiguratorVariantNormalizer.convertValue(occValue, values);
    expect(values.length).toBe(1);
    expect(values[0].valueCode).toBe(valueKey);
  });

  it('should convert attributes and do not complain if no domain values are present', () => {
    const attributes: Attribute[] = [];
    occConfiguratorVariantNormalizer.convertCharacteristic(
      occCstic,
      attributes
    );
    expect(attributes.length).toBe(1);
    expect(attributes[0].name).toBe(csticName);
  });
});
