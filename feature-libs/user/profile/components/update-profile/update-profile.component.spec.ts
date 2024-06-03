import { CommonModule } from '@angular/common';
import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfig,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, of } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';
import { UpdateProfileComponent } from './update-profile.component';
import createSpy = jasmine.createSpy;
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

@Directive({
  selector: '[cxNgSelectA11y]',
})
class MockNgSelectA11yDirective {
  @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };
}
const isBusySubject = new BehaviorSubject(false);

class MockUpdateProfileService
  implements Partial<UpdateProfileComponentService>
{
  user$ = of({});
  titles$ = of([]);
  form: UntypedFormGroup = new UntypedFormGroup({
    customerId: new UntypedFormControl(),
    titleCode: new UntypedFormControl(),
    firstName: new UntypedFormControl(),
    lastName: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  updateProfile = createSpy().and.stub();
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let el: DebugElement;
  let routingService: RoutingService;

  let service: UpdateProfileComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          RouterTestingModule,
          UrlTestingModule,
          NgSelectModule,
        ],
        declarations: [
          UpdateProfileComponent,
          MockCxSpinnerComponent,
          MockNgSelectA11yDirective,
          MockFeatureDirective,
        ],
        providers: [
          {
            provide: UpdateProfileComponentService,
            useClass: MockUpdateProfileService,
          },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '5.2' },
            },
          },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    service = TestBed.inject(UpdateProfileComponentService);
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
      expect(service.updateProfile).toHaveBeenCalled();
    });

    it('should navigate to home on cancel', () => {
      spyOn(routingService, 'go');
      const cancelBtn = el.query(By.css('button.btn-secondary'));
      cancelBtn.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });
});
