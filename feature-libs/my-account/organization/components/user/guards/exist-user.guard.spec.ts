import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ExistUserGuard } from './exist-user.guard';
import createSpy = jasmine.createSpy;

const USER_VALID = Object.freeze({ customerId: 'userCustomerId' });
const USER_INVALID = Object.freeze({});

class B2BUserServiceStub {
  get(): Observable<B2BUser> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'users';
  }
  transform(): string[] {
    return ['organization', 'users'];
  }
}

const mockRouter = { parseUrl: () => {} };

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

describe('ExistUserGuard', () => {
  let existUserGuard: ExistUserGuard;
  let router: Router;
  let userService: B2BUserService;
  let route: ActivatedRoute;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: B2BUserService,
          useClass: B2BUserServiceStub,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },

        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'userCustomerId' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
      imports: [RouterTestingModule],
    });

    existUserGuard = TestBed.inject(ExistUserGuard);
    router = TestBed.inject(Router);
    userService = TestBed.inject(B2BUserService);
    route = TestBed.inject(ActivatedRoute);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when user is loaded', () => {
      beforeEach(() => {
        spyOn(userService, 'get').and.returnValue(of(USER_VALID));
      });

      it('then router should not redirect', () => {
        existUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(router.parseUrl).not.toHaveBeenCalled();
      });

      it('then returned observable should emit true', () => {
        let emittedValue;

        existUserGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(true);
      });
    });

    describe('when user is not loaded', () => {
      beforeEach(() => {
        spyOn(userService, 'get').and.returnValue(of(USER_INVALID));
      });

      it('then router should redirect to user list page', () => {
        existUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(router.parseUrl).toHaveBeenCalledWith('users');
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'organization.notification.notExist',
            params: { item: 'User' },
          },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      });
    });
  });
});
