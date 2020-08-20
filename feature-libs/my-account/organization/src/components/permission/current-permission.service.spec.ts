import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CostCenter } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentPermissionService } from './current-permission.service';
import { PermissionService } from '../../core/services/permission.service';

export class MockCostCenterService implements Partial<PermissionService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentPermissionService', () => {
  let service: CurrentPermissionService;
  let costCenterService: PermissionService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentPermissionService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: PermissionService, useClass: MockCostCenterService },
      ],
    });

    costCenterService = TestBed.inject(PermissionService);
    service = TestBed.inject(CurrentPermissionService);
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
      service.permission$.subscribe((value) => (result = value));
      mockParams.next({ code: '123' });
      expect(costCenterService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockCostCenter);
    });

    it('should emit null when no current param `code`', () => {
      spyOn(costCenterService, 'get');

      let result;
      service.permission$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(costCenterService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
