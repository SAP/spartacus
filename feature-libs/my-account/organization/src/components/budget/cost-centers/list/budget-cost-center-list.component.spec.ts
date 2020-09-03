import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

@Component({
  selector: 'cx-organization-sub-list',
})
class MockComponent {}

class MockBudgetCostCenterListService {}

describe('BudgetCostCenterListComponent', () => {
  let component: BudgetCostCenterListComponent;
  let fixture: ComponentFixture<BudgetCostCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [BudgetCostCenterListComponent, MockComponent],
      providers: [
        {
          provide: BudgetCostCenterListService,
          useClass: MockBudgetCostCenterListService,
        },
      ],
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
