import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { B2BUnit } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUnitAddressService } from './current-unit-address.service';
import { OrgUnitService } from '../../../../core/services/org-unit.service';

export class MockOrgUnitService implements Partial<OrgUnitService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentUnitService', () => {
  let service: CurrentUnitAddressService;
  let unitAddressService: OrgUnitService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentUnitAddressService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    unitAddressService = TestBed.inject(OrgUnitService);
    service = TestBed.inject(CurrentUnitAddressService);
  });

  afterEach(() => {
    mockParams.complete();
  });

  describe('id$', () => {
    it('should return undefined when route param `id` is undefined', async () => {
      const results = [];
      service.id$.pipe(take(2)).subscribe((value) => results.push(value));
      mockParams.next({ id: 'id1' });
      mockParams.next({ id: 'id2' });
      expect(results).toEqual(['id1', 'id2']);
    });

    it('should expose route param `id` from activated route', () => {
      const results = [];
      service.id$.subscribe((value) => results.push(value));
      mockParams.next({ id: 'id1' });
      mockParams.next({ id: 'id2' });
      expect(results).toEqual(['id1', 'id2']);
    });

    it('should not emit when param `id` did not change', () => {
      const results = [];
      service.id$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', id: 'id' });
      mockParams.next({ name: 'name2', id: 'id' });
      expect(results).toEqual(['id']);
    });
  });

  describe('model$', () => {
    it('should expose model for the current routing param `id`', () => {
      const mockUnit: B2BUnit = { name: 'test unitAddress' };
      spyOn(unitAddressService, 'get').and.returnValue(of(mockUnit));

      let result;
      service.unitAddress$.subscribe((value) => (result = value));
      mockParams.next({ id: '123' });
      expect(unitAddressService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockUnit);
    });

    it('should emit null when no current param `id`', () => {
      spyOn(unitAddressService, 'get');

      let result;
      service.unitAddress$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(unitAddressService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
