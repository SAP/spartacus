import { inject, TestBed } from '@angular/core/testing';
import { B2BUser, EntitiesModel, Occ, OccConfig } from '@spartacus/core';
import { OccUserListNormalizer } from './occ-user-list-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('UserListNormalizer', () => {
  let service: OccUserListNormalizer;

  const user: Occ.B2BUser = {
    name: 'testName',
  };

  const userList: Occ.OrgUnitUserList = {
    users: [user],
  };

  const targetUser: B2BUser = {
    name: 'testName',
  };

  const targetUserList: EntitiesModel<B2BUser> = {
    values: [targetUser],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccUserListNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccUserListNormalizer);
  });

  it('should inject OccUserListNormalizer', inject(
    [OccUserListNormalizer],
    (userListNormalizer: OccUserListNormalizer) => {
      expect(userListNormalizer).toBeTruthy();
    }
  ));

  it('should convert user list', () => {
    const result = service.convert(userList);
    expect(result.values).toEqual(targetUserList.values);
  });

  it('should convert user list with applied target', () => {
    const result = service.convert(userList, targetUserList);
    expect(result).toEqual(targetUserList);
  });
});
