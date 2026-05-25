import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { I18nTestingModule, UrlPipe } from '@spartacus/core';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SubListComponent } from '../../../shared';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CostCenterAssignedBudgetListComponent } from './cost-center-assigned-budget-list.component';
import { CostCenterAssignedBudgetListService } from './cost-center-assigned-budget-list.service';

class MockCostCenterBudgetListService {}

describe('CostCenterAssignedBudgetListComponent', () => {
  let component: CostCenterAssignedBudgetListComponent;
  let fixture: ComponentFixture<CostCenterAssignedBudgetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        CostCenterAssignedBudgetListComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: CostCenterAssignedBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
      ],
    })
      .overrideComponent(CostCenterAssignedBudgetListComponent, {
        remove: {
          imports: [UrlPipe, SubListComponent],
        },
        add: {
          imports: [UrlTestingModule, SubListTestingModule],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CostCenterAssignedBudgetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
