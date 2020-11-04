import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  GlobalMessage,
  GlobalMessageType, UrlCommands,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UpdateEmailComponent } from './update-email.component';
import { UpdateEmailService } from './update-email.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'cx-update-email-form',
  template: '',
})
class MockUpdateEmailFormComponent {
  @Output()
  saveEmail = new EventEmitter<{
    newUid: string;
    password: string;
  }>();
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

class MockUpdateEmailService {
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
}

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let el: DebugElement;

  let updateEmailService: UpdateEmailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        UpdateEmailComponent,
        MockUpdateEmailFormComponent,
        MockCxSpinnerComponent,
      ],
      providers: [
        {
          provide: UpdateEmailService,
          useClass: MockUpdateEmailService,
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    updateEmailService = TestBed.inject(UpdateEmailService);

    fixture.detectChanges();
  });

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
    component.ngOnInit();
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

    const newUid = 'tester@sap.com';
    const password = 'Qwe123!';

    component.onSubmit({newUid, password});
    expect(updateEmailService.updateEmail).toHaveBeenCalledWith(password, newUid);
  });

  it('should call the internal onSuccess() method when the user was successfully updated', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(updateEmailService, 'getUpdateEmailResultSuccess').and.returnValue(of(true));

    component.ngOnInit();

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

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
