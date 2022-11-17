import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { LoginFormComponent } from './login-form.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);
class MockLoginFormComponentService
  implements Partial<LoginFormComponentService>
{
  form: FormGroup = new FormGroup({
    userId: new FormControl(),
    password: new FormControl(),
  });
  isUpdating$ = isBusySubject;
  login = createSpy().and.stub();
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let el: DebugElement;
  let service: LoginFormComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
          SpinnerModule,
        ],
        declarations: [LoginFormComponent, MockUrlPipe],
        providers: [
          {
            provide: LoginFormComponentService,
            useClass: MockLoginFormComponentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    service = TestBed.inject(LoginFormComponentService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      fixture.detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('button')
      ).nativeElement;
      expect(submitBtn.disabled).toBeTruthy();
    });

    it('should show the spinner', () => {
      isBusySubject.next(true);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    });
  });

  describe('idle', () => {
    it('should enable the submit button', () => {
      component.form.enable();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('button'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should not show the spinner', () => {
      isBusySubject.next(false);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeNull();
    });
  });

  describe('Form Interactions', () => {
    it('should call onSubmit() method on submit', () => {
      const request = spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      component.onSubmit();
      expect(service.login).toHaveBeenCalled();
    });
  });
});
