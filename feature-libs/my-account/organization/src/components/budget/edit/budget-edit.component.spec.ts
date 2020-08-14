import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  UrlTestingModule,
} from '@spartacus/core';
import { SplitViewTestingModule } from '@spartacus/storefront';
import { Budget } from '../../../core/model';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetEditComponent } from './budget-edit.component';
import { BudgetService } from '../../../core/services/budget.service';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-budget-form',
  template: '',
})
class MockBudgetFormComponent {
  @Input() form;
}

const budgetCode = 'b1';

const mockBudget: Budget = {
  code: budgetCode,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentBudgetService implements Partial<CurrentBudgetService> {
  code$ = of(budgetCode);
}

class MockBudgetService implements Partial<BudgetService> {
  update = createSpy('update');
  loadBudget = createSpy('loadBudget');
  get = createSpy('get').and.returnValue(of(mockBudget));
}

const mockRouterState = {
  state: {
    params: {
      code: budgetCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;
  let budgetService: BudgetService;
  let routingService: RoutingService;
  let saveButton;
  let costCenterFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [BudgetEditComponent, MockBudgetFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetService, useClass: MockBudgetService },
        {
          provide: CurrentBudgetService,
          useClass: MockCurrentBudgetService,
        },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    costCenterFormComponent = fixture.debugElement.query(
      By.css('cx-budget-form')
    ).componentInstance;
  });

  // not sure why this is needed, but we're failing otherwise
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(costCenterFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(budgetService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: costCenterFormComponent.form.value,
      });
    });
    it('should trigger reload of cost center model on each code change', () => {
      expect(budgetService.loadBudget).toHaveBeenCalledWith(mockBudget.code);
    });
  });
});
