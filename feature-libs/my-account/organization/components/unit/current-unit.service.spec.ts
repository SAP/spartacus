import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import {
  OrgUnitService,
  PermissionService,
} from '@spartacus/my-account/organization/core';
import { CurrentUnitService } from './current-unit.service';

class MockRoutingService {
  getParams() {
    return of();
  }

  getRouterState() {
    return of();
  }
}

class MockOrgUnitService implements Partial<PermissionService> {
  get() {
    return of();
  }
}

describe('CurrentUnitService', () => {
  let service: CurrentUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentUnitService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    service = TestBed.inject(CurrentUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
