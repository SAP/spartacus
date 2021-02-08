import { inject, TestBed } from '@angular/core/testing';
import { Occ, OccConfig, OrderApprovalPermissionType } from '@spartacus/core';
import { OccPermissionTypeNormalizer } from './occ-permission-type-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('PermissionTypeNormalizer', () => {
  let service: OccPermissionTypeNormalizer;

  const permissionType: Occ.OrderApprovalPermissionType = {
    code: 'testCode',
  };

  const targetPermissionType: OrderApprovalPermissionType = {
    code: 'testCode',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccPermissionTypeNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccPermissionTypeNormalizer);
  });

  it('should inject OccPermissionTypeNormalizer', inject(
    [OccPermissionTypeNormalizer],
    (permissionTypeNormalizer: OccPermissionTypeNormalizer) => {
      expect(permissionTypeNormalizer).toBeTruthy();
    }
  ));

  it('should convert permission type', () => {
    const result = service.convert(permissionType);
    expect(result).toEqual(targetPermissionType);
  });

  it('should convert permission type with applied target', () => {
    const result = service.convert(permissionType, {});
    expect(result).toEqual({});
  });
});
