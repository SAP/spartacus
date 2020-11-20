import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
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

class MockUpdateEmailService {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    confirmEmail: new FormControl(),
    password: new FormControl(),
  });
  resetUpdateEmailResultState(): void {}

  getUpdateEmailResultLoading(): Observable<boolean> {
    return of(true);
  }

  onFormSubmit(): void {}
}

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let el: DebugElement;
  let newUid: AbstractControl;
  let confirmNewUid: AbstractControl;
  let password: AbstractControl;

  let updateEmailService: UpdateEmailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule, RouterTestingModule, UrlTestingModule],
      declarations: [
        UpdateEmailComponent,
        MockCxSpinnerComponent,
      ],
      providers: [
        {
          provide: UpdateEmailService,
          useClass: MockUpdateEmailService,
        }
      ],
    })
      .overrideComponent(UpdateEmailComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    updateEmailService = TestBed.inject(UpdateEmailService);

    fixture.detectChanges();

    newUid = component.updateEmailForm.controls.email;
    confirmNewUid = component.updateEmailForm.controls.confirmEmail;
    password = component.updateEmailForm.controls.password;
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

  it('should reset the loading state when the component is initialized', () => {
    spyOn(updateEmailService, 'resetUpdateEmailResultState').and.stub();

    component.ngOnInit();
    expect(updateEmailService.resetUpdateEmailResultState).toHaveBeenCalled();
  });

  it('should show the spinner when updating', () => {
    spyOn(updateEmailService, 'getUpdateEmailResultLoading').and.returnValue(of(true));
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should call updateEmail on submit', () => {
    spyOn(updateEmailService, 'onFormSubmit').and.stub();

    setFormValue();

    component.onSubmit();
    expect(updateEmailService.onFormSubmit).toHaveBeenCalled();
  });

  describe('Form Interactions', () => {
    describe('Submit button', () => {
      it('should be disabled while loading', () => {
        spyOn(updateEmailService, 'getUpdateEmailResultLoading').and.returnValue(of(true));
        component.ngOnInit();
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        expect(submitBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should call onSubmit() when clicked', () => {
        spyOn(updateEmailService, 'getUpdateEmailResultLoading').and.returnValue(of(false));
        spyOn(component, 'onSubmit').and.stub();
        component.ngOnInit();
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });

    describe('Cancel Button', () => {
      it('should be disabled while loading', () => {
        spyOn(updateEmailService, 'getUpdateEmailResultLoading').and.returnValue(of(true));
        component.ngOnInit();
        fixture.detectChanges();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        expect(cancelBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should go to home when clicked', () => {
        spyOn(updateEmailService, 'getUpdateEmailResultLoading').and.returnValue(of(false));
        component.ngOnInit();
        fixture.detectChanges();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(cancelBtn.nativeElement.getAttribute('ng-reflect-router-link')).toContain('home');
      });
    });
  });
});
