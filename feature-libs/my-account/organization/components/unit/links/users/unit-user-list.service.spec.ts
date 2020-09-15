import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitUserListService } from './unit-user-list.service';

const mockUnitUserEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'first',
    },
    {
      uid: 'second',
    },
    {
      uid: 'third',
    },
  ],
};

class MockOrgUnitService {
  getUsers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUnitUserEntities);
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

  it('should load b2b users', () => {
    let result: Table<B2BUser>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].uid).toEqual('first');
    expect(result.data[1].uid).toEqual('second');
    expect(result.data[2].uid).toEqual('third');
  });
});
