import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { of, Subject } from 'rxjs';
import { CurrentUnitChildService } from './current-unit-child.service';

const mockParams = new Subject();

class MockRoutingService {
  getParams() {
    return mockParams;
  }

  getRouterState() {
    return of();
  }
}

class MockOrgUnitService {
  get() {
    return of();
  }
}

describe('CurrentUnitChildService', () => {
  let service: CurrentUnitChildService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentUnitChildService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    service = TestBed.inject(CurrentUnitChildService);
    unitService = TestBed.inject(OrgUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('model$', () => {
    it('should not load unit for child units', () => {
      spyOn(unitService, 'get').and.callThrough();
      service.item$.subscribe();
      mockParams.next({ [ROUTE_PARAMS.unitCode]: '123' });
      expect(unitService.get).not.toHaveBeenCalled();
    });
  });
});
