import { Component, DebugElement, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UrlCommands,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UpdatePasswordComponent } from './update-password.component';

class MockUserService {
  get(): Observable<User> {
    return of();
  }
  updatePassword(): void {}
  resetUpdatePasswordProcessState(): void {}
  getUpdatePasswordResultLoading(): Observable<boolean> {
    return of(true);
  }
  getUpdatePasswordResultSuccess(): Observable<boolean> {
    return of();
  }
}
class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

@Component({
  selector: 'cx-update-password-form',
  template: '',
})
class MockUpdatePasswordFormComponent {
  @Output()
  submited = null;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: DebugElement;

  let userService: UserService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [
        UpdatePasswordComponent,
        MockUpdatePasswordFormComponent,
        MockCxSpinnerComponent,
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.inject(UserService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the loading state when the component is initialized', () => {
    spyOn(userService, 'resetUpdatePasswordProcessState').and.stub();

    component.ngOnInit();
    expect(userService.resetUpdatePasswordProcessState).toHaveBeenCalled();
  });

  it('should show the spinner when updating', () => {
    spyOn(userService, 'getUpdatePasswordResultLoading').and.returnValue(
      of(true)
    );

    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();

    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePassword on submit', () => {
    spyOn(userService, 'updatePassword').and.stub();

    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    component.onSubmit({ oldPassword, newPassword });
    expect(userService.updatePassword).toHaveBeenCalledWith(
      oldPassword,
      newPassword
    );
  });

  it('should call the internal onSuccess() method when the password was successfully updated', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(userService, 'getUpdatePasswordResultSuccess').and.returnValue(
      of(true)
    );

    component.ngOnInit();

    expect(component.onSuccess).toHaveBeenCalled();
  });

  describe('onSuccess', () => {
    describe('when the password was successfully updated', () => {
      it('should add a global message and navigate to a url ', () => {
        spyOn(globalMessageService, 'add').and.stub();
        spyOn(routingService, 'go').and.stub();

        component.onSuccess(true);
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'updatePasswordForm.passwordUpdateSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
      });
    });

    describe('when the password was NOT successfully updated', () => {
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
