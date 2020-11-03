import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import {
  AuthService,
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UrlCommands,
  User,
  UserService,
} from '@spartacus/core';
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

class MockUserService {
  get(): Observable<User> {
    return of();
  }
  updateEmail(): void {}
  resetUpdateEmailResultState(): void {}
  getUpdateEmailResultLoading(): Observable<boolean> {
    return of(true);
  }
  getUpdateEmailResultSuccess(): Observable<boolean> {
    return of();
  }
}

class MockAuthService implements Partial<AuthService> {
  internalLogout() {
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

  let userService: UserService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

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
          provide: UserService,
          useClass: MockUserService,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the loading state when the component is initialized', () => {
    spyOn(userService, 'resetUpdateEmailResultState').and.stub();

    component.ngOnInit();
    expect(userService.resetUpdateEmailResultState).toHaveBeenCalled();
  });

  it('should show the spinner when updating', () => {
    spyOn(userService, 'getUpdateEmailResultLoading').and.returnValue(of(true));
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();

    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updateEmail on submit', () => {
    spyOn(userService, 'updateEmail').and.stub();

    const newUid = 'tester@sap.com';
    const password = 'Qwe123!';

    component.onSubmit({ newUid, password });
    expect(userService.updateEmail).toHaveBeenCalledWith(password, newUid);
  });

  it('should call the internal onSuccess() method when the user was successfully updated', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(userService, 'getUpdateEmailResultSuccess').and.returnValue(of(true));

    component.ngOnInit();

    expect(component.onSuccess).toHaveBeenCalled();
  });

  describe('onSuccess', () => {
    describe('when the user was successfully updated', () => {
      it('should add a global message and navigate to a url ', async () => {
        spyOn(userService, 'updateEmail').and.stub();
        spyOn(authService, 'internalLogout').and.stub();

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

        expect(authService.internalLogout).toHaveBeenCalled();

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

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
