import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { EMPTY } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';

class MockRoutingService {
  getParams() {
    return EMPTY;
  }

  getRouterState() {
    return EMPTY;
  }
}

class MockCostCenterService implements Partial<CostCenterService> {
  get() {
    return EMPTY;
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
