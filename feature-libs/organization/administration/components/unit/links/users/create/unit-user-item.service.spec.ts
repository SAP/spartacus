import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  Budget,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitUserItemService } from './unit-user-item.service';

class MockRoutingService {
  go() {}
  getParams() {
    return of();
  }
}

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockB2bUserService {
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

describe('ChildUnitItemService', () => {
  let service: UnitUserItemService;
  let userService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitUserItemService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitFormService, useClass: MockUnitFormService },
        { provide: B2BUserService, useClass: MockB2bUserService },
      ],
    });

    service = TestBed.inject(UnitUserItemService);
    userService = TestBed.inject(B2BUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create item with unitUid', () => {
    spyOn(userService, 'create').and.callThrough();
    const form = new FormGroup({});
    form.setControl('name', new FormControl('User name'));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl('unit-uid'),
      })
    );
    form.get('orgUnit').disable();

    expect(service.save(form)).toEqual(mockItemStatus);
    expect(userService.create).toHaveBeenCalledWith({
      name: 'User name',
      orgUnit: { uid: 'unit-uid' },
    });
  });

  it('should launch orgUnitChildren with unitUid uid', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails({
      uid: 'uid',
      name: 'foo bar',
      orgUnit: { uid: 'unitUid' },
    });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitUserList',
      params: { uid: 'unitUid' },
    });
  });
});
