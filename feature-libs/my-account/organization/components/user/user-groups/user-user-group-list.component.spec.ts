import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { CostCenterBudgetListService } from '../../cost-center/budgets/cost-center-budget-list.service';
import { OrganizationSubListTestingModule } from '../../shared/organization-sub-list/organization-sub-list.testing.module';
import { UserUserGroupListComponent } from './user-user-group-list.component';

class MockCostCenterBudgetListService {}

describe('UserUserGroupListComponent', () => {
  let component: UserUserGroupListComponent;
  let fixture: ComponentFixture<UserUserGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: CostCenterBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
      ],
      declarations: [UserUserGroupListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UserUserGroupListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
