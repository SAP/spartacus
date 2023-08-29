import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitUserItemService } from './unit-user-item.service';

class MockRoutingService {
  go() {}
  getParams() {
    return EMPTY;
  }
}

const mockItemStatus = { status: LoadStatus.SUCCESS, item: {} };

class MockB2bUserService {
  get() {
    return EMPTY;
  }
  loadBudget() {}
  update() {}
  create() {}
  getLoadingStatus(): Observable<OrganizationItemStatus<B2BUser>> {
    return of(mockItemStatus);
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

  it('should create item with unitUid', fakeAsync(() => {
    spyOn(userService, 'create').and.callThrough();
    const form = new UntypedFormGroup({});
    form.setControl('name', new UntypedFormControl('User name'));
    form.setControl(
      'orgUnit',
      new UntypedFormGroup({
        uid: new UntypedFormControl('unit-uid'),
      })
    );
    form.get('orgUnit')?.disable();

    service
      .save(form)
      .pipe(take(1))
      .subscribe((val) => {
        expect(val).toEqual(mockItemStatus);
        flush();
      });

    expect(userService.create).toHaveBeenCalledWith({
      name: 'User name',
      orgUnit: { uid: 'unit-uid' },
    });
  }));

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
