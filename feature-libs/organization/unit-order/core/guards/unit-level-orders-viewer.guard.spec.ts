import { TestBed } from '@angular/core/testing';
import {
  B2BUserRole,
  B2BUserRight,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { UnitLevelOrdersViewerGuard } from './unit-level-orders-viewer.guard';
import createSpy = jasmine.createSpy;

const mockUserDetails: User = {
  firstName: 'test',
  lastName: 'testLast',
  roles: [],
};

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = createSpy('get').and.returnValue(of(mockUserDetails));
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy('go');
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

describe('UnitLevelOrdersViewerGuard', () => {
  let guard: UnitLevelOrdersViewerGuard;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitLevelOrdersViewerGuard,
        {
          provide: UserAccountFacade,
          useClass: MockUserAccountFacade,
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
    guard = TestBed.inject(UnitLevelOrdersViewerGuard);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should return true when unitlevelordersviewer role found', () => {
    let result: boolean | undefined;
    mockUserDetails.roles = [
      B2BUserRole.APPROVER,
      B2BUserRight.UNITORDERVIEWER,
    ];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return false when unitlevelordersviewer role not found', () => {
    let result: boolean | undefined;
    mockUserDetails.roles = [B2BUserRole.APPROVER];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should make redirect and show global message if insufficient roles', () => {
    let result: boolean | undefined;
    mockUserDetails.roles = [];

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'organization.notification.noSufficientPermissions' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    expect(result).toEqual(false);
  });
});
