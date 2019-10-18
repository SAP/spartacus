import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorTextfield } from '../../../../../model/configurator-textfield.model';
import { ConverterService } from '../../../../../util/converter.service';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';
import { OccConfiguratorTextfieldNormalizer } from './occ-configurator-textfield-normalizer';

const csticName = 'name';
const valueName = 'Black';

const configuration: OccConfiguratorTextfield.Configuration = {
  configurationInfos: [
    {
      configurationLabel: csticName,
      configurationValue: valueName,
    },
  ],
};

class MockConverterService {
  convert() {}
}

describe('OccConfiguratorTextfieldNormalizer', () => {
  let occConfiguratorTextfieldNormalizer: OccConfiguratorTextfieldNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorTextfieldNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occConfiguratorTextfieldNormalizer = TestBed.get(
      OccConfiguratorTextfieldNormalizer as Type<
        OccConfiguratorTextfieldNormalizer
      >
    );
  });

  it('should be created', () => {
    expect(occConfiguratorTextfieldNormalizer).toBeTruthy();
  });

  it('should convert a configuration', () => {
    const result: ConfiguratorTextfield.Configuration = occConfiguratorTextfieldNormalizer.convert(
      configuration
    );
    expect(result.attributes.length).toBe(1);
    expect((result.attributes[0].name = csticName));
  });
});
