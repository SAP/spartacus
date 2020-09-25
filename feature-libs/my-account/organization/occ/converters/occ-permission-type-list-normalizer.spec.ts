import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Occ, OccConfig } from '@spartacus/core';
import { OrderApprovalPermissionType } from '../../core/model/permission.model';
import { OccPermissionTypeListNormalizer } from './occ-permission-type-list.normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('PermissionTypeListNormalizer', () => {
  let service: OccPermissionTypeListNormalizer;

  const permissionType: Occ.OrderApprovalPermissionType = {
    code: 'testCode',
  };

  const permissionTypeList: Occ.OrderApprovalPermissionTypeList = {
    orderApprovalPermissionTypes: [permissionType],
  };

  const targetPermissionType: OrderApprovalPermissionType = {
    code: 'testCode',
  };

  const targetPermissionTypeList: OrderApprovalPermissionType[] = [
    targetPermissionType,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccPermissionTypeListNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(
      OccPermissionTypeListNormalizer as Type<OccPermissionTypeListNormalizer>
    );
  });

  it('should inject OccPermissionTypeListNormalizer', inject(
    [OccPermissionTypeListNormalizer],
    (permissionsListNormalizer: OccPermissionTypeListNormalizer) => {
      expect(permissionsListNormalizer).toBeTruthy();
    }
  ));

  it('should convert permission type list', () => {
    const result = service.convert(permissionTypeList);
    expect(result).toEqual(targetPermissionTypeList);
  });

  it('should convert permission type list with applied target', () => {
    const result = service.convert(
      permissionTypeList,
      targetPermissionTypeList
    );
    expect(result).toEqual(targetPermissionTypeList);
  });
});
