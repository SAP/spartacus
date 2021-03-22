import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { Subject } from 'rxjs';
import { UpdateEmailComponent } from './update-email.component';
import { UpdateEmailService } from './update-email.service';
import { FormErrorsModule } from '@spartacus/storefront';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlTestingModule } from '../../../../../core/src/routing/configurable-routes/url-translation/testing/url-testing.module';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isUpdatingSubject = new Subject();
class MockUpdateEmailService {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    confirmEmail: new FormControl(),
    password: new FormControl(),
  });
  isUpdating$ = isUpdatingSubject;
  reset(): void {}

  save(): void {}
}

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let el: DebugElement;
  let newUid: AbstractControl;
  let confirmNewUid: AbstractControl;
  let password: AbstractControl;

  let updateEmailService: UpdateEmailService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          RouterTestingModule,
          UrlTestingModule,
        ],
        declarations: [UpdateEmailComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: UpdateEmailService,
            useClass: MockUpdateEmailService,
          },
        ],
      })
      .overrideComponent(UpdateEmailComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    updateEmailService = TestBed.inject(UpdateEmailService);

    fixture.detectChanges();

    newUid = component.form.controls.email;
    confirmNewUid = component.form.controls.confirmEmail;
    password = component.form.controls.password;
  });

  function setFormValue() {
    const id = 'tester@sap.com';
    const pwd = 'Qwe123!';

    newUid.setValue(id);
    confirmNewUid.setValue(id);
    password.setValue(pwd);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner when updating', () => {
    isUpdatingSubject.next(true);
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should call updateEmail on submit', () => {
    spyOn(updateEmailService, 'save').and.stub();

    setFormValue();

    component.onSubmit();
    expect(updateEmailService.save).toHaveBeenCalled();
  });

  describe('Form Interactions', () => {
    describe('Submit button', () => {
      it('should be disabled while loading', () => {
        // updateEmailService.isUpdating$ = of(true);
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        expect(submitBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should call onSubmit() when clicked', () => {
        spyOn(component, 'onSubmit').and.stub();
        isUpdatingSubject.next(false);
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });

    describe('Cancel Button', () => {
      it('should be disabled while loading', () => {
        // updateEmailService.isUpdating$ = of(true);
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        expect(cancelBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should go to home when clicked', () => {
        isUpdatingSubject.next(false);
        fixture.detectChanges();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        expect(
          cancelBtn.nativeElement.getAttribute('ng-reflect-router-link')
        ).toContain('home');
      });
    });
  });
});
