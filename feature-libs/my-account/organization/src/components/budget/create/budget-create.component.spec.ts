import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { BudgetService } from '../../../core/services/budget.service';
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

const budgetCode = 'b1';

class MockBudgetService implements Partial<BudgetService> {
  create = createSpy('create');
  get = createSpy('get');
}

class MockBudgetFormService implements Partial<BudgetFormService> {
  getForm(): FormGroup {
    return new FormGroup({
      code: new FormControl(budgetCode),
    });
  }
}
class MockCurrentBudgetService {
  code$ = of(budgetCode);
  launch = createSpy('launch').and.stub();
  parentUnit$ = of({});
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
      expect(budgetService.create).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.click();
      expect(currentBudgetService.launch).toHaveBeenCalledWith(
        'budgetDetails',
        { code: budgetCode }
      );
    });
  });

  describe('fail saving invalid form', () => {
    beforeEach(() => {
      budgetFormComponent.form.setErrors({ incorrect: true });
    });

    it('should not disable form on save when it is invalid', () => {
      saveButton.click();
      expect(budgetFormComponent.form.disabled).toBeFalsy();
    });

    it('should create budget', () => {
      saveButton.click();
      expect(budgetService.create).not.toHaveBeenCalled();
    });

    it('should not navigate away', () => {
      saveButton.click();
      expect(currentBudgetService.launch).not.toHaveBeenCalled();
    });
  });
});
