import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import {
  UserService,
  RoutingService,
  I18nTestingModule,
} from '@spartacus/core';

import { ForgotPasswordComponent } from './forgot-password.component';
import { FormErrorsModule } from '../../../shared/index';

class MockUserService {}
class MockRoutingService {}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let form: DebugElement;
  let userEmail: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FormErrorsModule,
      ],
      declarations: [ForgotPasswordComponent, MockUrlPipe],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));

    component.ngOnInit();
    userEmail = component.forgotPasswordForm.controls['userEmail'];
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call requestForgotPasswordEmail() method on submit', () => {
    const request = spyOn(component, 'requestForgotPasswordEmail');
    userEmail.setValue('test@test.com');
    fixture.detectChanges();

    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });
});
