import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { EntitiesModel, B2BUser } from '@spartacus/core';
import { Injectable } from '@angular/core';
import createSpy = jasmine.createSpy;
import {
  B2BUserService,
  OrgUnitService,
} from '@spartacus/my-account/organization/core';
import { UnitUserAssignRolesService } from '@spartacus/my-account/organization/components';

const customerId = 'customer1';
const mockRoles = ['r1', 'r2'];

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

class MockB2BUserService implements Partial<B2BUserService> {
  update = createSpy('update');
}

describe('UnitUserAssignRolesService', () => {
  let service: UnitUserAssignRolesService;
  let b2BUserService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitUserAssignRolesService,
        {
          provide: OrgUnitService,
          useClass: MockOrgUnitService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
      ],
    });
    service = TestBed.inject(UnitUserAssignRolesService);
    b2BUserService = TestBed.inject(B2BUserService);
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
    service.toggleAssign(customerId, mockRoles, 'r3', true);
    expect(b2BUserService.update).toHaveBeenCalledWith(customerId, {
      roles: [...mockRoles, 'r3'],
    });
  });

  it('should unassign user', () => {
    service.toggleAssign(customerId, mockRoles, mockRoles[0], false);
    expect(b2BUserService.update).toHaveBeenCalledWith(customerId, {
      roles: [mockRoles[1]],
    });
  });
});
