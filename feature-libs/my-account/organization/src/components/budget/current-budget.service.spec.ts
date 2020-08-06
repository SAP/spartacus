import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentBudgetService } from './current-budget.service';

export class MockCostCenterService implements Partial<CostCenterService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentCostCenterService', () => {
  let service: CurrentBudgetService;
  let costCenterService: CostCenterService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentBudgetService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    });

    costCenterService = TestBed.inject(CostCenterService);
    service = TestBed.inject(CurrentBudgetService);
  });

  afterEach(() => {
    mockParams.complete();
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
