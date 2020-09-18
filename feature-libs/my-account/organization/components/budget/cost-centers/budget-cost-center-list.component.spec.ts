import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationSubListTestingModule } from '../../shared/organization-sub-list/organization-sub-list.testing.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

class MockBudgetCostCenterListService {}

describe('BudgetCostCenterListComponent', () => {
  let component: BudgetCostCenterListComponent;
  let fixture: ComponentFixture<BudgetCostCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrganizationSubListTestingModule],
      providers: [
        {
          provide: BudgetCostCenterListService,
          useClass: MockBudgetCostCenterListService,
        },
      ],
      declarations: [BudgetCostCenterListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
