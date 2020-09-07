import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, B2BUserService, SemanticPathService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ActiveUserGuard } from './active-user.guard';

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

describe('ActiveUserGuard', () => {
  let activeUserGuard: ActiveUserGuard;
  let router: Router;
  let userService: B2BUserService;
  let route: ActivatedRoute;

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
      ],
      imports: [RouterTestingModule],
    });

    activeUserGuard = TestBed.inject(ActiveUserGuard);
    router = TestBed.inject(Router);
    userService = TestBed.inject(B2BUserService);
    route = TestBed.inject(ActivatedRoute);
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
