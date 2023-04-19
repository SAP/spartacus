import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { PermissionService } from '@spartacus/organization/administration/core';
import { EMPTY } from 'rxjs';
import { CurrentPermissionService } from '..';

class MockRoutingService {
  getParams() {
    return EMPTY;
  }

  getRouterState() {
    return EMPTY;
  }
}

class MockPermissionService implements Partial<PermissionService> {
  get() {
    return EMPTY;
  }
}

describe('CurrentPermissionService', () => {
  let service: CurrentPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentPermissionService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    });

    service = TestBed.inject(CurrentPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
