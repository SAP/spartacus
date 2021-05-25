import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Address, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitAddressListService } from './unit-address-list.service';

const mockUnitAddressEntities: EntitiesModel<Address> = {
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
  getAddresses(): Observable<EntitiesModel<Address>> {
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
    let result: EntitiesModel<Address>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].id).toEqual('first');
    expect(result.values[1].id).toEqual('second');
    expect(result.values[2].id).toEqual('third');
  });
});
