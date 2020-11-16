import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUserRole,
  I18nTestingModule,
  Title,
  UserService,
} from '@spartacus/core';
import {
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import {
  DateTimePickerModule,
  FormErrorsComponent,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Observable, of } from 'rxjs';
import { OrganizationFormTestingModule } from '../../shared/organization-form/organization-form.testing.module';
import { UserItemService } from '../services/user-item.service';
import { UserFormComponent } from './user-form.component';

const mockForm = new FormGroup({
  name: new FormControl(),

  orgUnit: new FormGroup({
    uid: new FormControl(),
  }),
  titleCode: new FormControl(),
  firstName: new FormControl(),
  lastName: new FormControl(),
  email: new FormControl(),
  isAssignedToApprovers: new FormControl(),
  roles: new FormArray([]),
});

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of();
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
}

class MockOrgUnitService {
  getActiveUnitList() {
    return of([]);
  }
  loadList() {}
}

class MockOrganizationItemService {
  getForm() {}
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
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
      declarations: [UserFormComponent, FormErrorsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: UserItemService, useClass: MockOrganizationItemService },
        { provide: UserService, useClass: MockUserService },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    }).compileComponents();

    b2bUnitService = TestBed.inject(OrgUnitService);

    spyOn(b2bUnitService, 'getActiveUnitList').and.callThrough();
    spyOn(b2bUnitService, 'loadList').and.callThrough();
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
});
