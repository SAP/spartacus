import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { Budget } from '../../../core/model';
import { BudgetService } from '../../../core/services/budget.service';
import { BudgetFormService } from '../form/budget-form.service';
import { CurrentBudgetService } from '../services/current-budget.service';
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
  launchDetails = createSpy('launchDetails');
}
const mockForm = new FormGroup({
  code: new FormControl(budgetCode),
});
class MockBudgetFormService implements Partial<BudgetFormService> {
  getForm(): FormGroup {
    return mockForm;
  }
}

class MockBudgetService implements Partial<BudgetService> {
  update = createSpy('update');
  loadBudget = createSpy('loadBudget');
  get = createSpy('get').and.returnValue(of(mockBudget));
}

@Component({
  selector: 'cx-organization-card',
  template: '<ng-content></ng-content>',
})
class MockOrganizationCardComponent {
  @Input() previous;
}

fdescribe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;
  let budgetService: BudgetService;

  let saveButton;
  let budgetFormComponent;
  let currentBudgetService: CurrentBudgetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
      declarations: [
        BudgetEditComponent,
        MockBudgetFormComponent,
        MockOrganizationCardComponent,
      ],
      providers: [
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
        { provide: BudgetService, useClass: MockBudgetService },
        { provide: BudgetFormService, useClass: MockBudgetFormService },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
    currentBudgetService = TestBed.inject(CurrentBudgetService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    saveButton = fixture.debugElement.query(By.css('button:not([type=button])'))
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
      expect(mockForm.disabled).toBeTruthy();
    });

    it('should create budget', () => {
      saveButton.click();
      expect(budgetService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.click();
      expect(currentBudgetService.launchDetails).toHaveBeenCalledWith(
        budgetFormComponent.form.value
      );
    });

    it('should reload budget on each code change', () => {
      expect(budgetService.loadBudget).toHaveBeenCalledWith(mockBudget.code);
    });
  });
});
