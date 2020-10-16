import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { of } from 'rxjs';
import { UnitFormService } from '../form/unit-form.service';
import { UnitItemService } from './unit-item.service';
import { CurrentUnitService } from './current-unit.service';

class MockRoutingService {
  go() {}
}

class MockUnitService {
  get() {
    return of();
  }
  load() {}
  update() {}
  create() {}
  getLoadingStatus() {}
}

class MockUnitFormService {}
class MockCurrentUnitService {}

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
    spyOn(unitService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(unitService.get).toHaveBeenCalledWith('123');
  });

  it('should get unit from facade', () => {
    spyOn(unitService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(unitService.get).toHaveBeenCalledWith('123');
  });

  it('should load unit on each request', () => {
    spyOn(unitService, 'load').and.callThrough();
    service.load('123').subscribe();
    expect(unitService.load).toHaveBeenCalledWith('123');
  });

  it('should update existing unit', () => {
    spyOn(unitService, 'update').and.callThrough();
    const form = new FormGroup({});
    form.addControl('name', new FormControl('foo bar'));
    service.save(form, 'existingCode');
    expect(unitService.update).toHaveBeenCalledWith('existingCode', {
      name: 'foo bar',
    });
  });

  it('should create new unit', () => {
    spyOn(unitService, 'create').and.callThrough();
    const form = new FormGroup({});
    form.addControl('name', new FormControl('foo bar'));
    service.save(form);
    expect(unitService.create).toHaveBeenCalledWith({
      name: 'foo bar',
    });
  });

  it('should launch unit detail route', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails({ name: 'foo bar' });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'unitDetails',
      params: { name: 'foo bar' },
    });
  });
});
