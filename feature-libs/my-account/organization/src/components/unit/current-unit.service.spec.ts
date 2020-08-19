import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { B2BUnit } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUnitService } from './current-unit.service';
import { OrgUnitService } from '../../core/services/org-unit.service';

export class MockOrgUnitService implements Partial<OrgUnitService> {
  get() {
    return of(undefined);
  }
}

xdescribe('CurrentUnitService', () => {
  let service: CurrentUnitService;
  let unitService: OrgUnitService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentUnitService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    unitService = TestBed.inject(OrgUnitService);
    service = TestBed.inject(CurrentUnitService);
  });

  afterEach(() => {
    mockParams.complete();
  });

  xdescribe('code$', () => {
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

  xdescribe('model$', () => {
    it('should expose model for the current routing param `code`', () => {
      const mockUnit: B2BUnit = { name: 'test unit' };
      spyOn(unitService, 'get').and.returnValue(of(mockUnit));

      let result;
      service.unit$.subscribe((value) => (result = value));
      mockParams.next({ code: '123' });
      expect(unitService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockUnit);
    });

    it('should emit null when no current param `code`', () => {
      spyOn(unitService, 'get');

      let result;
      service.unit$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(unitService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
