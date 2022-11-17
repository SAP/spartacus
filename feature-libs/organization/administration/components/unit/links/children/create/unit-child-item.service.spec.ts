import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  Budget,
  LoadStatus,
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitChildItemService } from './unit-child-item.service';
import { CurrentUnitChildService } from './current-unit-child.service';
import createSpy = jasmine.createSpy;

const mockCode = 'u1';
class MockRoutingService {
  go() {}
}
const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });
class MockOrgUnitService {
  get() {
    return of();
  }
  loadBudget() {}
  update() {}
  create() {}
  getLoadingStatus(): Observable<OrganizationItemStatus<Budget>> {
    return mockItemStatus;
  }
}

class MockUnitFormService {}
class MockCurrentUnitChildService {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
}
describe('UnitChildItemService', () => {
  let service: UnitChildItemService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitChildItemService,
        {
          provide: CurrentUnitChildService,
          useClass: MockCurrentUnitChildService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    service = TestBed.inject(UnitChildItemService);
    unitService = TestBed.inject(OrgUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create item with parentUnitUid', () => {
    spyOn(unitService, 'create').and.callThrough();
    const form = new FormGroup({});
    form.setControl('name', new FormControl('Child Unit Name'));
    form.setControl(
      'parentOrgUnit',
      new FormGroup({
        uid: new FormControl('child-unit-uid'),
      })
    );
    form.get('parentOrgUnit').disable();

    expect(service.save(form)).toEqual(mockItemStatus);
    expect(unitService.create).toHaveBeenCalledWith({
      name: 'Child Unit Name',
      parentOrgUnit: { uid: 'child-unit-uid' },
    });
  });

  it('should launch orgUnitChildren with parentUnitUid uid', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails({
      uid: 'child-uid',
      name: 'foo bar',
      parentOrgUnit: { uid: 'parentUnitUid' },
    });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitChildren',
      params: { uid: 'parentUnitUid' },
    });
  });
});
