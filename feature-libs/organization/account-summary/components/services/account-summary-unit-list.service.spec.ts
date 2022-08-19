import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { B2BUnit, RoutingService, UserIdService } from '@spartacus/core';
import { CurrentItemService, CurrentUnitService } from '@spartacus/organization/administration/components';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountSummaryUnitListService } from './account-summary-unit-list.service';


let takeUserId$: BehaviorSubject<string | never>;
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => takeUserId$.asObservable();
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

class MockCurrentItemService implements Partial<CurrentUnitService> {
  item$: Observable<B2BUnit> = of({ name: 'testName' });
}

const routingServiceSpy = jasmine.createSpyObj('RoutingService', ['go']);

describe('AccountSummaryUnitListService', () => {
  let service: AccountSummaryUnitListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [
        AccountSummaryUnitListService,
        OrgUnitService,
        { provide: RoutingService, useValue: routingServiceSpy },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: TableService,
          useClass: MockTableService,
        },
        {
          provide: CurrentItemService, useClass: MockCurrentItemService
        }
      ],
    });
    service = TestBed.inject(AccountSummaryUnitListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
