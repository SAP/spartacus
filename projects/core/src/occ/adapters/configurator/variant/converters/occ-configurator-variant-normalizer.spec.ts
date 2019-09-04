import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantNormalizer } from './occ-configurator-variant-normalizer';

const csticName = 'name';
const configuration: OccConfigurator.Configuration = {
  complete: true,
  groups: [{ cstics: [{ name: csticName }] }],
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

  it('should cover attributes', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    const attributes = result.attributes;
    expect(attributes).toBeDefined();
    expect(attributes.length).toBe(1);
    const attribute = attributes[0];
    expect(attribute.name).toBe(csticName);
  });
});
