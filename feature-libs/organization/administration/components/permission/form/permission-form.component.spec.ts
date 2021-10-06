import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Currency,
  CurrencyService,
  I18nTestingModule,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, of } from 'rxjs';
import { FormTestingModule } from '../../shared/form/form.testing.module';
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

const activeUnitList$: BehaviorSubject<B2BUnitNode[]> = new BehaviorSubject([]);
const currencies$: BehaviorSubject<Currency[]> = new BehaviorSubject([]);

class MockOrgUnitService {
  getActiveUnitList = () => activeUnitList$.asObservable();
  loadList() {}
}

class MockCurrencyService {
  getAll = () => currencies$.asObservable();
}

class MockItemService {
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
        FormTestingModule,
      ],
      declarations: [PermissionFormComponent, FormErrorsComponent],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        {
          provide: PermissionItemService,
          useClass: MockItemService,
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

  describe('autoSelect uid', () => {
    beforeEach(() => {
      component.form = mockForm;
      component.form.get('orgUnit.uid').setValue(null);
    });

    it('should auto-select unit if only one is available', () => {
      activeUnitList$.next([{ id: 'test' }]);
      fixture.detectChanges();
      expect(component.form.get('orgUnit.uid').value).toEqual('test');
    });

    it('should not auto-select unit if more than one is available', () => {
      activeUnitList$.next([{ id: 'test1' }, { id: 'test2' }]);
      fixture.detectChanges();
      expect(component.form.get('orgUnit.uid').value).toBeNull();
    });
  });

  describe('autoSelect currency', () => {
    beforeEach(() => {
      component.form = mockForm;
      component.form.get('currency.isocode').setValue(null);
    });

    it('should auto-select currency if only one is available', () => {
      currencies$.next([{ isocode: 'test' }]);
      fixture.detectChanges();
      expect(component.form.get('currency.isocode').value).toEqual('test');
    });

    it('should not auto-select currency if more than one is available', () => {
      currencies$.next([{ isocode: 'test1' }, { isocode: 'test2' }]);
      fixture.detectChanges();
      expect(component.form.get('currency.isocode').value).toBeNull();
    });
  });
});
