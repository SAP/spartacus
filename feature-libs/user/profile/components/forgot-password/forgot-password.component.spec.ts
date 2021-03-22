import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordService } from './forgot-password.service';

class MockForgotPasswordService implements Partial<ForgotPasswordService> {
  form: FormGroup = new FormGroup({
    userEmail: new FormControl(),
  });

  submit() {}
  reset() {}
}
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
  let service: MockForgotPasswordService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
        declarations: [ForgotPasswordComponent, MockUrlPipe],
        providers: [
          {
            provide: ForgotPasswordService,
            useClass: MockForgotPasswordService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    service = TestBed.inject(ForgotPasswordService);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));

    userEmail = component.form.controls['userEmail'];
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() method on submit', () => {
    const request = spyOn(component, 'onSubmit');
    userEmail.setValue('test@test.com');
    fixture.detectChanges();

    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  it('should call the service method on submit', () => {
    spyOn(service, 'submit').and.callThrough();

    component.form.setValue({
      userEmail: 'test@test.com',
    });

    component.onSubmit();

    expect(service.submit).toHaveBeenCalled();
  });

  it('should reset form onDestroy', () => {
    spyOn(service, 'reset').and.callThrough();

    component.ngOnDestroy();

    expect(service.reset).toHaveBeenCalled();
  });
});
