import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CostCenterAssignedBudgetListComponent } from './cost-center-assigned-budget-list.component';
import { CostCenterAssignedBudgetListService } from './cost-center-assigned-budget-list.service';

class MockCostCenterBudgetListService {}

describe('CostCenterBudgetListComponent', () => {
  let component: CostCenterAssignedBudgetListComponent;
  let fixture: ComponentFixture<CostCenterAssignedBudgetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: CostCenterAssignedBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
      ],
      declarations: [CostCenterAssignedBudgetListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostCenterAssignedBudgetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
