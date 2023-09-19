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
import {
  FeaturesConfigModule,
  I18nTestingModule,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { NewProfileComponentService } from './new-profile-component.service';
import { NewProfileComponent } from './new-profile.component';
import createSpy = jasmine.createSpy;
@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

const isBusySubject = new BehaviorSubject(false);

class MockProfileService implements Partial<NewProfileComponentService> {
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

describe('NewProfileComponent', () => {
  let component: NewProfileComponent;
  let fixture: ComponentFixture<NewProfileComponent>;
  let el: DebugElement;

  let service: NewProfileComponentService;

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
        declarations: [NewProfileComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: NewProfileComponentService,
            useClass: MockProfileService,
          }
        ],
      })
        .overrideComponent(NewProfileComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.onEdit();
    service = TestBed.inject(NewProfileComponentService);

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
