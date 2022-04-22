import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
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

    occConfiguratorTextfieldNormalizer = TestBed.inject(
      OccConfiguratorTextfieldNormalizer as Type<OccConfiguratorTextfieldNormalizer>
    );
  });

  it('should be created', () => {
    expect(occConfiguratorTextfieldNormalizer).toBeTruthy();
  });

  it('should convert a configuration', () => {
    const result: ConfiguratorTextfield.Configuration =
      occConfiguratorTextfieldNormalizer.convert(configuration);
    expect(result.configurationInfos.length).toBe(1);
    expect((result.configurationInfos[0].configurationLabel = csticName));
    expect((result.configurationInfos[0].configurationValue = valueName));
  });
});
