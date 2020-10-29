import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CurrencyService,
  I18nTestingModule,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import {
  OrgUnitService,
  PermissionService,
} from '@spartacus/organization/administration/core';
import {
  DateTimePickerModule,
  FormErrorsComponent,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationFormTestingModule } from '../../shared/organization-form/organization-form.testing.module';
import { PermissionItemService } from '../services/permission-item.service';
import { PermissionFormComponent } from './permission-form.component';

import createSpy = jasmine.createSpy;

const mockForm = new FormGroup({
  code: new FormControl(),
  periodRange: new FormControl(),
  threshold: new FormControl(),
  orderApprovalPermissionType: new FormGroup({
    code: new FormControl(),
  }),
  currency: new FormGroup({
    isocode: new FormControl(),
  }),
  orgUnit: new FormGroup({
    uid: new FormControl(),
  }),
});

class MockOrgUnitService {
  getActiveUnitList() {
    return of([]);
  }
  loadList() {}
}

class MockCurrencyService {
  getAll() {}
}

class MockOrganizationItemService {
  getForm() {}
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
  let currencyService: CurrencyService;
  let b2bUnitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        DateTimePickerModule,
        OrganizationFormTestingModule,
      ],
      declarations: [PermissionFormComponent, FormErrorsComponent],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        {
          provide: PermissionItemService,
          useClass: MockOrganizationItemService,
        },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    }).compileComponents();

    currencyService = TestBed.inject(CurrencyService);
    b2bUnitService = TestBed.inject(OrgUnitService);

    spyOn(currencyService, 'getAll').and.callThrough();
    spyOn(b2bUnitService, 'getActiveUnitList').and.callThrough();
    spyOn(b2bUnitService, 'loadList').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormComponent);
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

  it('should load list of b2bUnits on subscription', () => {
    component.form = mockForm;
    fixture.detectChanges();
    expect(b2bUnitService.loadList).toHaveBeenCalled();
  });
});
