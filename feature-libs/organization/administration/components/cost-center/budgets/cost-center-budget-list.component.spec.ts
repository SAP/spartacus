import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { CostCenterBudgetListComponent } from './cost-center-budget-list.component';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { RouterModule } from '@angular/router';
import { SubListComponent } from '../../shared';

class MockCostCenterAssignBudgetListService {}

describe('CostCenterBudgetListComponent', () => {
  let component: CostCenterBudgetListComponent;
  let fixture: ComponentFixture<CostCenterBudgetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CostCenterBudgetListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: CostCenterBudgetListService,
          useClass: MockCostCenterAssignBudgetListService,
        },
      ],
    })
      .overrideComponent(CostCenterBudgetListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, SubListComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            SubListTestingModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CostCenterBudgetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
