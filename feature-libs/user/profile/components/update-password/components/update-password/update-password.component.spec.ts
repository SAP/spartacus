import { Component, DebugElement, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  StateUtils,
  UrlCommands,
  User,
} from '@spartacus/core';
import { UserPasswordService } from '@spartacus/user/profile/core';
import { Observable, of } from 'rxjs';
import { UpdatePasswordComponent } from './update-password.component';

class MockUserPasswordService {
  update(): Observable<StateUtils.LoaderState<User>> {
    return of({});
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

  let userPasswordService: UserPasswordService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule],
        declarations: [
          UpdatePasswordComponent,
          MockUpdatePasswordFormComponent,
          MockCxSpinnerComponent,
        ],
        providers: [
          { provide: UserPasswordService, useClass: MockUserPasswordService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userPasswordService = TestBed.inject(UserPasswordService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner when updating', () => {
    spyOn(userPasswordService, 'update').and.returnValue(
      of({ loading: true } as StateUtils.LoaderState<User>)
    );
    component.onSubmit({ oldPassword: 'foo', newPassword: 'bar' });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should not show the spinner when updating', () => {
    spyOn(userPasswordService, 'update').and.returnValue(
      of({ loading: false } as StateUtils.LoaderState<User>)
    );
    fixture.detectChanges();
    component.onSubmit({ oldPassword: 'foo', newPassword: 'bar' });
    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();
    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePassword on submit', () => {
    spyOn(userPasswordService, 'update').and.callThrough();

    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    component.onSubmit({ oldPassword, newPassword });
    expect(userPasswordService.update).toHaveBeenCalledWith(
      oldPassword,
      newPassword
    );
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
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
