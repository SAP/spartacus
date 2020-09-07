import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationMessageTestingModule } from '../../shared/organization-message/organization-message.testing.module';
import { BudgetItemService } from '../services/budget-item.service';
import { CurrentBudgetService } from '../services/current-budget.service';
import { BudgetDetailsComponent } from './budget-details.component';
import createSpy = jasmine.createSpy;

const budgetCode = 'b1';

const mockBudget: Budget = {
  code: budgetCode,
  name: 'budget',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
};

class MockBudgetItemService implements Partial<CurrentBudgetService> {
  key$ = of(budgetCode);
}

class MockBudgetService implements Partial<BudgetService> {
  loadBudget = createSpy('loadBudget');
  update = createSpy('update');
  get = createSpy('get').and.returnValue(of(mockBudget));
}

@Component({
  selector: 'cx-budget-cost-center-list',
  template: '',
})
export class MockBudgetCostCenterListComponent {}

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;
  let budgetService: BudgetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        OrganizationCardTestingModule,
        OrganizationMessageTestingModule,
      ],
      declarations: [BudgetDetailsComponent, MockBudgetCostCenterListComponent],
      providers: [
        { provide: BudgetService, useClass: MockBudgetService },
        { provide: BudgetItemService, useClass: MockBudgetItemService },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger reload of cost center model on each code change', () => {
    expect(budgetService.loadBudget).toHaveBeenCalledWith(mockBudget.code);
  });

  it('should emit current budget model', () => {
    let result;
    component.model$.subscribe((r) => (result = r)).unsubscribe();
    expect(result).toBe(mockBudget);
  });
});
