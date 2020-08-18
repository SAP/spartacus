import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BudgetService, I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
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

class MockCurrentBudgetService implements Partial<CurrentBudgetService> {
  code$ = of('b1');
  model$ = of({
    code: 'b1',
    name: 'budget1',
    currency: {
      symbol: '$',
      isocode: 'USD',
    },
    orgUnit: { name: 'orgName', uid: 'orgCode' },
  });
  launch = createSpy();
}

class MockBudgetService implements Partial<BudgetService> {
  update = createSpy('update');
  loadBudget = createSpy('loadBudget');
}

class MockBudgetFormService {
  getForm(): FormGroup {
    return new FormGroup({});
  }
}

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;
  let budgetService: BudgetService;
  let currentBudgetService: CurrentBudgetService;
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
        { provide: BudgetService, useClass: MockBudgetService },
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
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
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    costCenterFormComponent = fixture.debugElement.query(
      By.css('cx-budget-form')
    ).componentInstance;
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
      expect(currentBudgetService.launch).toHaveBeenCalledWith(
        'budgetDetails',
        costCenterFormComponent.form.value
      );
    });

    it('should trigger reload of cost center model on each code change', () => {
      expect(budgetService.loadBudget).toHaveBeenCalledWith('b1');
    });
  });
});
