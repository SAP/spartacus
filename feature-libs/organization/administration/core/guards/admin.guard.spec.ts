import { TestBed } from '@angular/core/testing';
import {
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { AdminGuard } from './admin.guard';
import createSpy = jasmine.createSpy;

const mockUserDetails: User = {
  firstName: 'test',
  lastName: 'testLast',
  roles: [],
};

class MockUserService implements Partial<MockUserService> {
  get = createSpy('get').and.returnValue(of(mockUserDetails));
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy('go');
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    guard = TestBed.inject(AdminGuard);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should return true when admin role found', () => {
    let result: boolean;
    mockUserDetails.roles = [B2BUserRole.APPROVER, B2BUserRole.ADMIN];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return false when admin role not found', () => {
    let result: boolean;
    mockUserDetails.roles = [B2BUserRole.APPROVER];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should make redirect and show global message if sufficient roles', () => {
    let result: boolean;
    mockUserDetails.roles = [];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'organization' });

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'organization.notification.noSufficientPermissions' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    expect(result).toEqual(false);
  });
});
