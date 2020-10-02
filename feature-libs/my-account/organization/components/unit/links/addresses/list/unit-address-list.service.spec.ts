import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BAddress, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitAddressListService } from './unit-address-list.service';

const mockUnitAddressEntities: EntitiesModel<B2BAddress> = {
  values: [
    {
      id: 'first',
    },
    {
      id: 'second',
    },
    {
      id: 'third',
    },
  ],
};

class MockUnitAddressListService {
  getAddresses(): Observable<EntitiesModel<B2BAddress>> {
    return of(mockUnitAddressEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitAddressListService', () => {
  let service: UnitAddressListService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitAddressListService,
        {
          provide: OrgUnitService,
          useClass: MockUnitAddressListService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitAddressListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load addresses', () => {
    let result: Table<B2BAddress>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].id).toEqual('first');
    expect(result.data[1].id).toEqual('second');
    expect(result.data[2].id).toEqual('third');
  });
});
