import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { EntitiesModel, B2BAddress } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { UnitAddressListService } from '@spartacus/my-account/organization/components';

const mockUnitAddressListEntities: EntitiesModel<B2BAddress> = {
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

class MockOrgUnitService implements Partial<OrgUnitService> {
  getAddresses(): Observable<EntitiesModel<B2BAddress>> {
    return of(mockUnitAddressListEntities);
  }
}

@Injectable()
export class MockTableService {
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
          useClass: MockOrgUnitService,
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

  it('should get b2b address list', () => {
    let result: Table<B2BAddress>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });
});
