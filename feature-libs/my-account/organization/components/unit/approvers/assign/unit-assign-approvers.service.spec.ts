import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { EntitiesModel, B2BUser } from '@spartacus/core';
import { Injectable } from '@angular/core';
import createSpy = jasmine.createSpy;
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { UnitAssignApproversService } from '@spartacus/my-account/organization/components';

const orgId = 'testOrg1';
const customerId = 'customer1';
const roleId = 'role1';

const mockUnitUsersEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      active: true,
      selected: true,
    },
    {
      active: true,
      selected: true,
    },
    {
      active: false,
      selected: false,
    },
  ],
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  assignApprover = createSpy('assignApprover');
  unassignApprover = createSpy('unassignApprover');

  getUsers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUnitUsersEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitAssignApproversService', () => {
  let service: UnitAssignApproversService;
  let orgUnitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitAssignApproversService,
        {
          provide: OrgUnitService,
          useClass: MockOrgUnitService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitAssignApproversService);
    orgUnitService = TestBed.inject(OrgUnitService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should get b2b user list', () => {
    let result: Table<B2BUser>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });

  it('should assign user', () => {
    service.toggleAssign(orgId, customerId, roleId, true);
    expect(orgUnitService.assignApprover).toHaveBeenCalledWith(
      orgId,
      customerId,
      roleId
    );
  });

  it('should unassign user', () => {
    service.toggleAssign(orgId, customerId, roleId, false);
    expect(orgUnitService.unassignApprover).toHaveBeenCalledWith(
      orgId,
      customerId,
      roleId
    );
  });
});
