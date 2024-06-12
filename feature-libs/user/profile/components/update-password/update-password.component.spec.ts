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
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { UpdatePasswordComponent } from './update-password.component';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isBusySubject = new BehaviorSubject(false);
class MockUpdatePasswordService
  implements Partial<UpdatePasswordComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    oldPassword: new UntypedFormControl(),
    newPassword: new UntypedFormControl(),
    newPasswordConfirm: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  updatePassword = createSpy().and.stub();
  resetForm = createSpy().and.stub();
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: DebugElement;
  let routingService: RoutingService;
  let service: UpdatePasswordComponentService;

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
        declarations: [
          UpdatePasswordComponent,
          MockCxSpinnerComponent,
          MockFeatureDirective,
        ],
        providers: [
          {
            provide: UpdatePasswordComponentService,
            useClass: MockUpdatePasswordService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      })
        .overrideComponent(UpdatePasswordComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.inject(UpdatePasswordComponentService);
    routingService = TestBed.inject(RoutingService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      fixture.detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('button.btn-primary')
      ).nativeElement;
      expect(submitBtn.disabled).toBeTruthy();
    });

    it('should show the spinner', () => {
      isBusySubject.next(true);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    });
  });

  describe('idle', () => {
    it('should enable the submit button', () => {
      component.form.enable();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('button.btn-primary'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should not show the spinner', () => {
      isBusySubject.next(false);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeNull();
    });
  });

  describe('Form Interactions', () => {
    it('should call onSubmit() method on submit', () => {
      const request = spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      component.onSubmit();
      expect(service.updatePassword).toHaveBeenCalled();
    });

    it('should navigate to home on cancel', () => {
      spyOn(routingService, 'go');
      const cancelBtn = el.query(By.css('button.btn-secondary'));
      cancelBtn.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });
});
