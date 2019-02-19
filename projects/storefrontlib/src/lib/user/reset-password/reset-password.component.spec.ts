import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { UserService, RoutingService } from '@spartacus/core';

import { ResetPasswordComponent } from './reset-password.component';

class MockUserService {}
class MockRoutingService {}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let form: DebugElement;
  let submit: DebugElement;
  let userId: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ResetPasswordComponent, MockTranslateUrlPipe],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));
    submit = fixture.debugElement.query(By.css('[type="submit"]'));

    component.ngOnInit();
    userId = component.form.controls['userId'];
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid on init', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should form be valid when proper email is set', () => {
    userId.setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();
  });

  it('should requestForgotPasswordEmail() to be defined', () => {
    expect(component.requestForgotPasswordEmail).toBeDefined();
  });

  it('should call requestForgotPasswordEmail() method on submit', () => {
    const request = spyOn(component, 'requestForgotPasswordEmail');
    userId.setValue('test@test.com');
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  it('should submit button be enabled when form is invalid', () => {
    userId.setValue('test');
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(submit.nativeElement.disabled).toBeFalsy();
  });

  it('should field be valid when a valid email is provided.', () => {
    fixture.detectChanges();
    const input = component.form.controls['userId'];
    input.setValue('valid.email@test.com');
    input.markAsTouched();
    input.markAsDirty();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const message = fixture.debugElement.nativeElement.querySelector(
        '.invalid-feedback'
      );
      expect(input.valid).toBeTruthy();
      expect(message).toBeFalsy();
      expect(submit.nativeElement.disabled).toBeFalsy();
    });
  });

  it('should not display error message when user cusor is still in the field.', () => {
    fixture.detectChanges();
    const input = component.form.controls['userId'];
    input.setValue('partial.email@');
    input.markAsDirty();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const message = fixture.debugElement.nativeElement.querySelector(
        '.invalid-feedback'
      );
      expect(input.valid).toBeFalsy();
      expect(message).toBeFalsy();
      expect(submit.nativeElement.disabled).toBeFalsy();
    });
  });

  it('should not display validation message on empty abandonment.', () => {
    fixture.detectChanges();
    const input = component.form.controls['userId'];
    input.setValue('');
    input.markAsTouched();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const message = fixture.debugElement.nativeElement.querySelector(
        '.invalid-feedback'
      );
      expect(input.valid).toBeFalsy();
      expect(message).toBeFalsy();
      expect(submit.nativeElement.disabled).toBeFalsy();
    });
  });

  it('should display error message when email is invalid and user clicks outside of the field.', () => {
    fixture.detectChanges();
    const input = component.form.controls['userId'];
    input.setValue('invalid.email@');
    input.markAsTouched();
    input.markAsDirty();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const message = fixture.debugElement.nativeElement.querySelector(
        '.invalid-feedback'
      );
      expect(input.valid).toBeFalsy();
      expect(message).toBeTruthy();
      expect(submit.nativeElement.disabled).toBeFalsy();
    });
  });
});
