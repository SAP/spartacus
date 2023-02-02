import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { B2BUserService } from '../services';
import { AdminGuard } from './admin.guard';
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

class MockB2BUserService implements Partial<B2BUserService> {
  isUpdatingUserAllowed = createSpy('isUpdatingUserAllowed');
}

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let b2bUserService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        AdminGuard,
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
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
      ],
    });
    guard = TestBed.inject(AdminGuard);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    b2bUserService = TestBed.inject(B2BUserService);
  });

  describe('canActivate()', () => {
    it('should return true when admin role found', () => {
      let result: boolean | undefined;
      mockUserDetails.roles = [B2BUserRole.APPROVER, B2BUserRole.ADMIN];

      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return false when admin role not found', () => {
      let result: boolean | undefined;
      mockUserDetails.roles = [B2BUserRole.APPROVER];

      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should make redirect and show global message if sufficient roles', () => {
      let result: boolean | undefined;
      mockUserDetails.roles = [];

      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'organization',
      });

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.noSufficientPermissions' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      expect(result).toEqual(false);
    });
  });

  describe('canMatch()', () => {
    it('should return true if updating user is allowed', () => {
      b2bUserService.isUpdatingUserAllowed = createSpy().and.returnValue(true);
      expect(guard.canMatch()).toEqual(true);
    });

    it('should return false updating user is not allowed', () => {
      b2bUserService.isUpdatingUserAllowed = createSpy().and.returnValue(false);
      let result = guard.canMatch();
      expect(result).toEqual(false);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'organization',
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });
  });
});
