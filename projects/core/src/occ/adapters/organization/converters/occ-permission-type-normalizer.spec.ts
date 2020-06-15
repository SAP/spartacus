import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OrderApprovalPermissionType } from 'projects/core/src/model/permission.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
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

    service = TestBed.get(
      OccPermissionTypeNormalizer as Type<OccPermissionTypeNormalizer>
    );
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

  it('should convert permissionn typewith applied target', () => {
    const result = service.convert(permissionType, {});
    expect(result).toEqual({});
  });
});
