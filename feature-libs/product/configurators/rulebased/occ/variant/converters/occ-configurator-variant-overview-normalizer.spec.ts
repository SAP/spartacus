import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantOverviewNormalizer } from './occ-configurator-variant-overview-normalizer';

const generalGroupName = '_GEN';
const generalGroupDescription = 'General';
const groupDescription = 'The Group Name';
const configId = '1234-4568';
const PRODUCT_CODE = 'PRODUCT';
const totalNumberOfIssues = 2;

class MockTranslationService {
  translate(): Observable<string> {
    return of(generalGroupDescription);
  }
}

const convertedOverview: Configurator.Overview = {
  configId: configId,
  totalNumberOfIssues: totalNumberOfIssues,
  priceSummary: {},
  productCode: PRODUCT_CODE,
  groups: [
    {
      id: '1',
      groupDescription: groupDescription,

      attributes: [
        {
          attribute: 'C1',
          value: 'V1',
        },
      ],
    },
    {
      id: '11',
      groupDescription: undefined,
      attributes: [],
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

const group3: OccConfigurator.GroupOverview = {
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
};
Object.freeze(group3);
const subGroups: OccConfigurator.GroupOverview[] = [group3];
Object.freeze(subGroups);

const group1: OccConfigurator.GroupOverview = {
  id: '1',
  groupDescription: groupDescription,
  subGroups: [{ id: '11' }],
  characteristicValues: [
    {
      characteristic: 'C1',
      value: 'V1',
    },
  ],
};
Object.freeze(group1);

const generalGroup: OccConfigurator.GroupOverview = {
  id: generalGroupName,
  groupDescription: '',
  characteristicValues: [
    {
      characteristic: 'C1',
      value: 'V1',
    },
  ],
};
Object.freeze(generalGroup);

const overview: OccConfigurator.Overview = {
  id: configId,
  totalNumberOfIssues: totalNumberOfIssues,
  pricing: {},
  productCode: PRODUCT_CODE,
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
Object.freeze(overview);

class MockConverterService {
  convert(source: OccConfigurator.Prices) {
    return source.priceSummary;
  }
}

describe('OccConfiguratorVariantNormalizer', () => {
  let occConfiguratorVariantOverviewNormalizer: OccConfiguratorVariantOverviewNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantOverviewNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    });

    occConfiguratorVariantOverviewNormalizer = TestBed.inject(
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
    const result = occConfiguratorVariantOverviewNormalizer.convert(overview);
    expect(result.groups.length).toBe(3);
  });

  it('should be able to handle groups without attributes', () => {
    const group: OccConfigurator.GroupOverview = {
      subGroups: null,
      characteristicValues: null,
      id: group1.id,
    };

    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(group);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(group.id);
  });

  it('should be able to handle groups with subgroups', () => {
    const groupWithSubgroups: OccConfigurator.GroupOverview = {
      subGroups: [group1, group3],
    };

    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(
      groupWithSubgroups
    );
    expect(result.length).toBe(5);
  });
  it('should set description for a general group', () => {
    const generalTargetGroup: Configurator.GroupOverview = {
      id: generalGroupName,
      groupDescription: '',
      attributes: [],
    };

    occConfiguratorVariantOverviewNormalizer.setGeneralDescription(
      generalTargetGroup
    );
    expect(generalTargetGroup.groupDescription).toBe(generalGroupDescription);
  });

  it('should convert a standard group', () => {
    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(
      group1
    );
    expect(result[0].groupDescription).toBe(groupDescription);
  });
  it('should convert a general group', () => {
    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(
      generalGroup
    );
    expect(result[0].groupDescription).toBe(generalGroupDescription);
  });
});
