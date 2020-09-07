import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SemanticPathService } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ExistUserGroupGuard } from './exist-user-group.guard';

const USER_GROUP_VALID = Object.freeze({ uid: 'userGroupUid' });
const USER_GROUP_INVALID = Object.freeze({});

class UserGroupServiceStub {
  get(): Observable<UserGroup> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'user-groups';
  }
  transform(): string[] {
    return ['organization', 'user-groups'];
  }
}

const mockRouter = { parseUrl: () => {} };

describe('ExistUserGroupGuard', () => {
  let existUserGroupGuard: ExistUserGroupGuard;
  let router: Router;
  let userGroupService: UserGroupService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserGroupService,
          useClass: UserGroupServiceStub,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },

        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'userGroupUid' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    existUserGroupGuard = TestBed.inject(ExistUserGroupGuard);
    router = TestBed.inject(Router);
    userGroupService = TestBed.inject(UserGroupService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when userGroup is loaded', () => {
      beforeEach(() => {
        spyOn(userGroupService, 'get').and.returnValue(of(USER_GROUP_VALID));
      });

      it('then router should not redirect', () => {
        existUserGroupGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(router.parseUrl).not.toHaveBeenCalled();
      });

      it('then returned observable should emit true', () => {
        let emittedValue;

        existUserGroupGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(true);
      });
    });

    describe('when userGroup is not loaded', () => {
      beforeEach(() => {
        spyOn(userGroupService, 'get').and.returnValue(of(USER_GROUP_INVALID));
      });

      it('then router should redirect to userGroup list page', () => {
        existUserGroupGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(router.parseUrl).toHaveBeenCalledWith('user-groups');
      });
    });
  });
});
