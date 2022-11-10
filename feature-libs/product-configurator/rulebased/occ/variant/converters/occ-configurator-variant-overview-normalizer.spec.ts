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
const generalGroupAttributeName = 'C1';
const generalGroupValueName = 'V1';
const occPrice: OccConfigurator.PriceDetails = {
  currencyIso: 'USD',
  formattedValue: '$545.45',
  value: 545.45,
};
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
      characteristic: generalGroupAttributeName,
      value: generalGroupValueName,
      price: occPrice,
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
      characteristic: generalGroupAttributeName,
      value: generalGroupValueName,
      price: occPrice,
    },
  ],
};
Object.freeze(generalGroup);

const overview: OccConfigurator.Overview = {
  id: configId,
  totalNumberOfIssues: totalNumberOfIssues,
  numberOfConflicts: totalNumberOfIssues - 1,
  numberOfIncompleteCharacteristics: 1,
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
    const rootSubGroups = rootGroup.subGroups;
    if (rootSubGroups) {
      expect(rootSubGroups.length).toBe(3);
      const secondLevelGroupInResult = rootSubGroups[2];
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
    const attribute = result[0]
      ? result[0].attributes
        ? result[0].attributes[0]
        : undefined
      : undefined;
    expect(attribute).toBeDefined();
    if (attribute) {
      expect(attribute.attribute).toBe(generalGroupAttributeName);
      expect(attribute.value).toBe(generalGroupValueName);
      expect(attribute.valuePrice?.currencyIso).toBe(occPrice.currencyIso);
      expect(attribute.valuePrice?.formattedValue).toBe(
        occPrice.formattedValue
      );
      expect(attribute.valuePrice?.value).toBe(occPrice.value);
    }
  });

  it('should set all issue counters when running on commerce 2205 or later', () => {
    let target: Configurator.Overview = { configId: '123', productCode: 'abc' };
    occConfiguratorVariantOverviewNormalizer['setIssueCounters'](
      target,
      overview
    );
    expect(target.totalNumberOfIssues).toBe(2);
    expect(target.numberOfIncompleteCharacteristics).toBe(1);
    expect(target.numberOfConflicts).toBe(1);
  });

  it('should set only total number of issues when running on commerce before 2205', () => {
    let target: Configurator.Overview = { configId: '123', productCode: 'abc' };
    let source: OccConfigurator.Overview = {
      id: '123',
      productCode: 'abc',
      totalNumberOfIssues: 2,
    };
    occConfiguratorVariantOverviewNormalizer['setIssueCounters'](
      target,
      source
    );
    expect(target.totalNumberOfIssues).toBe(2);
    expect(target.numberOfIncompleteCharacteristics).toBeUndefined();
    expect(target.numberOfConflicts).toBeUndefined();
  });
});
