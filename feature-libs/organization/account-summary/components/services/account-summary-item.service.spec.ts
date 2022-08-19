import { TestBed } from '@angular/core/testing';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { CurrentUnitService, UnitFormService } from '@spartacus/organization/administration/components';
import { AccountSummaryItemService } from './account-summary-item.service';


class MockCurrentUnitService implements Partial<CurrentUnitService> { }

class MockUnitFormService { }
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

const testB2BUnit: B2BUnit = {
  active: true,
  addresses: [],
  uid: 'unitUid',
  name: "foo bar"
};

describe('AccountSummaryItemService', () => {
  let service: AccountSummaryItemService;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should launch account summary detail route with unit uid', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails(
      testB2BUnit
    );
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgAccountSummaryDetails',
      params: { uid: 'unitUid' },
    });
  });

});


