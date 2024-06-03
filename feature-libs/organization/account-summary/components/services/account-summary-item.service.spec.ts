import { TestBed } from '@angular/core/testing';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  CurrentUnitService,
  UnitFormService,
} from '@spartacus/organization/administration/components';
import { of } from 'rxjs';
import { AccountSummaryItemService } from './account-summary-item.service';

const mockCode = 'u1';
class MockCurrentUnitService implements Partial<CurrentUnitService> {
  key$ = of(mockCode);
  error$ = of(false);
}

class MockUnitFormService {}
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

const testB2BUnit: B2BUnit = {
  uid: 'unitUid',
};

describe('AccountSummaryItemService', () => {
  let service: AccountSummaryItemService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountSummaryItemService,
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
      ],
    });
    service = TestBed.inject(AccountSummaryItemService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should launch account summary detail route with unit uid', () => {
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails(testB2BUnit);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgAccountSummaryDetails',
      params: { uid: 'unitUid' },
    });
  });
});
