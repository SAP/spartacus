import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { EntitiesModel } from '@spartacus/core';
import { B2BUser } from 'projects/core/src/model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
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

    service = TestBed.get(OccUserListNormalizer as Type<OccUserListNormalizer>);
  });

  it('should inject OccUserListNormalizer', inject(
    [OccUserListNormalizer],
    (userListNormalizer: OccUserListNormalizer) => {
      expect(userListNormalizer).toBeTruthy();
    }
  ));

  it('should convert user list', () => {
    const result = service.convert(userList);
    expect(result).toEqual(targetUserList);
  });

  it('should convert user list with applied target', () => {
    const result = service.convert(userList, targetUserList);
    expect(result).toEqual(targetUserList);
  });
});
