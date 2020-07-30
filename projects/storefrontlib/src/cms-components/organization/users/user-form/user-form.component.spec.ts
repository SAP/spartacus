import { Pipe, PipeTransform, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  B2BUserService,
  B2BUser,
  OrgUnitService,
  B2BUnitNode,
  Title,
  UserService,
} from '@spartacus/core';

import { B2BUserFormComponent } from './user-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '@spartacus/storefront';

const mockRoles = [
  { name: 'buyer', id: 'b2bcustomergroup', selected: false },
  { name: 'manager', id: 'b2bmanagergroup', selected: false },
  { name: 'approver', id: 'b2bapprovergroup', selected: false },
  { name: 'administrator', id: 'b2badmingroup', selected: false },
];

const mockUser: B2BUser = {
  name: 'Akiro Nakamura',
  uid: 'akiro@naka.com',
  active: true,
  approvers: [],
  currency: {
    active: true,
    isocode: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
  customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974',
  displayUid: 'akiro@naka.com',
  firstName: 'Akiro',
  lastName: 'Nakamura',
  orgUnit: {
    active: true,
    name: 'Rustic',
    uid: 'Rustic',
  },
  roles: ['b2bmanagergroup'],
  selected: false,
  title: 'Mr.',
  titleCode: 'mr',
  email: 'akiro@naka.com',
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
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockB2BUserService implements Partial<B2BUserService> {
  loadB2BUser = createSpy('loadB2BUser');
  get = createSpy('get').and.returnValue(of(mockUser));
  update = createSpy('update');
  getB2BUserRoles = createSpy('getB2BUserRoles').and.returnValue(mockRoles);
}

const mockTitles: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
  {
    code: 'dr',
    name: 'Dr.',
  },
  {
    code: 'rev',
    name: 'Rev.',
  },
];

const expectedTitles: Title[] = [{ code: '', name: 'Title' }, ...mockTitles];

class MockUserService {
  getTitles = createSpy('getTitles').and.returnValue(of(mockTitles));
  loadTitles = createSpy('loadTitles');
}

describe('B2BUserFormComponent', () => {
  let component: B2BUserFormComponent;
  let fixture: ComponentFixture<B2BUserFormComponent>;
  let orgUnitService: OrgUnitService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        DatePickerModule,
        ReactiveFormsModule,
        NgSelectModule,
        RouterTestingModule,
      ],
      declarations: [B2BUserFormComponent, MockUrlPipe, FormErrorsComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    userService = TestBed.get(UserService as Type<UserService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      component.ngOnInit();
      let titles: any;
      component.titles$
        .subscribe((value) => {
          titles = value;
        })
        .unsubscribe();
      expect(userService.getTitles).toHaveBeenCalled();
      expect(titles).toEqual(expectedTitles);
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
      component.b2bUserData = null;
      component.ngOnInit();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.b2bUserData = mockUser;
      component.ngOnInit();
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('verifyB2BUser', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submitForm, 'emit');
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(component.submitForm.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submitForm, 'emit');
      component.b2bUserData = mockUser;
      component.ngOnInit();
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(component.submitForm.emit).toHaveBeenCalledWith(
        component.form.value
      );
    });
  });

  describe('back', () => {
    it('should emit clickBack event', () => {
      spyOn(component.clickBack, 'emit');
      component.back();
      expect(component.clickBack.emit).toHaveBeenCalledWith();
    });
  });
});
