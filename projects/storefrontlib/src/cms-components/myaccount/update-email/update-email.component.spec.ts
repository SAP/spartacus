import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  GlobalMessage,
  GlobalMessageType, I18nTestingModule, UrlCommands,
} from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { UpdateEmailComponent } from './update-email.component';
import { UpdateEmailService } from './update-email.service';
import { NavigationExtras } from '@angular/router';
import { FormErrorsModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

class MockUpdateEmailService {
  destroy$ = new Subject();
  updateEmail(): void {
  }
  resetUpdateEmailResultState(): void {}

  goToRoute(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {
  }

  logout(): void {
  }

  getUpdateEmailResultLoading(): Observable<boolean> {
    return of(true);
  }

  getUpdateEmailResultSuccess(): Observable<boolean> {
    return of();
  }

  addGlobalMessage(_message: GlobalMessage): void {}

  destroySubscription(): void {}
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
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
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

  it('should navigate to home when cancelled', () => {
    spyOn(updateEmailService, 'goToRoute').and.stub();

    component.onCancel();
    expect(updateEmailService.goToRoute).toHaveBeenCalledWith({cxRoute: 'home'});
  });

  it('should call updateEmail on submit', () => {
    spyOn(updateEmailService, 'updateEmail').and.stub();
    spyOn(updateEmailService, 'getUpdateEmailResultSuccess').and.returnValue(of(true));

    setFormValue();

    component.onSubmit();
    expect(updateEmailService.updateEmail).toHaveBeenCalledWith('Qwe123!', 'tester@sap.com');
  });

  it('should call the internal onSuccess() method when the user was successfully updated', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(updateEmailService, 'getUpdateEmailResultSuccess').and.returnValue(of(true));

    setFormValue();
    component.onSubmit();

    expect(component.onSuccess).toHaveBeenCalled();
  });

  describe('onSuccess', () => {
    describe('when the user was successfully updated', () => {
      it('should add a global message and navigate to a url ', async () => {
        spyOn(updateEmailService, 'updateEmail').and.stub();
        spyOn(updateEmailService, 'logout').and.stub();

        const newUid = 'new@sap.com';

        component['newUid'] = newUid;

        spyOn(updateEmailService, 'addGlobalMessage').and.stub();
        spyOn(updateEmailService, 'goToRoute').and.stub();

        await component.onSuccess(true);

        expect(updateEmailService.addGlobalMessage).toHaveBeenCalledWith(
          {
            key: 'updateEmailForm.emailUpdateSuccess',
            params: { newUid: 'new@sap.com' },
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        expect(updateEmailService.logout).toHaveBeenCalled();

        expect(updateEmailService.goToRoute).toHaveBeenCalledWith(
          {cxRoute: 'login'},
          null,
          {
            state: {
              newUid,
            },
          }
        );
      });
    });

    describe('when the email was NOT successfully updated', () => {
      it('should NOT add a global message and NOT navigate to a url ', () => {
        spyOn(updateEmailService, 'addGlobalMessage').and.stub();
        spyOn(updateEmailService, 'goToRoute').and.stub();

        component.onSuccess(false);
        expect(updateEmailService.goToRoute).not.toHaveBeenCalled();
        expect(updateEmailService.addGlobalMessage).not.toHaveBeenCalled();
      });
    });
  });

  describe('Form Interactions', () => {
    beforeEach(() => {
        spyOn(updateEmailService, 'getUpdateEmailResultLoading').and.returnValue(of(false));
        component.ngOnInit();
        fixture.detectChanges();
    });
    describe('onSubmit', () => {
      it('should call onSubmit() when submit button is clicked', () => {
        spyOn(component, 'onSubmit').and.stub();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(component.onSubmit).toHaveBeenCalled();
      });

      it('should NOT updateEmail if the form is not valid', () => {
        spyOn(component, 'onSubmit').and.stub();
        spyOn(updateEmailService, 'updateEmail').and.stub();

        component.onSubmit();

        expect(component.updateEmailForm.valid).toBeFalsy();
        expect(updateEmailService.updateEmail).not.toHaveBeenCalled();
      });

      it('should updateEmail for valid form', () => {
        spyOn(updateEmailService, 'updateEmail').and.stub();

        newUid.setValue('tester@sap.com');
        confirmNewUid.setValue('tester@sap.com');
        password.setValue('Qwe123!');
        fixture.detectChanges();

        component.onSubmit();
        expect(component.updateEmailForm.valid).toBeTruthy();
        expect(updateEmailService.updateEmail).toHaveBeenCalled();
      });
    });

    describe('onCancel', () => {
      it('should call onCancel() on click event', () => {
        spyOn(component, 'onCancel').and.stub();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(component.onCancel).toHaveBeenCalled();
      });
    });
  });
});
