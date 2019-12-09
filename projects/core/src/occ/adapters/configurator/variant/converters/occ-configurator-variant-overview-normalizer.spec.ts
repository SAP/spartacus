import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '../../../../../model/configurator.model';
import { ConverterService } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantOverviewNormalizer } from './occ-configurator-variant-overview-normalizer';

const convertedOverview: Configurator.Overview = {
  groups: [
    {
      id: '1',
      groupDescription: 'Group 1',
      attributes: [
        {
          attribute: 'C1',
          value: 'V1',
        },
      ],
    },
    {
      id: '2',
      groupDescription: 'Group 2',
      attributes: [
        {
          attribute: 'C2',
          value: 'V2',
        },
        {
          attribute: 'C3',
          value: 'V3',
        },
      ],
    },
  ],
};

const overview: OccConfigurator.Overview = {
  id: '1234-4568',
  groups: [
    {
      id: '1',
      groupDescription: 'Group 1',
      characteristicValues: [
        {
          characteristic: 'C1',
          value: 'V1',
        },
      ],
    },
    {
      id: '2',
      groupDescription: 'Group 2',
      characteristicValues: [
        {
          characteristic: 'C2',
          value: 'V2',
        },
        {
          characteristic: 'C3',
          value: 'V3',
        },
      ],
    },
  ],
};

class MockConverterService {
  convert() {}
}

describe('OccConfiguratorVariantNormalizer', () => {
  let occConfiguratorVariantOverviewNormalizer: OccConfiguratorVariantOverviewNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantOverviewNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occConfiguratorVariantOverviewNormalizer = TestBed.get(
      OccConfiguratorVariantOverviewNormalizer as Type<
        OccConfiguratorVariantOverviewNormalizer
      >
    );
  });

  it('should be created', () => {
    expect(occConfiguratorVariantOverviewNormalizer).toBeTruthy();
  });

  it('should convert the overview', () => {
    const result = occConfiguratorVariantOverviewNormalizer.convert(overview);
    expect(result).toEqual(convertedOverview);
  });
});
