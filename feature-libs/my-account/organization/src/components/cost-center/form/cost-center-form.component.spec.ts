import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  OrgUnitService,
} from '@spartacus/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrganizationTestingModule } from '../../shared/testing/organization-testing.module';
import { CostCenterFormComponent } from './cost-center-form.component';
import { CostCenterFormService } from './cost-center-form.service';
import createSpy = jasmine.createSpy;

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

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
];
const mockActiveCurr = new BehaviorSubject('USD');

class MockCurrencyService implements Partial<CurrencyService> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(mockCurrencies));
  loadOrgUnitNodes = jasmine.createSpy('loadOrgUnitNodes');
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
  let costCenterFormService: CostCenterFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrganizationTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [CostCenterFormComponent, FormErrorsComponent],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        CostCenterFormService,
      ],
    }).compileComponents();

    orgUnitService = TestBed.inject(OrgUnitService);
    currencyService = TestBed.inject(CurrencyService);

    costCenterFormService = TestBed.inject(CostCenterFormService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterFormComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form', () => {
    spyOn(costCenterFormService, 'build');
    component.ngOnInit();
    expect(costCenterFormService.build).toHaveBeenCalled();
  });

  it('should not populate the unit code', () => {
    component.form = new FormGroup({});
    component.ngOnInit();
    expect(component.form.value.unit.uid).toBeFalsy();
  });

  it('should populate the unit code', () => {
    component.form = new FormGroup({});
    component.unitUid = 'parentUnitCode';
    component.ngOnInit();
    expect(component.form.value.unit.uid).toEqual('parentUnitCode');
  });

  it('should render form groups', () => {
    component.form = new FormGroup({});
    component.ngOnInit();
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBeGreaterThan(0);
  });

  it('should not render any form groups if the form is falsy', () => {
    component.form = undefined;
    component.ngOnInit();
    fixture.detectChanges();

    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBe(0);
  });

  it('should load all currencies', () => {
    component.form = new FormGroup({});
    component.ngOnInit();
    fixture.detectChanges();
    expect(currencyService.getAll).toHaveBeenCalled();
  });

  it('should load active units', () => {
    component.form = new FormGroup({});
    component.ngOnInit();
    fixture.detectChanges();
    expect(orgUnitService.getActiveUnitList).toHaveBeenCalled();
  });
});
