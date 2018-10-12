import { RouterTestingModule } from '@angular/router/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromStore from '../../../store';
import { RoutingService } from '../../../../routing/facade/routing.service';
import { AuthService } from '../../../../auth/facade/auth.service';
import createSpy = jasmine.createSpy;

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  const mockAuth = {
    userToken$: of({ access_token: 'test' }),
    authorize: createSpy()
  };

  const mockRouting = {
    redirectUrl$: of('/test'),
    go: createSpy(),
    clearRedirectUrl: createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers())
        })
      ],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: RoutingService, useValue: mockRouting }
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

    expect(mockAuth.authorize).toHaveBeenCalledWith('test@email.com', 'secret');
  });

  it('should redirect to returnUrl saved in store if there is one', () => {
    expect(mockRouting.go).toHaveBeenCalledWith(['/test']);
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
