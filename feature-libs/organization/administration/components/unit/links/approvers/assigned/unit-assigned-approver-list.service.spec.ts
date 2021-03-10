import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, B2BUser, EntitiesModel, B2BUserRole } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';

const mockUnitEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'first',
      selected: true,
    },
    {
      uid: 'second',
    },
    {
      uid: 'third',
      selected: true,
    },
  ],
};

class MockOrgUnitService {
  getUsers(): Observable<EntitiesModel<B2BUnit>> {
    return of(mockUnitEntities);
  }
  clearAssignedUsersList(): void {}
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

@Injectable()
class MockB2BUserService {
  getLoadingStatus(): Observable<OrganizationItemStatus<B2BUser>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
  }
}

describe('UnitAssignedApproverListService', () => {
  let service: UnitAssignedApproverListService;
  let unitService: OrgUnitService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitAssignedApproverListService,
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
    service = TestBed.inject(UnitAssignedApproverListService);
    unitService = TestBed.inject(OrgUnitService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected approvers', () => {
    let result: EntitiesModel<B2BUser>;
    service.getData().subscribe((table) => (result = table));

    expect(result.values.length).toEqual(2);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('third');
  });

  it('should clear approvers data before load', () => {
    spyOn(unitService, 'clearAssignedUsersList');
    spyOn(unitService, 'getUsers').and.returnValue(of());

    service.getData('u1').subscribe();
    expect(unitService.clearAssignedUsersList).toHaveBeenCalledWith(
      'u1',
      B2BUserRole.APPROVER,
      {
        pageSize: 10,
      }
    );
    expect(unitService.getUsers).toHaveBeenCalledWith(
      'u1',
      B2BUserRole.APPROVER,
      {
        pageSize: 10,
      }
    );
  });
});
