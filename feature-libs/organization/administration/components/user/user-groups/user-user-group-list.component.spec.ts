import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { CostCenterBudgetListService } from '../../cost-center/budgets/cost-center-budget-list.service';
import { SubListComponent } from '../../shared';
import { SubListTestingModule } from '../../shared/sub-list/sub-list.testing.module';
import { UserUserGroupListComponent } from './user-user-group-list.component';

class MockCostCenterBudgetListService {}

describe('UserUserGroupListComponent', () => {
  let component: UserUserGroupListComponent;
  let fixture: ComponentFixture<UserUserGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserUserGroupListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: CostCenterBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
      ],
    })
      .overrideComponent(UserUserGroupListComponent, {
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

    fixture = TestBed.createComponent(UserUserGroupListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
