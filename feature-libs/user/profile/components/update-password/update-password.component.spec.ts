import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  PageMeta,
  PageMetaService,
  RoutingService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { BehaviorSubject, of } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { UpdatePasswordComponent } from './update-password.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
  imports: [
    ReactiveFormsModule,
    I18nTestingModule,
    FormErrorsModule,
    UrlTestingModule,
    PasswordVisibilityToggleModule,
  ],
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

const mockPageMeta: PageMeta = {
  title: 'Update Password',
  heading: 'Update Password',
};
class MockPageMetaService implements Partial<PageMetaService> {
  getMeta = () => of(mockPageMeta);
}

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: DebugElement;
  let routingService: RoutingService;
  let service: UpdatePasswordComponentService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        FormErrorsModule,
        UrlTestingModule,
        PasswordVisibilityToggleModule,
        UpdatePasswordComponent,
        MockCxSpinnerComponent,
      ],
      providers: [
        {
          provide: UpdatePasswordComponentService,
          useClass: MockUpdatePasswordService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PageMetaService, useClass: MockPageMetaService },
        ...provideMockFeatureToggles({ a11yFormFieldSectionLegend: true }),
      ],
    })
      .overrideComponent(UpdatePasswordComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

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

  describe('Accessibility', () => {
    let toggleController: MockFeatureTogglesController;

    beforeEach(() => {
      toggleController = TestBed.inject(MockFeatureTogglesController);
    });

    describe('when a11yFormFieldSectionLegend is enabled', () => {
      beforeEach(() => {
        toggleController.set('a11yFormFieldSectionLegend', true);
        fixture.detectChanges();
      });

      it('should render a fieldset with a visually-hidden legend from page title', () => {
        const legend = el.query(By.css('fieldset > legend'));
        expect(legend).toBeTruthy();
        expect(legend.nativeElement.textContent.trim()).toBe(
          mockPageMeta.heading
        );
      });
    });

    describe('when a11yFormFieldSectionLegend is disabled', () => {
      beforeEach(() => {
        toggleController.set('a11yFormFieldSectionLegend', false);
        fixture.detectChanges();
      });

      it('should render a fieldset', () => {
        expect(el.query(By.css('fieldset'))).toBeTruthy();
      });
    });
  });
});
