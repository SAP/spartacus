import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { BudgetListComponent } from './budget-list.component';
import { BudgetListService, BudgetModel } from './budget-list.service';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';

const mockBudgetList: Table<BudgetModel> = {
  data: [
    {
      code: 'c1',
      name: 'n1',
      currency: 'USD',
    },
    {
      code: 'c2',
      name: 'n2',
      currency: 'USD',
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  structure: { type: '' },
};

export class MockBudgetListService {
  getTable() {}
  sort() {}
  viewPage() {}
}

describe('BudgetListComponent', () => {
  let component: BudgetListComponent;
  let fixture: ComponentFixture<BudgetListComponent>;
  let service: BudgetListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        PaginationTestingModule,
        IconTestingModule,
      ],
      declarations: [BudgetListComponent],
      providers: [
        { provide: BudgetListService, useClass: MockBudgetListService },
      ],
    }).compileComponents();

    service = TestBed.inject(BudgetListService);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  describe('with table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(mockBudgetList));
      fixture = TestBed.createComponent(BudgetListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have cost centers', () => {
      let result;
      component.dataTable$.subscribe((data) => (result = data));
      expect(result).toEqual(mockBudgetList);
    });

    it('should delegate pagination to service', () => {
      spyOn(service, 'viewPage');
      component.viewPage({ currentPage: 3 }, 7);
      expect(service.viewPage).toHaveBeenCalledWith({ currentPage: 3 }, 7);
    });

    it('should revert currentPage when sorting', () => {
      spyOn(service, 'sort');
      component.sort({ currentPage: 3 }, 'bySortCode');
      expect(service.sort).toHaveBeenCalledWith(
        { currentPage: 3 },
        'bySortCode'
      );
    });

    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });

    it('should have cx-pagination element', () => {
      const el = fixture.debugElement.query(By.css('cx-pagination'));
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
      fixture = TestBed.createComponent(BudgetListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });

    it('should not have cx-pagination element', () => {
      const el = fixture.debugElement.query(By.css('cx-pagination'));
      expect(el).toBeFalsy();
    });

    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });

  describe('without pagination data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(
        of({ ...mockBudgetList, pagination: null })
      );
      fixture = TestBed.createComponent(BudgetListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });

    it('should not have cx-pagination element', () => {
      const el = fixture.debugElement.query(By.css('cx-pagination'));
      expect(el).toBeFalsy();
    });
  });
});
