import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { Budget } from '../../../core/model';
import { BudgetService } from '../../../core/services/budget.service';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetFormService } from '../form/budget-form.service';
import { BudgetEditComponent } from './budget-edit.component';

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
  name: 'budget1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentBudgetService implements Partial<CurrentBudgetService> {
  key$ = of(budgetCode);
}

class MockBudgetFormService implements Partial<BudgetFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      code: new FormControl(budgetCode),
    });
  }
}

class MockBudgetService implements Partial<BudgetService> {
  update = createSpy('update');
  loadBudget = createSpy('loadBudget');
  get = createSpy('get').and.returnValue(of(mockBudget));
}
class MockRoutingService {
  go = createSpy('go');
}

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;
  let budgetService: BudgetService;
  let routingService: RoutingService;
  let saveButton;
  let budgetFormComponent;

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
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
        { provide: BudgetService, useClass: MockBudgetService },
        { provide: BudgetFormService, useClass: MockBudgetFormService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'))
      .nativeElement;
    budgetFormComponent = fixture.debugElement.query(By.css('cx-budget-form'))
      .componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.click();
      expect(budgetFormComponent.form.disabled).toBeTruthy();
    });

    it('should create budget', () => {
      saveButton.click();
      expect(budgetService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.click();
      expect(routingService.go).toHaveBeenCalledWith(
        'budgetDetails',
        budgetFormComponent.form.value
      );
    });

    it('should reload budget on each code change', () => {
      expect(budgetService.loadBudget).toHaveBeenCalledWith(mockBudget.code);
    });
  });
});
