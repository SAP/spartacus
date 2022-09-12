import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@commerce-storefront-toolset/core';
import {
  OrgUnitService,
  PermissionService,
} from '@commerce-storefront-toolset/organization/administration/core';
import { of } from 'rxjs';
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
