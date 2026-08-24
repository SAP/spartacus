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
  User,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
  SpinnerComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { UserProfileFacade } from '../../root/facade';
import { MyAccountV2EmailComponent } from './my-account-v2-email.component';
import { UpdateEmailComponentService } from './update-email-component.service';

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
  save = vi.fn().mockImplementation(() => {});
  resetForm = vi.fn().mockImplementation(() => {});
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn().mockImplementation(() => {});
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        MyAccountV2EmailComponent,
      ],
      providers: [
        {
          provide: UpdateEmailComponentService,
          useClass: MockMyAccountV2EmailService,
        },
        {
          provide: UserProfileFacade,
          useClass: MockNewProfileFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: PageMetaService, useClass: MockPageMetaService },
        ...provideMockFeatureToggles({ a11yFormFieldSectionLegend: true }),
      ],
    })
      .overrideComponent(MyAccountV2EmailComponent, {
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
    fixture = TestBed.createComponent(MyAccountV2EmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.inject(UpdateEmailComponentService);
    TestBed.inject(UserProfileFacade);
    fixture.detectChanges(); // trigger ngOnInit first
    component.onEdit();
  });

  // Helper to run CD without triggering checkNoChanges (avoids NG0100 from
  // async pipes re-subscribing to synchronously-emitting observables)
  function detectChanges() {
    fixture.componentRef.changeDetectorRef.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      component.onEdit();
      detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('.btn-primary')
      ).nativeElement;
      expect(submitBtn.disabled).toBeTruthy();
    });

    it('should show the spinner', () => {
      isBusySubject.next(true);
      detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    });
  });

  describe('idle - editing', () => {
    it('should enable the submit button', () => {
      component.form.enable();
      component.onEdit();
      detectChanges();
      const submitBtn = el.query(By.css('.btn-primary'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should not show the spinner', () => {
      isBusySubject.next(false);
      detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeNull();
    });

    it('should show cx message strip', () => {
      component.onEdit();
      detectChanges();
      const cxMsg = el.query(By.css('cx-message'));
      expect(cxMsg.nativeElement).toBeTruthy();
    });

    it('should hide cx message strip when close clicked', () => {
      component.onEdit();
      component.closeDialogConfirmationAlert();
      detectChanges();
      const cxMsg = el.query(By.css('cx-message'));
      expect(cxMsg).toBeNull();
    });
  });

  describe('idle - display', () => {
    it('should hide the submit button', () => {
      component.ngOnInit();
      detectChanges();
      expect(el.query(By.css('form'))).toBeNull();
    });
  });

  describe('Form Interactions', () => {
    it('should call onSubmit() method on submit', () => {
      component.onEdit();
      detectChanges();
      const request = vi.spyOn(component, 'onSubmit');
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
      detectChanges();
      const submitBtn = el.query(By.css('button.btn-primary'));
      expect(submitBtn).toBeNull();
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
        component.onEdit();
        detectChanges();
      });

      it('should render a fieldset with a visible legend', () => {
        const legend = el.query(By.css('fieldset > legend'));
        expect(legend).toBeTruthy();
        expect(legend.nativeElement.textContent.trim()).toContain(
          'myAccountV2Email.myEmailAddress'
        );
      });
    });

    describe('when a11yFormFieldSectionLegend is disabled', () => {
      beforeEach(() => {
        toggleController.set('a11yFormFieldSectionLegend', false);
        component.onEdit();
        detectChanges();
      });

      it('should render a fieldset', () => {
        expect(el.query(By.css('fieldset'))).toBeTruthy();
      });
    });
  });
});
