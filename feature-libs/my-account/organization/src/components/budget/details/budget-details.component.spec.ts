import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { Budget } from '../../../core/model/budget.model';
import { BudgetService } from '../../../core/services/budget.service';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationMessageTestingModule } from '../../shared/organization-message/organization-message.testing.module';
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

class MockCurrentBudgetService implements Partial<CurrentBudgetService> {
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
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   fixture.destroy();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should update costCenter?', () => {
    component.toggleActive(mockBudget);
    expect(budgetService.update).toHaveBeenCalledWith(
      mockBudget.code,
      mockBudget
    );
  });

  xit('should prompt costCenter', () => {});

  it('should trigger reload of cost center model on each code change', () => {
    expect(budgetService.loadBudget).toHaveBeenCalledWith(mockBudget.code);
  });

  describe('costCenter$', () => {
    it('should emit current cost center model', () => {
      let result;
      component.model$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(mockBudget);
    });
  });
});
