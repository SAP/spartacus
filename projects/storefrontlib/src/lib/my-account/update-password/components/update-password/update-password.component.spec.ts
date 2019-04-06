import { Component, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessage,
  GlobalMessageService,
  RoutingService,
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
class MockRoutingService {}
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
