import { Pipe, PipeTransform, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  CostCenterService,
  CostCenter,
  OrgUnitService,
  Currency,
  CurrencyService,
  B2BUnitNode,
} from '@spartacus/core';

import { CostCenterFormComponent } from './cost-center-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';

const costCenterCode = 'b1';

const mockCostCenter: CostCenter = {
  code: costCenterCode,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  unit: { name: 'orgName', uid: 'orgCode' },
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
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

class MockCostCenterService implements Partial<CostCenterService> {
  loadCostCenter = createSpy('loadCostCenter');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
  update = createSpy('update');
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
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

describe('CostCenterFormComponent', () => {
  let component: CostCenterFormComponent;
  let fixture: ComponentFixture<CostCenterFormComponent>;
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
      declarations: [CostCenterFormComponent, MockUrlPipe],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    currencyService = TestBed.get(CurrencyService as Type<CurrencyService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterFormComponent);
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
      expect(currencyService.getAll).toHaveBeenCalled();
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
      expect(orgUnitService.getList).toHaveBeenCalled();
      expect(businessUnits).toEqual(mockOrgUnits);
    });

    it('should setup clean form', () => {
      spyOn(component.form, 'patchValue');
      component.costCenterData = null;
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.costCenterData = mockCostCenter;
      component.ngOnInit();
      expect(component.form.patchValue).toHaveBeenCalledWith(mockCostCenter);
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('verifyCostCenter', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submitForm, 'emit');
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submitForm.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submitForm, 'emit');
      component.costCenterData = mockCostCenter;
      component.ngOnInit();
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submitForm.emit).toHaveBeenCalledWith(
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
});
