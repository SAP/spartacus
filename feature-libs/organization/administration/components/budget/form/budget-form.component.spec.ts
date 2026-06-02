import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Currency,
  CurrencyService,
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import {
  DatePickerComponent,
  FocusDirective,
  FormErrorsComponent,
} from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject } from 'rxjs';
import { FormComponent } from '../../shared';
import { FormTestingModule } from '../../shared/form/form.testing.module';
import { BudgetItemService } from '../services/budget-item.service';
import { BudgetFormComponent } from './budget-form.component';

const mockForm = new UntypedFormGroup({
  name: new UntypedFormControl(),
  code: new UntypedFormControl(),
  startDate: new UntypedFormControl(),
  endDate: new UntypedFormControl(),
  currency: new UntypedFormGroup({
    isocode: new UntypedFormControl(),
  }),
  orgUnit: new UntypedFormGroup({
    uid: new UntypedFormControl(),
  }),
  budget: new UntypedFormControl(),
});

const activeUnitList$: BehaviorSubject<B2BUnitNode[]> = new BehaviorSubject([]);
const currencies$: BehaviorSubject<Currency[]> = new BehaviorSubject([]);

class MockOrgUnitService {
  getActiveUnitList = () => activeUnitList$.asObservable();
  loadList() {}
}

class MockCurrencyService {
  getAll = () => currencies$.asObservable();
}

class MockItemService {
  getForm() {}
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-date-picker',
  template: '',
  imports: [
    I18nTestingModule,
    UrlTestingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormTestingModule,
  ],
})
class MockDatePickerComponent {
  @Input() control: UntypedFormControl;
  @Input() min: UntypedFormControl;
  @Input() max: UntypedFormControl;
  @Input() required?: boolean;
}

describe('BudgetFormComponent', () => {
  let component: BudgetFormComponent;
  let fixture: ComponentFixture<BudgetFormComponent>;
  let currencyService: CurrencyService;
  let b2bUnitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        BudgetFormComponent,
        FormErrorsComponent,
        FocusDirective,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: BudgetItemService, useClass: MockItemService },
      ],
    })
      .overrideComponent(BudgetFormComponent, {
        remove: {
          imports: [
            FormComponent,
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            DatePickerComponent,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            FormTestingModule,
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockDatePickerComponent,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();

    currencyService = TestBed.inject(CurrencyService);
    b2bUnitService = TestBed.inject(OrgUnitService);

    spyOn(currencyService, 'getAll').and.callThrough();
    spyOn(b2bUnitService, 'getActiveUnitList').and.callThrough();
    spyOn(b2bUnitService, 'loadList').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form controls', () => {
    component.form = mockForm;
    fixture.detectChanges();
    const formControls = fixture.debugElement.queryAll(By.css('input'));
    expect(formControls.length).toBeGreaterThan(0);
  });

  it('should not render any form controls if the form is falsy', () => {
    component.form = undefined;
    fixture.detectChanges();
    const formControls = fixture.debugElement.queryAll(By.css('input'));
    expect(formControls.length).toBe(0);
  });

  it('should get currencies from service', () => {
    component.form = mockForm;
    expect(currencyService.getAll).toHaveBeenCalled();
  });

  it('should get active b2bUnits from service', () => {
    component.form = mockForm;
    expect(b2bUnitService.getActiveUnitList).toHaveBeenCalled();
  });

  it('should load list of b2bUnits on init', () => {
    component.form = mockForm;
    component.ngOnInit();
    fixture.detectChanges();
    expect(b2bUnitService.loadList).toHaveBeenCalled();
  });

  describe('autoSelect uid', () => {
    beforeEach(() => {
      component.form = mockForm;
      component.form.get('orgUnit.uid')?.setValue(null);
    });

    it('should auto-select unit if only one is available', () => {
      activeUnitList$.next([{ id: 'test' }]);
      fixture.detectChanges();
      expect(component.form?.get('orgUnit.uid')?.value).toEqual('test');
    });

    it('should not auto-select unit if more than one is available', () => {
      activeUnitList$.next([{ id: 'test1' }, { id: 'test2' }]);
      fixture.detectChanges();
      expect(component.form?.get('orgUnit.uid')?.value).toBeNull();
    });

    it('should not auto-select unit if there is no unit', () => {
      activeUnitList$.next(undefined);
      fixture.detectChanges();
      expect(component.form?.get('orgUnit.uid')?.value).toBeNull();
    });
  });

  describe('autoSelect currency', () => {
    beforeEach(() => {
      component.form = mockForm;
      component.form.get('currency.isocode')?.setValue(null);
    });

    it('should auto-select currency if only one is available', () => {
      currencies$.next([{ isocode: 'test' }]);
      fixture.detectChanges();
      expect(component.form?.get('currency.isocode')?.value).toEqual('test');
    });

    it('should not auto-select currency if more than one is available', () => {
      currencies$.next([{ isocode: 'test' }, { isocode: 'test' }]);
      fixture.detectChanges();
      expect(component.form?.get('currency.isocode')?.value).toBeNull();
    });
  });

  describe('createCodeWithName', () => {
    it('should set code field value if empty based on provided name value', () => {
      component.form = mockForm;
      component.form.get('name')?.patchValue('Unit Test Value');
      component.form.get('code')?.patchValue(undefined);
      component.createCodeWithName(
        component.form.get('name'),
        component.form.get('code')
      );

      expect(component.form.get('code')?.value).toEqual('unit-test-value');
    });

    it('should prevent setting code if value is provided for this field', () => {
      component.form = mockForm;
      component.form.get('name')?.patchValue('Unit Test Value');
      component.form.get('code')?.patchValue('test code');
      component.createCodeWithName(
        component.form.get('name'),
        component.form.get('code')
      );

      expect(component.form.get('code')?.value).toEqual('test code');
    });
  });
});
