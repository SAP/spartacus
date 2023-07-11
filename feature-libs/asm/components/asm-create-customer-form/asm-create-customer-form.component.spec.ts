import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  Directive,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmCreateCustomerFacade,
  CustomerRegistrationForm,
} from '@spartacus/asm/root';
import { HttpErrorModel, I18nTestingModule } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { User } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { AsmCreateCustomerFormComponent } from './asm-create-customer-form.component';
import { CreatedCustomer } from './asm-create-customer-form.model';
import createSpy = jasmine.createSpy;

const createdCustomerData: CreatedCustomer = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@test.com',
};

const customerRegistrationForm: CustomerRegistrationForm = {
  firstName: 'John',
  lastName: 'Smith',
  emailAddress: 'john.smith@test.com',
};

const user: User = {
  firstName: 'John',
  lastName: 'Smith',
  uid: 'john.smith@test.com',
};

const errorResponse: HttpErrorModel = {
  details: [
    {
      message: 'This field is not a valid email addresss.',
      reason: 'invalid',
      subject: 'emailAddress',
      subjectType: 'parameter',
      type: 'ValidationError',
    },
    {
      message: 'This field must to be between 0 and 100 characters long.',
      reason: 'invalid',
      subject: 'firstName',
      subjectType: 'parameter',
      type: 'ValidationError',
    },
    {
      message: 'This field must to be between 0 and 100 characters long.',
      reason: 'invalid',
      subject: 'lastName',
      subjectType: 'parameter',
      type: 'ValidationError',
    },
  ],
};
@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = createSpy();

  data$ = of(createdCustomerData);
}

class MockAsmCreateCustomerFacade implements Partial<AsmCreateCustomerFacade> {
  createCustomer(): Observable<User> {
    return of(user);
  }
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCreateCustomerFormComponent', () => {
  let component: AsmCreateCustomerFormComponent;
  let fixture: ComponentFixture<AsmCreateCustomerFormComponent>;
  let el: DebugElement;
  let launchDialogService: LaunchDialogService;
  let asmCreateCustomerFacade: AsmCreateCustomerFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          AsmCreateCustomerFormComponent,
          MockCxIconComponent,
          MockKeyboadFocusDirective,
        ],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: AsmCreateCustomerFacade,
            useClass: MockAsmCreateCustomerFacade,
          },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      }).compileComponents();

      launchDialogService = TestBed.inject(LaunchDialogService);
      asmCreateCustomerFacade = TestBed.inject(AsmCreateCustomerFacade);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCreateCustomerFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render user registration form', () => {
    const form = el.query(By.css('form'));
    const submit = el.query(By.css('[type=submit]'));
    const controls = ['firstName', 'lastName', 'email'];

    expect(form).not.toBeNull();
    expect(submit).not.toBeNull();
    controls.map((control) =>
      expect(el.query(By.css(`[formcontrolname=${control}]`))).not.toBeNull()
    );
  });

  it('should submit form and call the service', () => {
    spyOn(asmCreateCustomerFacade, 'createCustomer').and.callThrough();
    component.registerForm.patchValue(createdCustomerData);

    component.submitForm();

    fixture.detectChanges();
    const spinner = el.query(By.css('cx-spinner'));
    expect(spinner).toBeNull();
    expect(asmCreateCustomerFacade.createCustomer).toHaveBeenCalledWith(
      customerRegistrationForm
    );
  });

  it('should not register user with invalid form', () => {
    spyOn(asmCreateCustomerFacade, 'createCustomer').and.callThrough();
    component.registerForm.reset();
    component.registerForm.patchValue({
      firstName: createdCustomerData.firstName,
    });

    component.submitForm();

    expect(asmCreateCustomerFacade.createCustomer).not.toHaveBeenCalled();
  });

  it('should show all errors detail with invalid form', () => {
    // @ts-ignore
    component.onRegisterUserFail(errorResponse);
    expect(component.showDialogBackendErrorAlerts[0]).toBeTruthy();
    expect(component.showDialogBackendErrorAlerts[1]).toBeTruthy();
    expect(component.showDialogBackendErrorAlerts[2]).toBeTruthy();
    expect(component.backendErrorMessages[0]).toEqual(
      'asm.createCustomerForm.validationErrors.emailAddress'
    );
    expect(component.backendErrorMessages[1]).toEqual(
      'asm.createCustomerForm.validationErrors.firstName'
    );
    expect(component.backendErrorMessages[2]).toEqual(
      'asm.createCustomerForm.validationErrors.lastName'
    );
  });

  it('should close modal when create account successfully', () => {
    spyOn(asmCreateCustomerFacade, 'createCustomer').and.callThrough();
    component.registerForm.patchValue(createdCustomerData);

    component.submitForm();

    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should NOT be disabled', () => {
    const submit = el.query(By.css('[type=submit]'));
    const submitButton = submit.nativeElement;
    expect(submitButton?.hasAttribute('disabled')).toBeFalsy();
  });

  it('should show spinner based on `isLoading$` property', () => {
    expect(el.query(By.css('cx-spinner'))).toBeNull();

    component.isLoading$.next(true);
    fixture.detectChanges();
    const spinner = el.query(By.css('cx-spinner'));
    expect(spinner).not.toBeNull();
  });

  it('should show meaasge based on `cx-message` selector', () => {
    expect(el.query(By.css('cx-message'))).not.toBeNull();
  });
});
