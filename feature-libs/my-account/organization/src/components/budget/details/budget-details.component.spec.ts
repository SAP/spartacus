import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { Budget } from '../../../core/model/budget.model';
import { BudgetService } from '../../../core/services/budget.service';
import { CurrentBudgetService } from '../current-budget.service';
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
  code$ = of(budgetCode);
}

class MockBudgetService implements Partial<BudgetService> {
  loadBudget = createSpy('loadBudget');
  update = createSpy('update');
  get = createSpy('get').and.returnValue(of(mockBudget));
}

class MockModalService {
  open() {}
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
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
      ],
      declarations: [BudgetDetailsComponent, MockBudgetCostCenterListComponent],
      providers: [
        { provide: BudgetService, useClass: MockBudgetService },
        { provide: ModalService, useClass: MockModalService },
      ],
    })
      .overrideComponent(BudgetDetailsComponent, {
        set: {
          providers: [
            {
              provide: CurrentBudgetService,
              useClass: MockCurrentBudgetService,
            },
          ],
        },
      })
      .compileComponents();

    budgetService = TestBed.inject(BudgetService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update costCenter', () => {
    component.update(mockBudget);
    expect(budgetService.update).toHaveBeenCalledWith(
      mockBudget.code,
      mockBudget
    );
  });
  it('should trigger reload of cost center model on each code change', () => {
    expect(budgetService.loadBudget).toHaveBeenCalledWith(mockBudget.code);
  });

  describe('costCenter$', () => {
    it('should emit current cost center model', () => {
      let result;
      component.budget$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(mockBudget);
    });
  });
});
