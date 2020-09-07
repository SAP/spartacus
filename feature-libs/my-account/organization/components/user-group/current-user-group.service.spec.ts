import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { CurrentUserGroupService } from '.';
import { UserGroupService } from '@spartacus/my-account/organization/core';

class MockRoutingService {
  getParams() {
    return of();
  }

  getRouterState() {
    return of();
  }
}

class MockUserGroupService implements Partial<UserGroupService> {
  get() {
    return of();
  }
}

describe('CurrentPermissionService', () => {
  let service: CurrentUserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentUserGroupService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserGroupService, useClass: MockUserGroupService },
      ],
    });

    service = TestBed.inject(CurrentUserGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
