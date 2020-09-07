import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationSubListTestingModule } from '../../../shared/organization-sub-list/organization-sub-list.testing.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';

describe('BudgetCostCenterListComponent', () => {
  let component: BudgetCostCenterListComponent;
  let fixture: ComponentFixture<BudgetCostCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrganizationSubListTestingModule],
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
