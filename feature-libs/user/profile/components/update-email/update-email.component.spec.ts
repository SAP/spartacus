import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import {
  AuthService,
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  StateUtils,
  UrlCommands,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { UserEmailService } from '@spartacus/user/profile/core';
import { Observable, of } from 'rxjs';
import { UpdateEmailComponent } from './update-email.component';

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

class MockUserEmailService {
  update(): Observable<StateUtils.LoaderState<User>> {
    return of();
  }
}

class MockAuthService implements Partial<AuthService> {
  coreLogout() {
    return Promise.resolve();
  }
}

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let el: DebugElement;

  let userEmailService: UserEmailService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [
          UpdateEmailComponent,
          MockUpdateEmailFormComponent,
          MockCxSpinnerComponent,
        ],
        providers: [
          {
            provide: UserEmailService,
            useClass: MockUserEmailService,
          },
          {
            provide: AuthService,
            useClass: MockAuthService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userEmailService = TestBed.inject(UserEmailService);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading = true', () => {
    spyOn(userEmailService, 'update').and.returnValue(of({ loading: true }));
    component.onSubmit({ newUid: 'what', password: 'ever' });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should not show spinner when loading = false', () => {
    spyOn(userEmailService, 'update').and.returnValue(of({ loading: false }));
    component.onSubmit({ newUid: 'what', password: 'ever' });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();
    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updateEmail on submit', () => {
    spyOn(userEmailService, 'update').and.returnValue(of({}));
    const newUid = 'tester@sap.com';
    const password = 'Qwe123!';
    component.onSubmit({ newUid, password });
    expect(userEmailService.update).toHaveBeenCalledWith(password, newUid);
  });

  describe('onSuccess', () => {
    describe('when the user was successfully updated', () => {
      it('should add a global message and navigate to a url ', async () => {
        spyOn(userEmailService, 'update').and.stub();
        spyOn(authService, 'coreLogout').and.stub();

        const newUid = 'new@sap.com';

        component['newUid'] = newUid;

        spyOn(globalMessageService, 'add').and.stub();
        spyOn(routingService, 'go').and.stub();

        await component.onSuccess(true);

        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'updateEmailForm.emailUpdateSuccess',
            params: { newUid: 'new@sap.com' },
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        expect(authService.coreLogout).toHaveBeenCalled();

        expect(routingService.go).toHaveBeenCalledWith(
          { cxRoute: 'login' },
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
        spyOn(globalMessageService, 'add').and.stub();
        spyOn(routingService, 'go').and.stub();

        component.onSuccess(false);
        expect(routingService.go).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
      });
    });
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
