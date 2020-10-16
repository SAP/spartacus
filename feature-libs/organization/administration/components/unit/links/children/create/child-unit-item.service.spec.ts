import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  Budget,
  LoadStatus,
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { UnitFormService } from '../../../form/unit-form.service';
import { ChildUnitItemService } from './child-unit-item.service';
import { CurrentChildUnitService } from './current-child-unit.service';

class MockRoutingService {
  go() {}
}

class MockOrgUnitService {
  get() {
    return of();
  }
  loadBudget() {}
  update() {}
  create() {}
  getLoadingStatus(): Observable<OrganizationItemStatus<Budget>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
  }
}

class MockUnitFormService {}
class MockCurrentChildUnitService {}

describe('ChildUnitItemService', () => {
  let service: ChildUnitItemService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChildUnitItemService,
        {
          provide: CurrentChildUnitService,
          useClass: MockCurrentChildUnitService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    service = TestBed.inject(ChildUnitItemService);
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
    service.save(form);

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
