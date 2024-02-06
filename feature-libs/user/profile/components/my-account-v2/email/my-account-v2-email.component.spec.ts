import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, User } from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { MyAccountV2EmailComponent } from './my-account-v2-email.component';
import createSpy = jasmine.createSpy;
import { UpdateEmailComponentService } from './update-email-component.service';
import { UserProfileFacade } from '../../root/facade';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isBusySubject = new BehaviorSubject(false);
class MockMyAccountV2EmailService
  implements Partial<UpdateEmailComponentService>
{
  updateSucceed$ = new Subject();
  form: UntypedFormGroup = new UntypedFormGroup({
    oldEmail: new UntypedFormControl(),
    email: new UntypedFormControl(),
    confirmEmail: new UntypedFormControl(),
    password: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  save = createSpy().and.stub();
  resetForm = createSpy().and.stub();
}

const sampleUser: User = {
  uid: 'sampleUid',
};
class MockNewProfileFacade implements Partial<UserProfileFacade> {
  get() {
    return of(sampleUser);
  }
}

describe('MyAccountV2EmailComponent', () => {
  let component: MyAccountV2EmailComponent;
  let fixture: ComponentFixture<MyAccountV2EmailComponent>;
  let el: DebugElement;

  let service: UpdateEmailComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          RouterTestingModule,
          UrlTestingModule,
          PasswordVisibilityToggleModule,
        ],
        declarations: [MyAccountV2EmailComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: UpdateEmailComponentService,
            useClass: MockMyAccountV2EmailService,
          },
          {
            provide: UserProfileFacade,
            useClass: MockNewProfileFacade,
          },
        ],
      })
        .overrideComponent(MyAccountV2EmailComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2EmailComponent);
    component = fixture.componentInstance;
    component.onEdit();
    el = fixture.debugElement;
    service = TestBed.inject(UpdateEmailComponentService);
    TestBed.inject(UserProfileFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      component.onEdit();
      fixture.detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('.btn-primary')
      ).nativeElement;
      expect(submitBtn.disabled).toBeTruthy();
    });

    it('should show the spinner', () => {
      isBusySubject.next(true);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    });
  });

  describe('idle - editing', () => {
    it('should enable the submit button', () => {
      component.form.enable();
      component.onEdit();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('.btn-primary'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should not show the spinner', () => {
      isBusySubject.next(false);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeNull();
    });

    it('should show cx message strip', () => {
      component.onEdit();
      fixture.detectChanges();
      const cxMsg = el.query(By.css('cx-message'));
      expect(cxMsg.nativeElement).toBeTruthy();
    });

    it('should hide cx message strip when close clicked', () => {
      component.onEdit();
      component.closeDialogConfirmationAlert();
      fixture.detectChanges();
      const cxMsg = el.query(By.css('cx-message'));
      expect(cxMsg).toBeNull();
    });
  });

  describe('idle - display', () => {
    it('should hide the submit button', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('form'))).toBeNull();
    });
  });

  describe('Form Interactions', () => {
    it('should call onSubmit() method on submit', () => {
      component.onEdit();
      fixture.detectChanges();
      const request = spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      component.form.enable();
      component.onEdit();
      component.onSubmit();
      expect(service.save).toHaveBeenCalled();
    });

    it('when cancel is called. submit button is not visible', () => {
      component.form.enable();
      component.cancelEdit();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('button.btn-primary'));
      expect(submitBtn).toBeNull();
    });
  });
});
