import { vi } from 'vitest';

vi.mock('@spartacus/storefront', async (importActual) => {
  const actual = await importActual<typeof import('@spartacus/storefront')>();
  const { filter, map } = await import('rxjs/operators');
  const isNotNullable = <T>(value: T): value is NonNullable<T> => value != null;
  return {
    ...actual,
    getPageTitle: (pageMetaService: any) =>
      pageMetaService.getMeta().pipe(
        filter(isNotNullable),
        map((meta: any) => (meta.heading || meta.title) ?? '')
      ),
  };
});

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  FeatureDirective,
  GlobalMessageService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  PageMeta,
  PageMetaService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, of } from 'rxjs';
import { MyAccountV2PasswordComponent } from './my-account-v2-password.component';
import { UpdatePasswordComponentService } from './update-password-component.service';

const mockPageMeta: PageMeta = { title: 'Test Title', heading: 'Test Heading' };
class MockPageMetaService implements Partial<PageMetaService> {
  getMeta = () => of(mockPageMeta);
}

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
  updatePassword = vi.fn().mockImplementation(() => {});
  resetForm = vi.fn().mockImplementation(() => {});
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn().mockImplementation(() => {});
}

describe('MyAccountV2PasswordComponent', () => {
  let component: MyAccountV2PasswordComponent;
  let fixture: ComponentFixture<MyAccountV2PasswordComponent>;
  let el: DebugElement;

  let service: UpdatePasswordComponentService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        MyAccountV2PasswordComponent,
      ],
      providers: [
        {
          provide: UpdatePasswordComponentService,
          useClass: MockUpdatePasswordService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: PageMetaService, useClass: MockPageMetaService },
        ...provideMockFeatureToggles({ a11yFormFieldSectionLegend: true }),
      ],
    })
      .overrideComponent(MyAccountV2PasswordComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            SpinnerComponent,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockCxSpinnerComponent,
            MockFeatureDirective,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2PasswordComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.inject(UpdatePasswordComponentService);
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
      fixture.detectChanges();
      const request = vi.spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      component.onSubmit();
      expect(service.updatePassword).toHaveBeenCalled();
    });

    it('should clean input box', () => {
      fixture.detectChanges();
      const cancelButton = fixture.debugElement.query(
        By.css('.myaccount-password-button-cancel')
      );
      cancelButton.nativeElement.click();
      expect(el.queryAll(By.css('form-control')).length).toEqual(0);
    });

    it('should not submit the form when cancel is clicked', () => {
      vi.spyOn(component, 'onSubmit');
      fixture.detectChanges();

      const cancelButton = fixture.debugElement.query(
        By.css('.myaccount-password-button-cancel')
      );
      cancelButton.nativeElement.click();

      expect(component.onSubmit).not.toHaveBeenCalled();
    });

    it('should hide cx message strip when close clicked', () => {
      component.closeDialogConfirmationAlert();
      fixture.detectChanges();
      const cxMsg = el.query(By.css('cx-message'));
      expect(cxMsg).toBeNull();
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

      it('should render a fieldset with a visible legend', () => {
        const legend = el.query(By.css('fieldset > legend'));
        expect(legend).toBeTruthy();
        expect(legend.nativeElement.textContent.trim()).toContain(
          'myAccountV2PasswordForm.newPasswordTitle'
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
