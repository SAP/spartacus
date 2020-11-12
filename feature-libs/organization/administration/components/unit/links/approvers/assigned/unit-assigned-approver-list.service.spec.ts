import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, B2BUser, EntitiesModel, B2BUserGroup } from '@spartacus/core';
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
  clearUsersData(): void {}
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
    spyOn(unitService, 'clearUsersData');

    let result: EntitiesModel<B2BUser>;
    service.getData('u1').subscribe((table) => (result = table));
    expect(unitService.clearUsersData).toHaveBeenCalledWith(
      'u1',
      B2BUserGroup.B2B_APPROVER_GROUP,
      {
        pageSize: 10,
      }
    );
    expect(result.values.length).toEqual(2);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('third');
  });
});
