import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

class MockBudgetCostCenterListService {}

describe('BudgetCostCenterListComponent', () => {
  let component: BudgetCostCenterListComponent;
  let fixture: ComponentFixture<BudgetCostCenterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubListTestingModule],
      providers: [
        {
          provide: BudgetCostCenterListService,
          useClass: MockBudgetCostCenterListService,
        },
      ],
      declarations: [BudgetCostCenterListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
