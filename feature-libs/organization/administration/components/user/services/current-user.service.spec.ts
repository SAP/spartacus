import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { CurrentUserService } from './current-user.service';

class MockRoutingService {
  getParams() {
    return of();
  }

  getRouterState() {
    return of();
  }
}

class MockB2bUserService implements Partial<PermissionService> {
  get() {
    return of();
  }
}

describe('CurrentUserService', () => {
  let service: CurrentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentUserService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockB2bUserService },
      ],
    });

    service = TestBed.inject(CurrentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
