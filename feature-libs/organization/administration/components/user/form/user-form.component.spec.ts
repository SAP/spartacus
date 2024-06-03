import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUserRight,
  B2BUserRole,
  I18nTestingModule,
  Title,
} from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { FormTestingModule } from '../../shared/form/form.testing.module';
import { UserItemService } from '../services/user-item.service';
import { UserFormComponent } from './user-form.component';

const mockForm = new UntypedFormGroup({
  name: new UntypedFormControl(),

  orgUnit: new UntypedFormGroup({
    uid: new UntypedFormControl(),
  }),
  titleCode: new UntypedFormControl(),
  firstName: new UntypedFormControl(),
  lastName: new UntypedFormControl(),
  email: new UntypedFormControl(),
  isAssignedToApprovers: new UntypedFormControl(),
  roles: new UntypedFormArray([]),
});

const activeUnitList$: BehaviorSubject<B2BUnitNode[]> = new BehaviorSubject([]);

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  getTitles(): Observable<Title[]> {
    return EMPTY;
  }

  loadTitles(): void {}
}

class MockB2BUserService implements Partial<B2BUserService> {
  getAllRoles() {
    return [
      B2BUserRole.CUSTOMER,
      B2BUserRole.MANAGER,
      B2BUserRole.APPROVER,
      B2BUserRole.ADMIN,
    ];
  }
  getAllRights() {
    return [B2BUserRight.UNITORDERVIEWER];
  }
}

class MockOrgUnitService {
  getActiveUnitList = () => activeUnitList$.asObservable();
  loadList() {}
}

class MockItemService {
  getForm() {}
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let b2bUnitService: OrgUnitService;
  let b2bUserService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormTestingModule,
      ],
      declarations: [UserFormComponent, FormErrorsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: UserItemService, useClass: MockItemService },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    }).compileComponents();

    b2bUnitService = TestBed.inject(OrgUnitService);

    spyOn(b2bUnitService, 'getActiveUnitList').and.callThrough();
    spyOn(b2bUnitService, 'loadList').and.callThrough();

    b2bUserService = TestBed.inject(B2BUserService);

    spyOn(b2bUserService, 'getAllRights').and.callThrough();
    spyOn(b2bUserService, 'getAllRoles').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
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

  it('should get active b2bUnits from service', () => {
    component.form = mockForm;
    expect(b2bUnitService.getActiveUnitList).toHaveBeenCalled();
  });

  it('should load list of b2bUnits on subscription', () => {
    component.form = mockForm;
    fixture.detectChanges();
    expect(b2bUnitService.loadList).toHaveBeenCalled();
  });

  it('should load list of rights', () => {
    component.form = mockForm;
    fixture.detectChanges();
    expect(b2bUserService.getAllRights).toHaveBeenCalled();
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

    it('should not auto-select unit if there is no unit', () => {
      activeUnitList$.next(undefined);
      fixture.detectChanges();
      expect(component.form.get('orgUnit.uid').value).toBeNull();
    });
  });
});
