import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OrgUnitUserGroup } from '../../../../model/user-group.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { OccOrgUnitUserGroupNormalizer } from './occ-user-group-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OrgUnitUserGroupNormalizer', () => {
  let service: OccOrgUnitUserGroupNormalizer;

  const orgUnitUserGroup: Occ.OrgUnitUserGroup = {
    name: 'OrgUnitUserGroup1',
    uid: 'testUid',
  };

  const convertedOrgUnitUserGroup: OrgUnitUserGroup = {
    name: 'OrgUnitUserGroup1',
    uid: 'testUid',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitUserGroupNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(
      OccOrgUnitUserGroupNormalizer as Type<OccOrgUnitUserGroupNormalizer>
    );
  });

  it('should inject OccOrgUnitUserGroupNormalizer', inject(
    [OccOrgUnitUserGroupNormalizer],
    (orgUnitUserGroupNormalizer: OccOrgUnitUserGroupNormalizer) => {
      expect(orgUnitUserGroupNormalizer).toBeTruthy();
    }
  ));

  it('should convert orgUnitUserGroup', () => {
    const result = service.convert(orgUnitUserGroup);
    expect(result).toEqual(convertedOrgUnitUserGroup);
  });

  it('should convert orgUnitUserGroup with applied target', () => {
    const result = service.convert(orgUnitUserGroup, {});
    expect(result).toEqual({});
  });
});
