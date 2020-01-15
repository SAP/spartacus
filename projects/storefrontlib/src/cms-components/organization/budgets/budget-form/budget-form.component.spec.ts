import { Pipe, PipeTransform, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  BudgetService,
  Budget,
  OrgUnitService,
  Currency,
  CurrencyService,
  B2BUnitNodeList,
} from '@spartacus/core';

import { BudgetFormComponent } from './budget-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';

const budgetCode = 'b1';

const mockBudget: Budget = {
  code: budgetCode,
  name: 'budget1',
  budget: 2230,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  startDate: '2010-01-01T00:00:00+0000',
  endDate: '2034-07-12T00:59:59+0000',
  orgUnit: { name: 'Org Unit 1', uid: 'unitNode1' },
  costCenters: [
    { name: 'costCenter1', code: 'cc1', originalCode: 'Cost Center 1' },
    { name: 'costCenter2', code: 'cc2', originalCode: 'Cost Center 2' },
  ],
};

const mockOrgUnits: B2BUnitNodeList = {
  unitNodes: [
    {
      active: true,
      children: [],
      id: 'unitNode1',
      name: 'Org Unit 1',
      parent: 'parentUnit',
    },
    {
      active: true,
      children: [],
      id: 'unitNode2',
      name: 'Org Unit 2',
      parent: 'parentUnit',
    },
  ],
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

class MockBudgetService implements Partial<BudgetService> {
  loadBudget = createSpy('loadBudget');
  get = createSpy('get').and.returnValue(of(mockBudget));
  update = createSpy('update');
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'Dolar', symbol: '$' },
  { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
];
const mockActiveCurr = new BehaviorSubject('USD');

class MockCurrencyService implements Partial<CurrencyService> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(mockCurrencies));
  getActive(): Observable<string> {
    return mockActiveCurr;
  }
  setActive(isocode: string) {
    mockActiveCurr.next(isocode);
    return mockActiveCurr.subscribe();
  }
}

describe('BudgetFormComponent', () => {
  let component: BudgetFormComponent;
  let fixture: ComponentFixture<BudgetFormComponent>;
  let orgUnitService: OrgUnitService;
  let currencyService: CurrencyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        DatePickerModule,
        ReactiveFormsModule,
        NgSelectModule,
        RouterTestingModule,
      ],
      declarations: [BudgetFormComponent, MockUrlPipe],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    currencyService = TestBed.get(CurrencyService as Type<CurrencyService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load currencies', () => {
      component.ngOnInit();
      let currencies: any;
      component.currencies$
        .subscribe(value => {
          currencies = value;
        })
        .unsubscribe();
      expect(currencyService.getAll).toHaveBeenCalled();
      expect(currencies).toEqual(mockCurrencies);
    });

    it('should load businessUnits', () => {
      component.ngOnInit();
      let businessUnits: any;
      component.businessUnits$
        .subscribe(value => {
          businessUnits = value;
        })
        .unsubscribe();
      expect(orgUnitService.getList).toHaveBeenCalled();
      expect(businessUnits).toEqual(mockOrgUnits.unitNodes);
    });

    it('should setup clean form', () => {
      spyOn(component.form, 'patchValue');
      component.budgetData = null;
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalledWith();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.budgetData = mockBudget;
      component.ngOnInit();
      expect(component.form.patchValue).toHaveBeenCalledWith(mockBudget);
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('verifyBudget', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submitBudget, 'emit');
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submitBudget.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submitBudget, 'emit');
      component.budgetData = mockBudget;
      component.ngOnInit();
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submitBudget.emit).toHaveBeenCalledWith(
        component.form.value
      );
    });
  });

  describe('back', () => {
    it('should emit clickBack event', () => {
      spyOn(component.clickBack, 'emit');
      component.back();
      expect(component.clickBack.emit).toHaveBeenCalled();
    });
  });

  describe('currencySelected', () => {
    it('should setup currency', () => {
      component.budgetData = mockBudget;
      component.ngOnInit();
      component.currencySelected(mockCurrencies[1]);
      expect(component.form.controls['currency'].value).toEqual({
        isocode: 'EUR',
      });
    });
  });

  describe('businessUnitSelected', () => {
    it('should setup business unit', () => {
      component.budgetData = mockBudget;
      component.ngOnInit();
      component.businessUnitSelected(mockOrgUnits.unitNodes[1]);
      expect(component.form.controls['orgUnit'].value).toEqual({
        uid: 'unitNode2',
      });
    });
  });
});
