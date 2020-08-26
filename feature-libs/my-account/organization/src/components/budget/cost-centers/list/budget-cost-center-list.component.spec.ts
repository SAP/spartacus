import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { Budget } from '../../../../core/model/budget.model';
import { CurrentBudgetService } from '../../services/current-budget.service';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

const costCenterCode = 'costCenterCode';

class MockCurrentBudgetService implements Partial<CurrentBudgetService> {
  key$ = of(costCenterCode);
}

const mockBudgetList: Table<Budget> = {
  data: [
    {
      code: '1',
      name: 'b1',
      budget: 2230,
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2010-01-01T00:00:00+0000',
      endDate: '2034-07-12T00:59:59+0000',
      orgUnit: { uid: 'orgUid', name: 'orgName' },
    },
    {
      code: '2',
      name: 'b2',
      budget: 2240,
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2020-01-01T00:00:00+0000',
      endDate: '2024-07-12T00:59:59+0000',
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  structure: { type: '' },
};

export class MockBudgetCostCenterListService {
  getTable(_code) {
    return of(mockBudgetList);
  }
}

describe('BudgetCostCenterListComponent', () => {
  let component: BudgetCostCenterListComponent;
  let fixture: ComponentFixture<BudgetCostCenterListComponent>;
  let service: BudgetCostCenterListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        TableModule,
        IconTestingModule,
        SplitViewTestingModule,
      ],
      declarations: [BudgetCostCenterListComponent],
      providers: [
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
        {
          provide: BudgetCostCenterListService,
          useClass: MockBudgetCostCenterListService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(BudgetCostCenterListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCostCenterListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have budgets', () => {
    let result;
    component.dataTable$.subscribe((data) => (result = data));
    expect(result).toEqual(mockBudgetList);
  });

  it('should get budgets from service by code', () => {
    spyOn(service, 'getTable');
    fixture.detectChanges();
    expect(service.getTable).toHaveBeenCalled();
  });

  describe('with table data', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeFalsy();
    });
  });

  describe('without table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(null));
      fixture.detectChanges();
    });
    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });
  describe('code$', () => {
    it('should emit the current cost center code', () => {
      let result;
      component.code$.subscribe((r) => (result = r));
      expect(result).toBe(costCenterCode);
    });
  });
});
