import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Country,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Region,
  Title,
  Translatable,
} from '@spartacus/core';
import { OrganizationUserRegistrationForm } from '@spartacus/organization/user-registration/root';
import {
  FormErrorsModule,
  NgSelectA11yDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { Observable, of, throwError } from 'rxjs';
import { UserRegistrationFormComponent } from './user-registration-form.component';
import { UserRegistrationFormService } from './user-registration-form.service';

const mockOrganizationUser: OrganizationUserRegistrationForm = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'email@domain.com',
  titleCode: 'Mr',
  message: 'Hello',
  companyName: 'New Company Inc',
};

const mockTitles: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
];

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
}

const mockCountries: Country[] = [
  {
    isocode: 'CA',
    name: 'Canada',
  },
  {
    isocode: 'PL',
    name: 'Poland',
  },
];

const mockRegions: Region[] = [
  {
    isocode: 'CA-ON',
    name: 'Ontario',
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec',
  },
];

const mockForm: FormGroup = new FormGroup({
  titleCode: new FormControl(),
  firstName: new FormControl(),
  lastName: new FormControl(),
  companyName: new FormControl(),
  email: new FormControl(),
  country: new FormGroup({
    isocode: new FormControl(),
  }),
  region: new FormGroup({
    isocode: new FormControl(),
  }),
  town: new FormControl(),
  line1: new FormControl(),
  line2: new FormControl(),
  postalCode: new FormControl(),
  phoneNumber: new FormControl(),
  message: new FormControl(),
});

class MockUserRegistrationFormService
  implements Partial<UserRegistrationFormService>
{
  getTitles(): Observable<Title[]> {
    return of(mockTitles);
  }

  getCountries(): Observable<Country[]> {
    return of(mockCountries);
  }

  getRegions(): Observable<Region[]> {
    return of(mockRegions);
  }

  registerUser(): Observable<OrganizationUserRegistrationForm> {
    return of(mockOrganizationUser);
  }

  get form(): FormGroup {
    return mockForm;
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('UserRegistrationFormComponent', () => {
  let component: UserRegistrationFormComponent;
  let fixture: ComponentFixture<UserRegistrationFormComponent>;
  let el: DebugElement;
  let msgServcie: MockGlobalMessageService;

  let userRegistrationFormService: UserRegistrationFormService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        I18nTestingModule,
        FormErrorsModule,
      ],
      declarations: [
        UserRegistrationFormComponent,
        MockUrlPipe,
        NgSelectA11yDirective,
        SpinnerComponent,
        MockFeatureDirective,
      ],
      providers: [
        {
          provide: UserRegistrationFormService,
          useClass: MockUserRegistrationFormService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });

    userRegistrationFormService = TestBed.inject(UserRegistrationFormService);
    msgServcie = TestBed.inject(GlobalMessageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm', () => {
    spyOnProperty(userRegistrationFormService, 'form', 'get').and.callThrough();

    expect(component.registerForm).toBeInstanceOf(FormGroup);
  });

  it('should render organization user registration form', () => {
    const form = el.query(By.css('form'));
    const submit = el.query(By.css('[type=submit]'));
    const controls = [
      'titleCode',
      'firstName',
      'lastName',
      'companyName',
      'email',
      'isocode',
      'isocode',
      'town',
      'line1',
      'line2',
      'postalCode',
      'phoneNumber',
      'message',
    ];

    expect(form).not.toBeNull();
    expect(submit).not.toBeNull();
    controls.map((control) =>
      expect(el.query(By.css(`[formcontrolname=${control}]`))).not.toBeNull()
    );
  });

  it('should submit form and call the service', () => {
    spyOn(userRegistrationFormService, 'registerUser').and.callThrough();
    component.registerForm.patchValue({
      ...mockOrganizationUser,
      companyName: 'New Company Inc.',
    });
    component.registerForm.markAllAsTouched();

    component.submit();

    const spinner = fixture.debugElement.query(By.css('cx-spinner'));
    expect(spinner).toBeNull();
    expect(userRegistrationFormService.registerUser).toHaveBeenCalledWith(
      component.registerForm
    );
  });

  it('should show error message if service response failed ', () => {
    spyOn(userRegistrationFormService, 'registerUser').and.returnValue(
      throwError(() => new Error('Simulated error'))
    );
    component.registerForm.patchValue({
      ...mockOrganizationUser,
      companyName: 'New Company Inc.',
    });
    spyOn(msgServcie, 'add').and.callThrough();
    component.registerForm.markAllAsTouched();

    component.submit();

    const spinner = fixture.debugElement.query(By.css('cx-spinner'));
    expect(spinner).toBeNull();
    expect(msgServcie.add).toHaveBeenCalledWith(
      { key: 'userRegistrationForm.messageToFailedToRegister' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should not register organization user with invalid form', () => {
    spyOn(userRegistrationFormService, 'registerUser').and.callThrough();
    component.registerForm.reset();
    component.registerForm.patchValue({
      firstName: mockOrganizationUser.firstName,
    });
    component.registerForm.markAllAsTouched();

    component.submit();

    expect(userRegistrationFormService.registerUser).not.toHaveBeenCalled();
  });

  it('should show spinner based on `isLoading$` property', () => {
    expect(el.query(By.css('cx-spinner'))).toBeNull();

    component.isLoading$.next(true);
    fixture.detectChanges();
    const spinner = el.query(By.css('cx-spinner'));
    expect(spinner).not.toBeNull();
  });
});
