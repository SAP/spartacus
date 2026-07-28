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
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
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
import { BehaviorSubject, of } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';
import { UpdateEmailComponent } from './update-email.component';
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
class MockUpdateEmailService implements Partial<UpdateEmailComponentService> {
  form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(),
    confirmEmail: new UntypedFormControl(),
    password: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  save = createSpy().and.stub();
  resetForm = createSpy().and.stub();
}

const mockPageMeta: PageMeta = {
  title: 'Update Email',
  heading: 'Update Email',
};
class MockPageMetaService implements Partial<PageMetaService> {
  getMeta = () => of(mockPageMeta);
}

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let el: DebugElement;

  let service: UpdateEmailComponentService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        UpdateEmailComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UpdateEmailComponentService,
          useClass: MockUpdateEmailService,
        },
        { provide: PageMetaService, useClass: MockPageMetaService },
        ...provideMockFeatureToggles({ a11yFormFieldSectionLegend: true }),
      ],
    })
      .overrideComponent(UpdateEmailComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, SpinnerComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockCxSpinnerComponent,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.inject(UpdateEmailComponentService);

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
      expect(service.save).toHaveBeenCalled();
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
