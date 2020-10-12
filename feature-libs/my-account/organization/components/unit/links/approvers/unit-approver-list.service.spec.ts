import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, B2BUserGroup, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
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

class MockUnitApproverListService {
  getUsers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockCostCenterEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitApproverListService', () => {
  let service: UnitApproverListService;
  let unitService: OrgUnitService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitApproverListService,
        {
          provide: OrgUnitService,
          useClass: MockUnitApproverListService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitApproverListService);
    unitService = TestBed.inject(OrgUnitService);
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
      B2BUserGroup.B2B_APPROVER_GROUP,
      {
        pageSize: 10,
      }
    );
  });
});
