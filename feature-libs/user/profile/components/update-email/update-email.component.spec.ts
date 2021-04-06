import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { of, Subject, throwError } from 'rxjs';
import { UpdateEmailComponent } from './update-email.component';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import createSpy = jasmine.createSpy;

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

class MockUserEmailFacade {
  update = createSpy().and.returnValue(of());
}

class MockAuthService implements Partial<AuthService> {
  coreLogout() {
    return Promise.resolve();
  }
}

class MockRoutingService {
  go = createSpy();
}
class MockGlobalMessageService {
  add = createSpy();
}

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let el: DebugElement;

  let userEmailFacade: UserEmailFacade;
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
            provide: UserEmailFacade,
            useClass: MockUserEmailFacade,
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

    userEmailFacade = TestBed.inject(UserEmailFacade);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading = true', () => {
    const updateTask = new Subject();
    (userEmailFacade.update as any).and.returnValue(updateTask);
    component.onSubmit({ newUid: 'what', password: 'ever' });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    updateTask.complete();
  });

  it('should not show spinner when loading = false', () => {
    component.onSubmit({ newUid: 'what', password: 'ever' });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should navigate to home when cancelled', () => {
    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updateEmail on submit', () => {
    const newUid = 'tester@sap.com';
    const password = 'Qwe123!';
    component.onSubmit({ newUid, password });
    expect(userEmailFacade.update).toHaveBeenCalledWith(password, newUid);
  });

  describe('onSuccess', () => {
    describe('when the user was successfully updated', () => {
      it('should add a global message and navigate to a url ', async () => {
        spyOn(authService, 'coreLogout').and.stub();
        spyOn(component, 'onSubmit').and.callThrough();

        const newUid = 'new@sap.com';

        component['newUid'] = newUid;

        await component.onSuccess();

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
          undefined,
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
        (userEmailFacade.update as any).and.returnValue(throwError(undefined));
        spyOn(component, 'onSuccess').and.callThrough();

        component.onSubmit({ newUid: '', password: 'a' });
        expect(component.onSuccess).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
      });
    });
  });
});
