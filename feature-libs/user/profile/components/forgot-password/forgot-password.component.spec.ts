import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordComponentService } from './forgot-password-component.service';
import { ForgotPasswordComponent } from './forgot-password.component';
import createSpy = jasmine.createSpy;
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';

const isBusySubject = new BehaviorSubject(false);
class MockForgotPasswordService
  implements Partial<ForgotPasswordComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    userEmail: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  requestEmail = createSpy().and.stub();
  resetForm = createSpy().and.stub();
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let el: DebugElement;
  let service: ForgotPasswordComponentService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
          SpinnerModule,
        ],
        declarations: [
          ForgotPasswordComponent,
          MockUrlPipe,
          MockFeatureDirective,
        ],
        providers: [
          {
            provide: ForgotPasswordComponentService,
            useClass: MockForgotPasswordService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    service = TestBed.inject(ForgotPasswordComponentService);
    routingService = TestBed.inject(RoutingService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
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
      const submitBtn = el.query(By.css('button'));
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
      expect(service.requestEmail).toHaveBeenCalled();
    });

    it('should navigate to login on cancel', () => {
      spyOn(routingService, 'go');
      const cancelBtn = el.query(By.css('button.btn-secondary'));
      cancelBtn.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
    });
  });
});
