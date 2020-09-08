import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { EntitiesModel, B2BUser } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { UnitUserListService } from './unit-users.service';

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

describe('UnitUserListService', () => {
  let service: UnitUserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitUserListService,
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
    service = TestBed.inject(UnitUserListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should get b2b user list', () => {
    let result: Table<B2BUser>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });
});
