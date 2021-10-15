import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_3,
} from '../../../testing/configurator-test-data';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantOverviewNormalizer } from './occ-configurator-variant-overview-normalizer';

const generalGroupName = '_GEN';
const generalGroupDescription = 'General';
const groupDescription = 'The Group Name';
const groupId = '1';
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
      id: groupId,
      groupDescription: groupDescription,

      attributes: [
        {
          attribute: 'C1',
          attributeId: undefined,
          value: 'V1',
          valueId: undefined,
        },
      ],
      subGroups: [
        {
          id: '11',
          groupDescription: undefined,
          attributes: [],
        },
      ],
    },
    {
      id: '2',
      groupDescription: 'Group 2',
      attributes: [
        {
          attribute: 'C2',
          attributeId: undefined,
          value: 'V2',
          valueId: undefined,
        },
        {
          attribute: 'C3',
          attributeId: undefined,
          value: 'V3',
          valueId: undefined,
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
      characteristicValues: undefined,
    },
  ],
};
Object.freeze(group3);
const subGroups: OccConfigurator.GroupOverview[] = [group3];
Object.freeze(subGroups);

const subgroup: OccConfigurator.GroupOverview = { id: '11' };
const group1: OccConfigurator.GroupOverview = {
  id: groupId,
  groupDescription: groupDescription,
  characteristicValues: [
    {
      characteristic: 'C1',
      value: 'V1',
    },
  ],
  subGroups: [subgroup],
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
      OccConfiguratorVariantOverviewNormalizer as Type<OccConfiguratorVariantOverviewNormalizer>
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
    expect(result.groups?.length).toBe(2);
  });

  it('should be able to handle groups without attributes', () => {
    const group: OccConfigurator.GroupOverview = {
      subGroups: undefined,
      characteristicValues: undefined,
      id: group1.id,
    };

    const result = occConfiguratorVariantOverviewNormalizer.convertGroup(group);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(group.id);
  });

  it('should be able to handle groups with subgroups', () => {
    const groupWithSubgroups: OccConfigurator.GroupOverview = {
      id: groupId,
      subGroups: [group1, group3],
    };

    const result =
      occConfiguratorVariantOverviewNormalizer.convertGroup(groupWithSubgroups);
    expect(result.length).toBe(1);
  });

  it('should fill subgroups in the target model accross 3 levels', () => {
    const thirdLevelGroup: OccConfigurator.GroupOverview = { id: GROUP_ID_1 };
    const secondLevelGroup: OccConfigurator.GroupOverview = {
      id: GROUP_ID_2,
      subGroups: [thirdLevelGroup],
    };
    const groupWithSubgroups: OccConfigurator.GroupOverview = {
      id: GROUP_ID_3,
      subGroups: [group1, group3, secondLevelGroup],
    };

    const result =
      occConfiguratorVariantOverviewNormalizer.convertGroup(groupWithSubgroups);
    const rootGroup = result[0];
    expect(rootGroup).toBeDefined();
    const subGroups = rootGroup.subGroups;
    if (subGroups) {
      expect(subGroups.length).toBe(3);
      const secondLevelGroupInResult = subGroups[2];
      expect(secondLevelGroupInResult.subGroups?.length).toBe(1);
    } else {
      fail();
    }
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
    const result =
      occConfiguratorVariantOverviewNormalizer.convertGroup(group1);
    expect(result[0].groupDescription).toBe(groupDescription);
  });
  it('should convert a general group', () => {
    const result =
      occConfiguratorVariantOverviewNormalizer.convertGroup(generalGroup);
    expect(result[0].groupDescription).toBe(generalGroupDescription);
  });
});
