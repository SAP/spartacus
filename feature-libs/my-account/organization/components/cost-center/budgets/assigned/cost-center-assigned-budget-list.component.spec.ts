import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { OrganizationSubListTestingModule } from '../../../shared/organization-sub-list/organization-sub-list.testing.module';
import { CostCenterAssignedBudgetListComponent } from './cost-center-assigned-budget-list.component';
import { CostCenterAssignedBudgetListService } from './cost-center-assigned-budget-list.service';

class MockCostCenterBudgetListService {}

describe('CostCenterBudgetListComponent', () => {
  let component: CostCenterAssignedBudgetListComponent;
  let fixture: ComponentFixture<CostCenterAssignedBudgetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: CostCenterAssignedBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
      ],
      declarations: [CostCenterAssignedBudgetListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterAssignedBudgetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
