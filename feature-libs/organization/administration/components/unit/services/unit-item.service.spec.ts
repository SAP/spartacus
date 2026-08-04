import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  LoadStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { EMPTY, of } from 'rxjs';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from './current-unit.service';
import { UnitItemService } from './unit-item.service';

const mockCode = 'u1';
class MockRoutingService {
  go() {}
}

const form = new UntypedFormGroup({});
form.addControl('name', new UntypedFormControl('foo bar'));
form.addControl('uid', new UntypedFormControl('unitUid'));

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockUnitService {
  get() {
    return EMPTY;
  }
  load() {}
  update() {}
  create() {}
  getLoadingStatus() {
    return mockItemStatus;
  }
}

class MockUnitFormService {}

class MockCurrentUnitService {
  key$ = of(mockCode);
  load = vi.fn('load').mockReturnValue(EMPTY);
  error$ = of(false);
}

describe('UnitItemService', () => {
  let service: UnitItemService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitItemService,
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
        { provide: OrgUnitService, useClass: MockUnitService },
      ],
    });

    service = TestBed.inject(UnitItemService);
    unitService = TestBed.inject(OrgUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load unit', () => {
    vi.spyOn(unitService, 'get');
    service.load('123').subscribe();
    expect(unitService.get).toHaveBeenCalledWith('123');
  });

  it('should get unit from facade', () => {
    vi.spyOn(unitService, 'get');
    service.load('123').subscribe();
    expect(unitService.get).toHaveBeenCalledWith('123');
  });

  it('should load unit on each request', () => {
    vi.spyOn(unitService, 'load');
    service.load('123').subscribe();
    expect(unitService.load).toHaveBeenCalledWith('123');
  });

  it('should update existing unit', () => {
    vi.spyOn(unitService, 'update');
    vi.spyOn(unitService, 'getLoadingStatus');

    expect(service.save(form, 'existingCode')).toEqual(mockItemStatus);
    expect(unitService.update).toHaveBeenCalledWith('existingCode', {
      name: 'foo bar',
      uid: 'unitUid',
    });
    expect(unitService.getLoadingStatus).toHaveBeenCalledWith('unitUid');
  });

  it('should create new unit', () => {
    vi.spyOn(unitService, 'create');
    vi.spyOn(unitService, 'getLoadingStatus');

    expect(service.save(form)).toEqual(mockItemStatus);
    expect(unitService.create).toHaveBeenCalledWith({
      name: 'foo bar',
      uid: 'unitUid',
    });
    expect(unitService.getLoadingStatus).toHaveBeenCalledWith('unitUid');
  });

  it('should launch unit detail route', () => {
    const routingService = TestBed.inject(RoutingService);
    vi.spyOn(routingService, 'go');
    service.launchDetails({ name: 'foo bar' });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitDetails',
      params: { name: 'foo bar' },
    });
  });
});
