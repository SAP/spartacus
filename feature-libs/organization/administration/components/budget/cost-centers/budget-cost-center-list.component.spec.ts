import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { I18nTestingModule } from '@spartacus/core';
import { SubListComponent } from '../../shared';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

class MockBudgetCostCenterListService {}

describe('BudgetCostCenterListComponent', () => {
  let component: BudgetCostCenterListComponent;
  let fixture: ComponentFixture<BudgetCostCenterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BudgetCostCenterListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: BudgetCostCenterListService,
          useClass: MockBudgetCostCenterListService,
        },
      ],
    })
      .overrideComponent(BudgetCostCenterListComponent, {
        remove: { imports: [SubListComponent] },
        add: { imports: [SubListTestingModule] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BudgetCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
