import { TestBed } from '@angular/core/testing';
import { B2bIsAdminGuard } from './b2b-is-admin.guard';
import createSpy = jasmine.createSpy;
import { User, UserService } from '@spartacus/core';
import { UnitRoleType } from '@spartacus/my-account/organization';
import { of } from 'rxjs';

const mockUserDetails: User = {
  firstName: 'test',
  lastName: 'testLast',
  roles: [],
};

class MockUserService implements Partial<MockUserService> {
  get = createSpy('get').and.returnValue(of(mockUserDetails));
}

describe('B2bIsAdminGuard', () => {
  let guard: B2bIsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        B2bIsAdminGuard,
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    });
    guard = TestBed.inject(B2bIsAdminGuard);
  });

  it('should return true when admin role found', () => {
    let result: boolean;
    mockUserDetails.roles = [UnitRoleType.APPROVER, UnitRoleType.ADMIN];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return false when admin role not found', () => {
    let result: boolean;
    mockUserDetails.roles = [UnitRoleType.APPROVER];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should return false when no roles', () => {
    let result: boolean;
    delete mockUserDetails.roles;

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });
});
