import { UserGroup, RoutingService, UserGroupService } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { UserGroupGuard } from './user-group.guard';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

const USER_GROUP_VALID = Object.freeze({ uid: 'userGroupCode' });
const USER_GROUP_INVALID = Object.freeze({});

class UserGroupServiceStub {
  get(): Observable<UserGroup> {
    return of();
  }
}

const mockRoutingService = { go: () => {} };

describe('UserGroupGuard', () => {
  let userGroupGuard: UserGroupGuard;
  let routingService: RoutingService;
  let userGroupService: UserGroupService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: UserGroupService,
          useClass: UserGroupServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'userGroupCode' } } },
        },
      ],
      imports: [RouterTestingModule],
    });

    userGroupGuard = TestBed.inject(UserGroupGuard);
    routingService = TestBed.inject(RoutingService);
    userGroupService = TestBed.inject(UserGroupService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when userGroup is loaded', () => {
      describe('and is valid', () => {
        beforeEach(() => {
          spyOn(userGroupService, 'get').and.returnValue(of(USER_GROUP_VALID));
        });

        it('then router should not redirect', () => {
          userGroupGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          userGroupGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });
      });
    });

    describe('when userGroup is not loaded', () => {
      beforeEach(() => {
        spyOn(userGroupService, 'get').and.returnValue(of(USER_GROUP_INVALID));
      });

      it('then router should redirect to userGroups page', () => {
        userGroupGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'userGroup',
        });
      });

      it('then returned observable should emit false', () => {
        let emittedValue;

        userGroupGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(false);
      });
    });
  });
});
