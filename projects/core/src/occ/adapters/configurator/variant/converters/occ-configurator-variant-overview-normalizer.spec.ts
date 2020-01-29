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

const subGroups: OccConfigurator.GroupOverview[] = [
  {
    id: '3',
    groupDescription: 'SubGroup',
    characteristicValues: [{ characteristic: 'C3', value: 'V3' }],
    subGroups: [
      {
        id: '4',
        groupDescription: 'SubGroupLevel2',
        characteristicValues: null,
      },
    ],
  },
];

const group1: OccConfigurator.GroupOverview = {
  id: '1',
  groupDescription: 'Group 1',
  characteristicValues: [
    {
      characteristic: 'C1',
      value: 'V1',
    },
  ],
};

const overview: OccConfigurator.Overview = {
  id: '1234-4568',
  groups: [
    group1,
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

  it('should cover sub groups', () => {
    overview.groups[0].subGroups = subGroups;
    const result = occConfiguratorVariantOverviewNormalizer.convert(overview);
    expect(result.groups.length).toBe(4);
  });

  it('should be able to handle groups without attributes', () => {
    group1.subGroups = null;
    group1.characteristicValues = null;
    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(
      group1
    );
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(group1.id);
  });

  it('should be able to handle groups with subgroups', () => {
    group1.subGroups = subGroups;

    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(
      group1
    );
    expect(result.length).toBe(3);
  });
});
