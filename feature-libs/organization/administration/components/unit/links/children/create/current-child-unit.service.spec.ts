import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { ROUTE_PARAMS } from 'feature-libs/organization/administration/components/constants';
import { of, Subject } from 'rxjs';
import { CurrentChildUnitService } from './current-child-unit.service';

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

describe('CurrentChildUnitService', () => {
  let service: CurrentChildUnitService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentChildUnitService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    service = TestBed.inject(CurrentChildUnitService);
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
