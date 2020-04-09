import { Pipe, PipeTransform, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, BehaviorSubject, Observable } from 'rxjs';

import {
  I18nTestingModule,
  OrgUnitService,
  B2BUnitNode,
  B2BApprovalProcess,
  Currency,
  CurrencyService,
  B2BUnit,
} from '@spartacus/core';

import { UnitFormComponent } from './unit-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';

const mockApprovalProcesses: B2BApprovalProcess[] = [
  { code: 'testCode', name: 'testName' },
];

const mockOrgUnit: B2BUnit = {
  uid: 'b1',
  name: 'orgUnit1',
  active: true,
  parentOrgUnit: { uid: 'code' },
  approvalProcess: mockApprovalProcesses[0],
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
  loadOrgUnit = createSpy('loadOrgUnit');
  get = createSpy('get').and.returnValue(of(mockOrgUnit));
  update = createSpy('update');
  loadApprovalProcesses = createSpy('loadApprovalProcesses');
  getApprovalProcesses = createSpy('getApprovalProcesses').and.returnValue(
    of(mockApprovalProcesses)
  );
}

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'Dolar', symbol: '$' },
  { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
];
const mockActiveCurr = new BehaviorSubject('USD');

class MockCurrencyService implements Partial<CurrencyService> {
  getAll = jasmine
    .createSpy('getAll')
    .and.returnValue(of(mockCurrencies.values));
  getActive(): Observable<string> {
    return mockActiveCurr;
  }
  setActive(isocode: string) {
    mockActiveCurr.next(isocode);
    return mockActiveCurr.subscribe();
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('OrgUnitFormComponent', () => {
  let component: UnitFormComponent;
  let fixture: ComponentFixture<UnitFormComponent>;
  let orgUnitService: OrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        DatePickerModule,
        ReactiveFormsModule,
        NgSelectModule,
        RouterTestingModule,
      ],
      declarations: [UnitFormComponent, MockUrlPipe],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load currencies', () => {
      component.ngOnInit();
      let approvalProcesses: any;
      component.approvalProcesses$
        .subscribe((value) => {
          approvalProcesses = value;
        })
        .unsubscribe();

      expect(orgUnitService.getApprovalProcesses).toHaveBeenCalled();
      expect(approvalProcesses).toEqual(mockApprovalProcesses);
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
      component.orgUnitData = null;
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.orgUnitData = mockOrgUnit;
      component.ngOnInit();
      expect(component.form.patchValue).toHaveBeenCalledWith(mockOrgUnit);
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('verifyOrgUnit', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submit, 'emit');
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submit, 'emit');
      component.orgUnitData = mockOrgUnit;
      component.ngOnInit();
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submit.emit).toHaveBeenCalledWith(component.form.value);
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
