import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormValidationService } from '../../../ui/services/form-validation/form-validation.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let form: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ResetPasswordComponent],
      providers: [FormValidationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));

    component.ngOnInit();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid on init', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should form be valid when proper email is set', () => {
    component.form.controls['userId'].setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();
  });

  it('should requestPasswordReset() to be defined', () => {
    expect(component.requestPasswordReset).toBeDefined();
  });

  it('should call requestPasswordReset() method on submit', () => {
    const request = spyOn(component, 'requestPasswordReset');
    component.form.controls['userId'].setValue('test@test.com');
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });
});
