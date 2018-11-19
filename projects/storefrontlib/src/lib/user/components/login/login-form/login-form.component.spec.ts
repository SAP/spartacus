import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { LoginFormComponent } from './login-form.component';
import { RoutingService } from '@spartacus/core';
import { AuthService } from '../../../../auth/facade/auth.service';
import { GlobalMessageService } from '../../../../global-message/facade/global-message.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let mockAuthService: any;
  let mockRoutingService: any;
  let mockGlobalMessageService: any;

  beforeEach(async(() => {
    mockAuthService = {
      userToken$: of({ access_token: 'test' }),
      authorize: createSpy()
    };
    mockRoutingService = {
      redirectUrl$: of('/test'),
      go: createSpy(),
      clearRedirectUrl: createSpy()
    };
    mockGlobalMessageService = {
      remove: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.form.controls['userId'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });

  it('should login', () => {
    component.form.controls['userId'].setValue('test@email.com');
    component.form.controls['password'].setValue('secret');
    component.login();

    expect(mockAuthService.authorize).toHaveBeenCalledWith(
      'test@email.com',
      'secret'
    );
  });

  it('should redirect to returnUrl saved in store if there is one', () => {
    expect(mockRoutingService.go).toHaveBeenCalledWith(['/test']);
  });

  describe('userId form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['userId'];
    });

    it('should NOT be valid when empty', () => {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    });

    it('should NOT be valid when is an invalid email', () => {
      control.setValue('with space@email.com');
      expect(control.valid).toBeFalsy();

      control.setValue('without.domain@');
      expect(control.valid).toBeFalsy();

      control.setValue('without.at.com');
      expect(control.valid).toBeFalsy();

      control.setValue('@without.username.com');
      expect(control.valid).toBeFalsy();
    });

    it('should be valid when is a valid email', () => {
      control.setValue('valid@email.com');
      expect(control.valid).toBeTruthy();

      control.setValue('valid123@example.email.com');
      expect(control.valid).toBeTruthy();
    });
  });

  describe('password form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['password'];
    });

    it('should be valid when not empty', () => {
      control.setValue('not-empty');
      expect(control.valid).toBeTruthy();

      control.setValue('not empty');
      expect(control.valid).toBeTruthy();

      control.setValue(' ');
      expect(control.valid).toBeTruthy();
    });

    it('should NOT be valid when empty', () => {
      control.setValue('');
      expect(control.valid).toBeFalsy();

      control.setValue(null);
      expect(control.valid).toBeFalsy();
    });
  });
});
