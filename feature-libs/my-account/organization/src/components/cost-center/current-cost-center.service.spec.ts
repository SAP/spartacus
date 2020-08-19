import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CostCenter } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentCostCenterService } from './current-cost-center.service';
import { CostCenterService } from '../../core/services/cost-center.service';

export class MockCostCenterService implements Partial<CostCenterService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentCostCenterService', () => {
  let service: CurrentCostCenterService;
  let costCenterService: CostCenterService;
  const mockParams: Subject<object> = new Subject();
  const mockQueryParams: Subject<object> = new Subject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentCostCenterService,
        {
          provide: ActivatedRoute,
          useValue: { params: mockParams, queryParams: mockQueryParams },
        },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    });

    costCenterService = TestBed.inject(CostCenterService);
    service = TestBed.inject(CurrentCostCenterService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('code$', () => {
    it('should return undefined when route param `code` is undefined', async () => {
      const results = [];
      service.code$.pipe(take(2)).subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should expose route param `code` from activated route', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should not emit when param `code` did not change', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', code: 'code' });
      mockParams.next({ name: 'name2', code: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('parentUnit$', () => {
    it('should emit parentUnit$ from query parameter', () => {
      let result;
      service.parentUnit$.subscribe((value) => (result = value));
      mockQueryParams.next({ parentUnit: 'ppp' });
      expect(result).toEqual('ppp');
    });

    it('should not emit parentUnit$ from query parameter', () => {
      let result;
      service.parentUnit$.subscribe((value) => (result = value));
      mockQueryParams.next({ foo: 'bar' });
      expect(result).toBeFalsy();
    });
  });

  describe('model$', () => {
    it('should expose model for the current routing param `code`', () => {
      const mockCostCenter: CostCenter = { name: 'test cost center' };
      spyOn(costCenterService, 'get').and.returnValue(of(mockCostCenter));

      let result;
      service.costCenter$.subscribe((value) => (result = value));
      mockParams.next({ code: '123' });
      expect(costCenterService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockCostCenter);
    });

    it('should emit null when no current param `code`', () => {
      spyOn(costCenterService, 'get');

      let result;
      service.costCenter$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(costCenterService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
