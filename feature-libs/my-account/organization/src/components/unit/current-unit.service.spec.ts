import { TestBed } from '@angular/core/testing';
import { OrgUnitService, RoutingService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { CurrentUnitService } from './current-unit.service';

const mockParams = new Subject();

class MockRoutingService {
  getParams() {
    return mockParams;
  }

  getRouterState() {
    return of();
  }
}

class MockUnitService {
  get() {
    return of();
  }
}

describe('CurrentUnitService', () => {
  let service: CurrentUnitService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentUnitService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockUnitService },
      ],
    });

    service = TestBed.inject(CurrentUnitService);
    unitService = TestBed.inject(OrgUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('model$', () => {
    it('should load budget', () => {
      spyOn(unitService, 'get').and.callThrough();
      service.model$.subscribe();
      mockParams.next({ [ROUTE_PARAMS.unitCode]: '123' });
      expect(unitService.get).toHaveBeenCalledWith('123');
    });

    it('should not load budget', () => {
      spyOn(unitService, 'get').and.callThrough();
      service.model$.subscribe();
      mockParams.next({ foo: 'bar' });
      expect(unitService.get).not.toHaveBeenCalled();
    });
  });
});
