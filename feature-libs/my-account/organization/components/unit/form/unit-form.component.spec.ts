import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
  I18nTestingModule,
} from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { CurrentUnitService } from '../current-unit.service';
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
const mockForm: FormGroup = new FormGroup({
  uid: new FormControl(''),
  name: new FormControl(''),
  parentOrgUnit: new FormGroup({
    uid: new FormControl(null),
  }),
  approvalProcess: new FormGroup({
    code: new FormControl(null),
  }),
});

class MockOrgUnitService implements Partial<OrgUnitService> {
  getApprovalProcesses = createSpy('getApprovalProcesses').and.returnValue(
    of(mockApprovalProcesses)
  );
  loadList = createSpy('loadList');
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  b2bUnit$ = of(mockOrgUnit.uid);
}

describe('UnitFormComponent', () => {
  let component: UnitFormComponent;
  let fixture: ComponentFixture<UnitFormComponent>;
  let orgUnitService: OrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        NgSelectModule,
        RouterTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [UnitFormComponent, FormErrorsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.inject(OrgUnitService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitFormComponent);
    component = fixture.componentInstance;
    component.form = mockForm;
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
  });
});
