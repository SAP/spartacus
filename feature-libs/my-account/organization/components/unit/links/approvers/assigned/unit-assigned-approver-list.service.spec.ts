import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, B2BUser, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
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

class MockUnitApproverService {
  getUsers(): Observable<EntitiesModel<B2BUnit>> {
    return of(mockUnitEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitAssignedApproverListService', () => {
  let service: UnitAssignedApproverListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitAssignedApproverListService,
        {
          provide: OrgUnitService,
          useClass: MockUnitApproverService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitAssignedApproverListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected approvers', () => {
    let result: Table<B2BUser>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(2);
    expect(result.data[0].uid).toEqual('first');
    expect(result.data[1].uid).toEqual('third');
  });
});
