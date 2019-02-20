import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { UserService, RoutingService } from '@spartacus/core';

import { ResetPasswordFormComponent } from './reset-password-form.component';

class MockUserService {
  isPasswordReset() {
    return of(false);
  }
}

const router = {
  state: {
    url: '/test',
    queryParams: { token: 'test token' }
  }
};
class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

fdescribe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ResetPasswordFormComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.form.controls['repassword'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });
});
