import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, B2BUserRole, EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitApproverListService } from './unit-approver-list.service';

const mockCostCenterEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'first',
      selected: true,
    },
    {
      uid: 'second',
      selected: false,
    },
    {
      uid: 'third',
      selected: true,
    },
  ],
};

const unitId = 'unitId';
const approverId = 'approverId';

class MockOrgUnitService {
  getUsers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockCostCenterEntities);
  }
  assignApprover(): Observable<EntitiesModel<B2BUser>> {
    return of(mockCostCenterEntities);
  }
  unassignApprover(): Observable<EntitiesModel<B2BUser>> {
    return of(mockCostCenterEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

@Injectable()
class MockB2BUserService {
  getLoadingStatus(): Observable<OrganizationItemStatus<B2BUser>> {
    return mockItemStatus;
  }
}

describe('UnitApproverListService', () => {
  let service: UnitApproverListService;
  let unitService: OrgUnitService;
  let userService: B2BUserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitApproverListService,
        {
          provide: OrgUnitService,
          useClass: MockOrgUnitService,
        },
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitApproverListService);
    unitService = TestBed.inject(OrgUnitService);
    userService = TestBed.inject(B2BUserService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected approvers', () => {
    let result: EntitiesModel<B2BUser>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('second');
    expect(result.values[2].uid).toEqual('third');
  });

  it('should load users with "b2bapprovergroup" role', () => {
    spyOn(unitService, 'getUsers').and.returnValue(of());

    service.getData('u1').subscribe().unsubscribe();

    expect(unitService.getUsers).toHaveBeenCalledWith(
      'u1',
      B2BUserRole.APPROVER,
      {
        pageSize: 10,
      }
    );
  });

  it('should assign approver', () => {
    spyOn(unitService, 'assignApprover').and.callThrough();
    spyOn(userService, 'getLoadingStatus').and.callThrough();

    expect(service.assign(unitId, approverId)).toEqual(mockItemStatus);
    expect(unitService.assignApprover).toHaveBeenCalledWith(
      unitId,
      approverId,
      B2BUserRole.APPROVER
    );
    expect(userService.getLoadingStatus).toHaveBeenCalledWith(approverId);
  });

  it('should unassign approver', () => {
    spyOn(unitService, 'unassignApprover').and.callThrough();
    spyOn(userService, 'getLoadingStatus').and.callThrough();

    expect(service.unassign(unitId, approverId)).toEqual(mockItemStatus);
    expect(unitService.unassignApprover).toHaveBeenCalledWith(
      unitId,
      approverId,
      B2BUserRole.APPROVER
    );
    expect(userService.getLoadingStatus).toHaveBeenCalledWith(approverId);
  });
});
