import { Component, DebugElement, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { of, Subject, throwError } from 'rxjs';
import { UpdatePasswordComponent } from './update-password.component';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  update = createSpy().and.returnValue(of({}));
}
class MockRoutingService {
  go = createSpy();
}
class GlobalMessageServiceMock {
  add = createSpy();
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

  let userPasswordFacade: UserPasswordFacade;
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
          { provide: UserPasswordFacade, useClass: MockUserPasswordFacade },
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

    userPasswordFacade = TestBed.inject(UserPasswordFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner when updating', () => {
    const updating = new Subject();
    (userPasswordFacade.update as Spy).and.returnValue(updating);
    component.onSubmit({ oldPassword: 'foo', newPassword: 'bar' });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    updating.complete();
  });

  it('should not show the spinner when updating', () => {
    fixture.detectChanges();
    component.onSubmit({ oldPassword: 'foo', newPassword: 'bar' });
    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should navigate to home when cancelled', () => {
    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePassword on submit', () => {
    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    component.onSubmit({ oldPassword, newPassword });
    expect(userPasswordFacade.update).toHaveBeenCalledWith(
      oldPassword,
      newPassword
    );
  });

  describe('onSuccess', () => {
    describe('when the password was successfully updated', () => {
      it('should add a global message and navigate to a url ', () => {
        component.onSubmit({
          oldPassword: '',
          newPassword: '',
        });
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'updatePasswordForm.passwordUpdateSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
      });
    });

    describe('when the password was NOT successfully updated', () => {
      it('should NOT add a global message and NOT navigate to a url ', () => {
        (userPasswordFacade.update as Spy).and.returnValue(
          throwError(undefined)
        );
        component.onSubmit({
          oldPassword: '',
          newPassword: '',
        });
        expect(routingService.go).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
      });
    });
  });
});
