import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BudgetService,
  Budget,
  I18nTestingModule,
} from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { BudgetDetailsComponent } from './budget-details.component';
import { CurrentBudgetService } from '../current-budget.service';
import createSpy = jasmine.createSpy;

const costCenterCode = 'b1';

const mockCostCenter: Budget = {
  code: costCenterCode,
  name: 'budget',
  currency: {
    symbol: '$',
    isocode: 'USD',
  }
};

class MockCurrentBudgetService
  implements Partial<CurrentBudgetService> {
  code$ = of(costCenterCode);
}

class MockBudgetService implements Partial<BudgetService> {
  load = createSpy('load');
  update = createSpy('update');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
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
      declarations: [
        BudgetDetailsComponent,
        MockBudgetCostCenterListComponent,
      ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update costCenter', () => {
    component.update(mockCostCenter);
    expect(budgetService.update).toHaveBeenCalledWith(
      mockCostCenter.code,
      mockCostCenter
    );
  });
  it('should trigger reload of cost center model on each code change', () => {
    expect(budgetService.loadBudget).toHaveBeenCalledWith(mockCostCenter.code);
  });

  describe('costCenter$', () => {
    it('should emit current cost center model', () => {
      let result;
      component.budget$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(mockCostCenter);
    });
  });
});
