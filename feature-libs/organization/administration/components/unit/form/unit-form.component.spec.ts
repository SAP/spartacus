import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, of } from 'rxjs';
import { FormTestingModule } from '../../shared/form/form.testing.module';
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

const activeUnitList$: BehaviorSubject<B2BUnitNode[]> = new BehaviorSubject([]);
const unit$: BehaviorSubject<String> = new BehaviorSubject(null);

class MockOrgUnitService {
  getActiveUnitList = () => activeUnitList$.asObservable();
  loadList() {}
  getApprovalProcesses() {
    return of();
  }
}

class MockItemService {
  get unit$() {
    return unit$.asObservable();
  }
  getForm() {
    return mockForm;
  }
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
        FormTestingModule,
      ],
      declarations: [UnitFormComponent, FormErrorsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: UnitItemService, useClass: MockItemService },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form controls', () => {
    fixture.detectChanges();
    const formControls = fixture.debugElement.queryAll(By.css('input'));
    expect(formControls.length).toBeGreaterThan(0);
  });

  it('should get active units from service', () => {
    fixture.detectChanges();
    expect(b2bUnitService.getActiveUnitList).toHaveBeenCalled();
  });

  it('should get currencies from service', () => {
    expect(b2bUnitService.getApprovalProcesses).toHaveBeenCalled();
  });

  it('should load list of b2bUnits on init', () => {
    component.ngOnInit();
    expect(b2bUnitService.loadList).toHaveBeenCalled();
  });

  it('should disable parentOrgUnit form control', () => {
    component.createChildUnit = true;
    component.units$.subscribe().unsubscribe();
    expect(component.form.get('parentOrgUnit.uid').disabled).toBeTruthy();
  });

  describe('autoSelect uid', () => {
    beforeEach(() => {
      component.form.get('parentOrgUnit.uid').setValue(null);
    });

    it('should auto-select unit if only one is available', () => {
      activeUnitList$.next([{ id: 'test' }]);
      fixture.detectChanges();
      expect(component.form.get('parentOrgUnit.uid').value).toEqual('test');
    });

    it('should not auto-select unit if more than one is available', () => {
      activeUnitList$.next([{ id: 'test1' }, { id: 'test2' }]);
      fixture.detectChanges();
      expect(component.form.get('parentOrgUnit.uid').value).toBeNull();
    });
  });

  describe('createUidWithName', () => {
    it('should set uid field value if empty based on provided name value', () => {
      component.form.get('name').patchValue('Unit Test Value');
      component.form.get('uid').patchValue(undefined);
      component.createUidWithName(
        component.form.get('name'),
        component.form.get('uid')
      );

      expect(component.form.get('uid').value).toEqual('unit-test-value');
    });

    it('should prevent setting uid if value is provided for this field', () => {
      component.form.get('name').patchValue('Unit Test Value');
      component.form.get('uid').patchValue('test uid');
      component.createUidWithName(
        component.form.get('name'),
        component.form.get('uid')
      );

      expect(component.form.get('uid').value).toEqual('test uid');
    });
  });
});
