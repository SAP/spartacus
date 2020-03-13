import { Pipe, PipeTransform, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  PermissionService,
  Permission,
  OrgUnitService,
  Currency,
  CurrencyService,
  EntitiesModel,
  B2BUnitNode,
  Period,
} from '@spartacus/core';

import { PermissionFormComponent } from './permission-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';

const permissionCode = 'b1';

const mockPermission: Permission = {
  code: permissionCode,
  threshold: 231,
  orderApprovalPermissionType: { name: 'orderType' },
  periodRange: Period.MONTH,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  orgUnit: { name: 'orgName', uid: 'orgUid' },
};

const mockOrgUnits: EntitiesModel<B2BUnitNode> = {
  values: [
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
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits.values));
}

class MockPermissionService implements Partial<PermissionService> {
  loadPermission = createSpy('loadPermission');
  get = createSpy('get').and.returnValue(of(mockPermission));
  update = createSpy('update');
  getTypes = createSpy('getTypes');
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

describe('PermissionFormComponent', () => {
  let component: PermissionFormComponent;
  let fixture: ComponentFixture<PermissionFormComponent>;
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
      declarations: [PermissionFormComponent, MockUrlPipe],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    currencyService = TestBed.get(CurrencyService as Type<CurrencyService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormComponent);
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
      expect(currencies).toEqual(mockCurrencies.values);
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
      expect(businessUnits).toEqual(mockOrgUnits.values);
    });

    it('should setup clean form', () => {
      spyOn(component.form, 'patchValue');
      component.permissionData = null;
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.permissionData = mockPermission;
      component.ngOnInit();
      expect(component.form.patchValue).toHaveBeenCalledWith(mockPermission);
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('verifyPermission', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submit, 'emit');
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submit, 'emit');
      component.permissionData = mockPermission;
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
