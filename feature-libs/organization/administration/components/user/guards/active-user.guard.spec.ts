import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { ActiveUserGuard } from './active-user.guard';
import createSpy = jasmine.createSpy;

const USER_NOT_ACTIVE = Object.freeze({ active: false });
const USER_ACTIVE = Object.freeze({ active: true });

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

describe('ActiveUserGuard', () => {
  let activeUserGuard: ActiveUserGuard;
  let router: Router;
  let userService: B2BUserService;
  let route: ActivatedRoute;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: B2BUserService,
          useClass: B2BUserServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'userCode' } } },
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

    activeUserGuard = TestBed.inject(ActiveUserGuard);
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
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(userService, 'get').and.returnValue(of(USER_NOT_ACTIVE));
        });

        it('then router should redirect to users page', () => {
          activeUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(router.parseUrl).toHaveBeenCalledWith('organization/users');
          expect(globalMessageService.add).toHaveBeenCalledWith(
            {
              key: 'organization.notification.disabled',
              params: { item: 'User' },
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        });
      });
    });

    describe('when user is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(userService, 'get').and.returnValue(of(USER_ACTIVE));
        });

        it('then router should not redirect', () => {
          activeUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(router.parseUrl).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          activeUserGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });
      });
    });
  });
});
