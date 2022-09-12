import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@commerce-storefront-toolset/core';
import { CostCenterService } from '@commerce-storefront-toolset/organization/administration/core';
import { of } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';

class MockRoutingService {
  getParams() {
    return of();
  }

  getRouterState() {
    return of();
  }
}

class MockCostCenterService implements Partial<CostCenterService> {
  get() {
    return of();
  }
}

describe('CurrentCostCenterService', () => {
  let service: CurrentCostCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentCostCenterService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    });

    service = TestBed.inject(CurrentCostCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
