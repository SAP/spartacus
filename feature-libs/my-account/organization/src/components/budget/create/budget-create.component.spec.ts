import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BudgetService, I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetFormService } from '../form/budget-form.service';
import { BudgetCreateComponent } from './budget-create.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-budget-form',
  template: '',
})
class MockBudgetFormComponent {
  @Input() form;
  @Input() unitUid;
}

class MockBudgetService implements Partial<BudgetService> {
  create = createSpy('create');
  getBudgets = createSpy('getBudgets');
}

class MockBudgetFormService implements Partial<BudgetFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      code: new FormControl('b1'),
    });
  }
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
  parentUnit$ = of(undefined);
  launch = createSpy();
}

describe('BudgetCreateComponent', () => {
  let component: BudgetCreateComponent;
  let fixture: ComponentFixture<BudgetCreateComponent>;
  let budgetService: BudgetService;
  let currentBudgetService: CurrentBudgetService;
  let saveButton;
  let budgetFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [BudgetCreateComponent, MockBudgetFormComponent],
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
    fixture = TestBed.createComponent(BudgetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    budgetFormComponent = fixture.debugElement.query(By.css('cx-budget-form'))
      .componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(budgetFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(budgetService.create).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(currentBudgetService.launch).toHaveBeenCalledWith(
        'budgetDetails',
        { code: 'b1' }
      );
    });
  });

  describe('fail saving invalid form', () => {
    beforeEach(() => {
      budgetFormComponent.form.setErrors({ incorrect: true });
    });

    it('should not disable form on save when it is invalid', () => {
      saveButton.nativeElement.click();
      expect(budgetFormComponent.form.disabled).toBeFalsy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(budgetService.create).not.toHaveBeenCalled();
    });

    it('should not navigate away', () => {
      saveButton.nativeElement.click();
      expect(currentBudgetService.launch).not.toHaveBeenCalled();
    });
  });
});
