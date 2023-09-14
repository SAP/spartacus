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
import { NewEmailComponentService } from './new-email-component.service';
import { NewEmailComponent } from './new-email.component';
import createSpy = jasmine.createSpy;
import { UserProfileFacade } from '../../root/facade';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isBusySubject = new BehaviorSubject(false);
class MockNewEmailService implements Partial<NewEmailComponentService> {
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
  uid:"sampleUid"
};
class MockNewProfileFacade implements Partial<UserProfileFacade> {
  get() {
    return of(sampleUser);
  }
}

describe('NewEmailComponent', () => {
  let component: NewEmailComponent;
  let fixture: ComponentFixture<NewEmailComponent>;
  let el: DebugElement;

  let service: NewEmailComponentService;

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
        declarations: [NewEmailComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: NewEmailComponentService,
            useClass: MockNewEmailService,
          },
          {
            provide: UserProfileFacade,
            useClass: MockNewProfileFacade
          }
        ],
      })
        .overrideComponent(NewEmailComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmailComponent);
    component = fixture.componentInstance;
    component.onEdit();
    el = fixture.debugElement;
    service = TestBed.inject(NewEmailComponentService);
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
