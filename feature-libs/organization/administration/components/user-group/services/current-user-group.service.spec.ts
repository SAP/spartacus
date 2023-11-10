import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { UserGroupService } from '@spartacus/organization/administration/core';
import { EMPTY } from 'rxjs';
import { CurrentUserGroupService } from '..';

class MockRoutingService {
  getParams() {
    return EMPTY;
  }

  getRouterState() {
    return EMPTY;
  }
}

class MockUserGroupService implements Partial<UserGroupService> {
  get() {
    return EMPTY;
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
