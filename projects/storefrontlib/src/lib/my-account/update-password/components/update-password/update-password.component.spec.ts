import { Component, DebugElement, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessage,
  GlobalMessageService,
  RoutingService,
  TranslateUrlOptions,
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
    _pathOrTranslateUrlOptions: any[] | TranslateUrlOptions,
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

fdescribe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: DebugElement;

  let userService: UserService;
  let routingService: RoutingService;
  //let globalMessageService: GlobalMessageService;

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

    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
    // globalMessageService = TestBed.get(GlobalMessageService);

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
    expect(routingService.go).toHaveBeenCalledWith({ route: ['home'] });
  });

  it('should call updatePassword on submit', () => {
    spyOn(userService, 'updatePassword').and.stub();

    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const userId = 'userId';
    component.userId = userId;
    component.onSubmit({ oldPassword, newPassword });
    expect(userService.updatePassword).toHaveBeenCalledWith(
      userId,
      oldPassword,
      newPassword
    );
  });
});
