import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { CostCenterBudgetListComponent } from './cost-center-budget-list.component';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

class MockCostCenterAssignBudgetListService {}

describe('CostCenterBudgetListComponent', () => {
  let component: CostCenterBudgetListComponent;
  let fixture: ComponentFixture<CostCenterBudgetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
        CostCenterBudgetListComponent,
      ],
      providers: [
        {
          provide: CostCenterBudgetListService,
          useClass: MockCostCenterAssignBudgetListService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CostCenterBudgetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
