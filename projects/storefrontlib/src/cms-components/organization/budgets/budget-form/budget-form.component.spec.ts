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
  B2BUnitNode,
} from '@spartacus/core';

import { BudgetFormComponent } from './budget-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '@spartacus/storefront';

const budgetCode = 'b1';

const mockBudget: Budget = {
  code: budgetCode,
  name: 'budget1',
  budget: 2230,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  startDate: '2010-01-01T00:00:00',
  endDate: '2034-07-12T23:59:59',
  orgUnit: { name: 'Org Unit 1', uid: 'unitNode1' },
  costCenters: [
    { name: 'costCenter1', code: 'cc1', originalCode: 'Cost Center 1' },
    { name: 'costCenter2', code: 'cc2', originalCode: 'Cost Center 2' },
  ],
};

const mockOrgUnits: B2BUnitNode[] = [
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
];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
  loadOrgUnitNodes = jasmine.createSpy('loadOrgUnitNodes');
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
      declarations: [BudgetFormComponent, MockUrlPipe, FormErrorsComponent],
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
        .subscribe((value) => {
          currencies = value;
        })
        .unsubscribe();
      expect(currencyService.getAll).toHaveBeenCalledWith();
      expect(currencies).toEqual(mockCurrencies);
    });

    it('should load businessUnits', () => {
      component.ngOnInit();
      let businessUnits: any;
      component.businessUnits$
        .subscribe((value) => {
          businessUnits = value;
        })
        .unsubscribe();
      expect(orgUnitService.loadOrgUnitNodes).toHaveBeenCalledWith();
      expect(orgUnitService.getActiveUnitList).toHaveBeenCalledWith();
      expect(businessUnits).toEqual(mockOrgUnits);
    });

    it('should setup clean form', () => {
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      spyOn(component.form, 'patchValue');
      component.budgetData = null;
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
      expect(component.getLocalTimezoneOffset).not.toHaveBeenCalled();
    });

    it('should setup form for update', () => {
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      spyOn(component.form, 'patchValue').and.callThrough();
      component.budgetData = mockBudget;
      component.ngOnInit();

      const getDateWithTimeoffset = (value: string) => {
        return new Date(value).toISOString().substring(0, 16);
      };

      expect(component.form.patchValue).toHaveBeenCalledWith({
        ...mockBudget,
        startDate: getDateWithTimeoffset(mockBudget.startDate),
        endDate: getDateWithTimeoffset(mockBudget.endDate),
      });
      expect(component.form.valid).toBeTruthy();
      expect(component.getLocalTimezoneOffset).toHaveBeenCalledWith(true);
    });
  });

  describe('verifyBudget', () => {
    beforeEach(() => {
      spyOn(component, 'getLocalTimezoneOffset').and.returnValue('+00:00');
    });

    it('should not emit value if form is invalid', () => {
      spyOn(component.submitForm, 'emit');
      spyOn(component, 'update').and.callThrough();
      const form = fixture.debugElement.query(By.css('form'));
      expect(component.update).not.toHaveBeenCalled();
      form.triggerEventHandler('submit', null);
      expect(component.submitForm.emit).not.toHaveBeenCalled();
      expect(component.update).toHaveBeenCalledTimes(1);
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submitForm, 'emit');
      spyOn(component, 'update').and.callThrough();
      component.budgetData = mockBudget;
      component.ngOnInit();
      const form = fixture.debugElement.query(By.css('form'));
      expect(component.update).not.toHaveBeenCalled();
      form.triggerEventHandler('submit', null);
      expect(component.submitForm.emit).toHaveBeenCalledWith(
        component.form.value
      );
      expect(component.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('back', () => {
    it('should emit clickBack event', () => {
      spyOn(component.clickBack, 'emit');
      component.back();
      expect(component.clickBack.emit).toHaveBeenCalledWith();
    });
  });

  describe('getLocalTimezoneOffset()', () => {
    it('should return utc-0 offset string', () => {
      // Use UTC-0 timezone
      Date.prototype.getTimezoneOffset = () => {
        return 0;
      };
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      expect(component.getLocalTimezoneOffset()).toEqual('+00:00');
    });

    it('should return past offset string', () => {
      // Use 2 hours in future timezone
      Date.prototype.getTimezoneOffset = () => {
        return 120;
      };
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      expect(component.getLocalTimezoneOffset()).toEqual('-02:00');
    });

    it('should return future offset string', () => {
      // Use 3 hours in past timezone
      Date.prototype.getTimezoneOffset = () => {
        return -180;
      };
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      expect(component.getLocalTimezoneOffset()).toEqual('+03:00');
    });

    it('should invert past offset string', () => {
      // Use 2 hours in future timezone
      Date.prototype.getTimezoneOffset = () => {
        return 120;
      };
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      expect(component.getLocalTimezoneOffset(true)).toEqual('+02:00');
    });

    it('should invert future offset string', () => {
      // Use 3 hours in past timezone
      Date.prototype.getTimezoneOffset = () => {
        return -180;
      };
      spyOn(component, 'getLocalTimezoneOffset').and.callThrough();
      expect(component.getLocalTimezoneOffset(true)).toEqual('-03:00');
    });
  });
});
