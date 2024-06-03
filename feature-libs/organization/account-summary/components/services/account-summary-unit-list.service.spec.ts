import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  UnitItemService,
  UnitTreeService,
} from '@spartacus/organization/administration/components';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountSummaryUnitListService } from './account-summary-unit-list.service';
import * as _augmented from '../model/augmented.model';

import createSpy = jasmine.createSpy;

const treeToggle$ = new BehaviorSubject({});
class MockUnitTreeService {
  treeToggle$ = treeToggle$.asObservable();
  initialize = createSpy('initialize');
  isExpanded = createSpy('isExpanded').and.returnValue(false);
}

class MockUnitService {
  getTree(): Observable<B2BUnitNode> {
    return of({});
  }
}
@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('AccountSummaryUnitListService', () => {
  let service: AccountSummaryUnitListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        AccountSummaryUnitListService,
        {
          provide: UnitTreeService,
          useClass: MockUnitTreeService,
        },
        {
          provide: OrgUnitService,
          useClass: MockUnitService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
        {
          provide: UnitItemService,
          useValue: {
            key$: of({}),
          },
        },
      ],
    });
    service = TestBed.inject(AccountSummaryUnitListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
