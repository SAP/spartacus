import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  B2BUnitNode,
  B2BApprovalProcess,
  B2BUnit,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  DateTimePickerModule,
} from '@spartacus/storefront';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { UnitFormComponent } from './unit-form.component';

import createSpy = jasmine.createSpy;

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
  loadList = createSpy('loadList');
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockOrgUnit));
  update = createSpy('update');
  loadApprovalProcesses = createSpy('loadApprovalProcesses');
  getApprovalProcesses = createSpy('getApprovalProcesses').and.returnValue(
    of(mockApprovalProcesses)
  );
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

xdescribe('UnitFormComponent', () => {
  let component: UnitFormComponent;
  let fixture: ComponentFixture<UnitFormComponent>;
  let orgUnitService: OrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        DateTimePickerModule,
        ReactiveFormsModule,
        NgSelectModule,
        RouterTestingModule,
      ],
      declarations: [UnitFormComponent, MockUrlPipe, FormErrorsComponent],
      providers: [{ provide: OrgUnitService, useClass: MockOrgUnitService }],
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

  xdescribe('ngOnInit', () => {
    it('should load currencies', () => {
      component.ngOnInit();
      let approvalProcesses: any;
      component.approvalProcesses$
        .subscribe((value) => {
          approvalProcesses = value;
        })
        .unsubscribe();

      expect(orgUnitService.getApprovalProcesses).toHaveBeenCalledWith();
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
      expect(orgUnitService.loadList).toHaveBeenCalledWith();
      expect(orgUnitService.getActiveUnitList).toHaveBeenCalledWith();
      expect(businessUnits).toEqual(mockOrgUnits);
    });

    it('should setup clean form', () => {
      spyOn(component.form, 'patchValue');
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.ngOnInit();
      expect(component.form.patchValue).toHaveBeenCalledWith(mockOrgUnit);
      expect(component.form.valid).toBeTruthy();
    });
  });

  xdescribe('verifyOrgUnit', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submitForm, 'emit');
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(component.submitForm.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submitForm, 'emit');
      component.ngOnInit();
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(component.submitForm.emit).toHaveBeenCalledWith(
        component.form.value
      );
    });
  });

  xdescribe('back', () => {
    it('should emit clickBack event', () => {
      spyOn(component.clickBack, 'emit');
      component.back();
      expect(component.clickBack.emit).toHaveBeenCalledWith();
    });
  });
});
