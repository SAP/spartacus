import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeatureDirective,
  FeaturesConfig,
  MockTranslatePipe,
  PageMeta,
  PageMetaService,
  TranslatePipe,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { MyAccountV2ProfileComponent } from './my-account-v2-profile.component';
import { UpdateProfileComponentService } from './update-profile-component.service';

const mockPageMeta: PageMeta = { title: 'Test Title', heading: 'Test Heading' };
class MockPageMetaService implements Partial<PageMetaService> {
  getMeta = () => of(mockPageMeta);
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

@Directive({ selector: '[cxNgSelectA11y]' })
class MockNgSelectA11yDirective {
  @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };
}

const isBusySubject = new BehaviorSubject(false);

class MockProfileService implements Partial<UpdateProfileComponentService> {
  user$ = of({});
  titles$ = of([]);
  updateSucceed$ = new Subject<boolean>();
  form: UntypedFormGroup = new UntypedFormGroup({
    customerId: new UntypedFormControl(),
    titleCode: new UntypedFormControl(),
    firstName: new UntypedFormControl(),
    lastName: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  updateProfile = vi.fn().mockImplementation(() => {});
}

describe('MyAccountV2ProfileComponent', () => {
  let component: MyAccountV2ProfileComponent;
  let fixture: ComponentFixture<MyAccountV2ProfileComponent>;
  let el: DebugElement;

  let service: UpdateProfileComponentService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        NgSelectModule,
        MyAccountV2ProfileComponent,
        MockCxSpinnerComponent,
        MockNgSelectA11yDirective,
      ],
      providers: [
        {
          provide: UpdateProfileComponentService,
          useClass: MockProfileService,
        },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '5.2' },
          },
        },
        { provide: PageMetaService, useClass: MockPageMetaService },
        ...provideMockFeatureToggles({ a11yFormFieldSectionLegend: true }),
      ],
    })
      .overrideComponent(MyAccountV2ProfileComponent, {
        remove: {
          imports: [
            TranslatePipe,
            SpinnerComponent,
            NgSelectA11yDirective,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxSpinnerComponent,
            MockNgSelectA11yDirective,
            MockFeatureDirective,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2ProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.inject(UpdateProfileComponentService);
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
      component.onSubmit();
      expect(service.updateProfile).toHaveBeenCalled();
    });

    it('when cancel is called. submit button is not visible', () => {
      component.form.enable();
      detectChanges();
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
          'myAccountV2UserProfile.myInformation'
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
