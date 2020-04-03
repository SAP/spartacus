import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { UserGroup } from '../../../../model/user-group.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { OccUserGroupNormalizer } from './occ-user-group-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OrgUnitUserGroupNormalizer', () => {
  let service: OccUserGroupNormalizer;

  const userGroup: Occ.OrgUnitUserGroup = {
    name: 'OrgUnitUserGroup1',
    uid: 'testUid',
  };

  const convertedOrgUnitUserGroup: UserGroup = {
    name: 'OrgUnitUserGroup1',
    uid: 'testUid',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccUserGroupNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(
      OccUserGroupNormalizer as Type<OccUserGroupNormalizer>
    );
  });

  it('should inject OccOrgUnitUserGroupNormalizer', inject(
    [OccUserGroupNormalizer],
    (userGroupNormalizer: OccUserGroupNormalizer) => {
      expect(userGroupNormalizer).toBeTruthy();
    }
  ));

  it('should convert userGroup', () => {
    const result = service.convert(userGroup);
    expect(result).toEqual(convertedOrgUnitUserGroup);
  });

  it('should convert userGroup with applied target', () => {
    const result = service.convert(userGroup, {});
    expect(result).toEqual({});
  });
});
