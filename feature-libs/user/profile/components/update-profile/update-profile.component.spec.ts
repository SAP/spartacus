import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, User } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, of } from 'rxjs';
import { UpdateProfileComponent } from './update-profile.component';
import { UpdateProfileService } from './update-profile.service';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

const isUpdatingSubject = new BehaviorSubject(false);
class MockUpdateProfileService implements Partial<UpdateProfileService> {
  user$ = of({});
  titles$ = of([]);
  form: FormGroup = new FormGroup({
    customerId: new FormControl(),
    titleCode: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
  });
  isUpdating$ = isUpdatingSubject;
  save(): void {}
  reset(): void {}
}

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let el: DebugElement;

  let service: UpdateProfileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          RouterTestingModule,
          UrlTestingModule,
        ],
        declarations: [UpdateProfileComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: UpdateProfileService,
            useClass: MockUpdateProfileService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    service = TestBed.inject(UpdateProfileService);

    fixture.detectChanges();
  });

  function setFormValue() {
    component.form.setValue({
      customerId: 'foo@bar.com',
      firstName: 'First',
      lastName: 'last',
      titleCode: 'Mr',
    } as User);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner when updating', () => {
    isUpdatingSubject.next(true);
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should not show the spinner when idle', () => {
    isUpdatingSubject.next(false);
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should call updateEmail on submit', () => {
    spyOn(service, 'save').and.stub();

    setFormValue();

    component.onSubmit();
    expect(service.save).toHaveBeenCalled();
  });

  describe('Form Interactions', () => {
    describe('Submit button', () => {
      it('should be disabled while updating', () => {
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        expect(submitBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should call onSubmit() when clicked', () => {
        spyOn(component, 'onSubmit').and.stub();
        isUpdatingSubject.next(false);
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });

    describe('Cancel Link', () => {
      it('should be disabled while loading', () => {
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const cancelLink: HTMLAnchorElement = el.query(By.css('a.btn'))
          .nativeElement;
        expect(cancelLink.classList).toContain('disabled');
      });
    });
  });
});
