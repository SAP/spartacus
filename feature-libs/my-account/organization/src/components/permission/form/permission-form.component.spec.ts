import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  I18nTestingModule,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PermissionFormComponent } from './permission-form.component';
import createSpy = jasmine.createSpy;
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { PermissionService } from '../../../core/services/permission.service';

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
  getList = createSpy('getList');
  loadList = createSpy('loadList');
  getActiveUnitList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
  { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
];
const mockActiveCurr = new BehaviorSubject('USD');

class MockCurrencyService implements Partial<CurrencyService> {
  getAll = jasmine.createSpy('getAll').and.returnValue(of(mockCurrencies));
  loadList = jasmine.createSpy('loadList');
  getActive(): Observable<string> {
    return mockActiveCurr;
  }
  setActive(isocode: string) {
    mockActiveCurr.next(isocode);
    return mockActiveCurr.subscribe();
  }
}

const mockPermissionTypes: OrderApprovalPermissionType[] = [
  {
    code: 'type1',
    name: 'Type1',
  },
  {
    code: 'type2',
    name: 'Type2',
  },
];
class MockPermissionService {
  getTypes = createSpy('getTypes').and.returnValue(of(mockPermissionTypes));
}

describe('PermissionFormComponent', () => {
  let component: PermissionFormComponent;
  let fixture: ComponentFixture<PermissionFormComponent>;
  let orgUnitService: OrgUnitService;
  let currencyService: CurrencyService;
  let permissionService: PermissionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
      ],
      declarations: [PermissionFormComponent, FormErrorsComponent],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.inject(OrgUnitService);
    currencyService = TestBed.inject(CurrencyService);
    permissionService = TestBed.inject(PermissionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form groups', () => {
    component.form = new FormGroup({ code: new FormControl() });
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBeGreaterThan(0);
  });

  it('should not render any form groups if the form is falsy', () => {
    component.form = undefined;
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBe(0);
  });

  it('should load all currencies', () => {
    component.form = new FormGroup({});
    fixture.detectChanges();
    expect(currencyService.getAll).toHaveBeenCalled();
  });

  it('should load all permission types', () => {
    component.form = new FormGroup({});
    fixture.detectChanges();
    expect(permissionService.getTypes).toHaveBeenCalled();
  });

  it('should load active units', () => {
    component.form = new FormGroup({});
    fixture.detectChanges();
    expect(orgUnitService.getList).toHaveBeenCalled();
  });
});
