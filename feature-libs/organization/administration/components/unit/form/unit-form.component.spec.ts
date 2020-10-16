import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationFormTestingModule } from '../../shared/organization-form/organization-form.testing.module';
import { UnitItemService } from '../services/unit-item.service';
import { UnitFormComponent } from './unit-form.component';

const mockForm = new FormGroup({
  name: new FormControl(),
  uid: new FormControl(),
  approvalProcess: new FormGroup({
    code: new FormControl(),
  }),
  parentOrgUnit: new FormGroup({
    uid: new FormControl(),
  }),
});

class MockOrgUnitService {
  getActiveUnitList() {
    return of([]);
  }
  loadList() {}
  getApprovalProcesses() {
    return of();
  }
}

class MockOrganizationItemService {
  getForm() {}
}

describe('UnitFormComponent', () => {
  let component: UnitFormComponent;
  let fixture: ComponentFixture<UnitFormComponent>;
  let b2bUnitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        OrganizationFormTestingModule,
      ],
      declarations: [UnitFormComponent, FormErrorsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: UnitItemService, useClass: MockOrganizationItemService },
      ],
    }).compileComponents();

    b2bUnitService = TestBed.inject(OrgUnitService);

    spyOn(b2bUnitService, 'getActiveUnitList').and.callThrough();
    spyOn(b2bUnitService, 'loadList').and.callThrough();
    spyOn(b2bUnitService, 'getApprovalProcesses').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitFormComponent);
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

  it('should get active units from service', () => {
    component.form = mockForm;
    expect(b2bUnitService.getActiveUnitList).toHaveBeenCalled();
  });

  it('should get currencies from service', () => {
    component.form = mockForm;
    expect(b2bUnitService.getApprovalProcesses).toHaveBeenCalled();
  });

  it('should load list of b2bUnits on init', () => {
    component.form = mockForm;
    component.ngOnInit();
    fixture.detectChanges();
    expect(b2bUnitService.loadList).toHaveBeenCalled();
  });
});
