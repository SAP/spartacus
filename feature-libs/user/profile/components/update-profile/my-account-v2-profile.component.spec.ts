import { CommonModule } from '@angular/common';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesConfigModule, I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { MyAccountV2ProfileComponent } from './my-account-v2-profile.component';
import createSpy = jasmine.createSpy;
import { UpdateProfileComponentService } from './update-profile-component.service';
@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

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
  updateProfile = createSpy().and.stub();
}

describe('MyAccountV2ProfileComponent', () => {
  let component: MyAccountV2ProfileComponent;
  let fixture: ComponentFixture<MyAccountV2ProfileComponent>;
  let el: DebugElement;

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
          FeaturesConfigModule,
        ],
        declarations: [MyAccountV2ProfileComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: UpdateProfileComponentService,
            useClass: MockProfileService,
          },
        ],
      })
        .overrideComponent(MyAccountV2ProfileComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2ProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.onEdit();
    service = TestBed.inject(UpdateProfileComponentService);

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
      component.onSubmit();
      expect(service.updateProfile).toHaveBeenCalled();
    });

    it('when cancel is called. submit button is not visible', () => {
      component.form.enable();
      fixture.detectChanges();
      component.cancelEdit();
      const submitBtn = el.query(By.css('button.btn-primary'));
      expect(submitBtn).toBeNull();
    });
  });
});
