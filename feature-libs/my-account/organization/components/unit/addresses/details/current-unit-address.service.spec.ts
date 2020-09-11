import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { B2BAddress } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUnitService } from '../../current-unit.service';
import { CurrentUnitAddressService } from './current-unit-address.service';

const mockUnit: B2BAddress = { firstName: 'test unitAddress' };

export class MockOrgUnitService implements Partial<OrgUnitService> {
  getAddress() {
    return of(mockUnit);
  }
}
export class MockCurrentUnitService {
  key$ = of('code1');
  parentUnit$ = of('parentUnit1');
}

describe('CurrentUnitAddressService', () => {
  let service: CurrentUnitAddressService;
  let orgUnitService: OrgUnitService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentUnitAddressService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    });

    service = TestBed.inject(CurrentUnitAddressService);
    orgUnitService = TestBed.inject(OrgUnitService);
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

  describe('unitAddress$', () => {
    it('should expose model for the current routing param `id`', () => {
      spyOn(orgUnitService, 'getAddress').and.returnValue(of(mockUnit));

      let result;
      service.unitAddress$.subscribe((value) => (result = value));
      mockParams.next({ code: 'code1', id: '123' });
      expect(orgUnitService.getAddress).toHaveBeenCalledWith('code1', '123');
      expect(result).toBe(mockUnit);
    });

    it('should emit null when no current param `id`', () => {
      spyOn(orgUnitService, 'getAddress');

      let result;
      service.unitAddress$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(orgUnitService.getAddress).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
