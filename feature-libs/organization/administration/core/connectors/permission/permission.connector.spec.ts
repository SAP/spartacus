import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SearchConfig, OrderApprovalPermissionType } from '@spartacus/core';
import { of } from 'rxjs';
import { PermissionAdapter } from './permission.adapter';
import { PermissionConnector } from './permission.connector';

const userId = 'userId';
const permissionCode = 'permissionCode';

const permission = {
  code: permissionCode,
};

const types: OrderApprovalPermissionType[] = [{ code: 'test', name: 'name' }];

class MockPermissionAdapter implements PermissionAdapter {
  load = vi.fn().mockReturnValue(of(permission));
  loadList = vi.fn().mockReturnValue(of([permission]));
  create = vi.fn().mockReturnValue(of(permission));
  update = vi.fn().mockReturnValue(of(permission));
  loadTypes = vi.fn().mockReturnValue(of(types));
}

describe('PermissionConnector', () => {
  let service: PermissionConnector;
  let adapter: PermissionAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PermissionConnector,
        { provide: PermissionAdapter, useClass: MockPermissionAdapter },
      ],
    });

    service = TestBed.inject(PermissionConnector);
    adapter = TestBed.inject(PermissionAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load permission', () => {
    service.get(userId, permissionCode);
    expect(adapter.load).toHaveBeenCalledWith(userId, permissionCode);
  });

  it('should load permissions', () => {
    const params: SearchConfig = { sort: 'code' };
    service.getList(userId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, params);
  });

  it('should create permission', () => {
    service.create(userId, permission);
    expect(adapter.create).toHaveBeenCalledWith(userId, permission);
  });

  it('should update permission', () => {
    service.update(userId, permissionCode, permission);
    expect(adapter.update).toHaveBeenCalledWith(
      userId,
      permissionCode,
      permission
    );
  });

  it('should get permission types', () => {
    service.getTypes();
    expect(adapter.loadTypes).toHaveBeenCalledWith();
  });
});
