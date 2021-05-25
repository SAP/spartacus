import { inject, TestBed } from '@angular/core/testing';
import { Occ, OccConfig } from '@spartacus/core';
import { Permission } from '../../core/model/permission.model';
import { OccPermissionNormalizer } from './occ-permission-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('PermissionNormalizer', () => {
  let service: OccPermissionNormalizer;

  const permission: Occ.Permission = {
    code: 'testCode',
  };

  const targetPermission: Permission = {
    code: 'testCode',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccPermissionNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccPermissionNormalizer);
  });

  it('should inject OccPermissionNormalizer', inject(
    [OccPermissionNormalizer],
    (permissionNormalizer: OccPermissionNormalizer) => {
      expect(permissionNormalizer).toBeTruthy();
    }
  ));

  it('should convert permission', () => {
    const result = service.convert(permission);
    expect(result).toEqual(targetPermission);
  });

  it('should convert permissionn with applied target', () => {
    const result = service.convert(permission, {});
    expect(result).toEqual({});
  });
});
