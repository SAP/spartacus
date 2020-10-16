import { inject, TestBed } from '@angular/core/testing';
import { EntitiesModel, Occ, OccConfig } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { OccUserGroupListNormalizer } from './occ-user-group-list-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('UserGroupListNormalizer', () => {
  let service: OccUserGroupListNormalizer;

  const userGroup: Occ.OrgUnitUserGroup = {
    name: 'testName',
  };

  const userGroupList: Occ.OrgUnitUserGroupList = {
    orgUnitUserGroups: [userGroup],
  };

  const targetUserGroup: UserGroup = {
    name: 'testName',
  };

  const targetUserGroupList: EntitiesModel<UserGroup> = {
    values: [targetUserGroup],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccUserGroupListNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccUserGroupListNormalizer);
  });

  it('should inject OccUserGroupListNormalizer', inject(
    [OccUserGroupListNormalizer],
    (userGroupListNormalizer: OccUserGroupListNormalizer) => {
      expect(userGroupListNormalizer).toBeTruthy();
    }
  ));

  it('should convert user group list', () => {
    const result = service.convert(userGroupList);
    expect(result.values).toEqual(targetUserGroupList.values);
  });

  it('should convert user group list with applied target', () => {
    const result = service.convert(userGroupList, targetUserGroupList);
    expect(result).toEqual(targetUserGroupList);
  });
});
