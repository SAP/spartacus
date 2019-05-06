import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, User } from '@spartacus/core';
import { FormUtils } from '../../../../shared/utils/forms/form-utils';
import { UpdateProfileFormComponent } from './update-profile-form.component';

const mockUser: User = {
  titleCode: 'dr',
  firstName: 'N',
  lastName: 'Z',
  uid: 'xxx@xxx.xxx',
};

describe('UpdateProfileFormComponent', () => {
  let component: UpdateProfileFormComponent;
  let fixture: ComponentFixture<UpdateProfileFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [UpdateProfileFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
    component.user = mockUser;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isNotValid', () => {
    it('should delegate to FormUtils.isNotValidField()', () => {
      spyOn(FormUtils, 'isNotValidField').and.stub();

      component.isNotValid('firstName');
      expect(FormUtils.isNotValidField).toHaveBeenCalledWith(
        component.form,
        'firstName',
        component['submitClicked']
      );
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit() when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();
      fixture.detectChanges();

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component.submited, 'emit').and.stub();

      const invalidUser: User = {
        ...mockUser,
        firstName: '',
      };
      component.user = invalidUser;
      component.ngOnInit();

      component.onSubmit();
      expect(component.submited.emit).not.toHaveBeenCalled();
    });

    it('should emit submited event', () => {
      spyOn(component.submited, 'emit').and.stub();
      component.user = mockUser;
      component.ngOnInit();

      component.onSubmit();
      expect(component.submited.emit).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should call onCancel() on click event', () => {
      spyOn(component, 'onCancel').and.stub();
      const cancelBtn = el.query(By.css('button[type="button"]'));
      cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should emit cancelled event', () => {
      spyOn(component.cancelled, 'emit').and.stub();
      component.onCancel();
      expect(component.cancelled.emit).toHaveBeenCalled();
    });
  });

  describe('when the first name is invalid', () => {
    const invalidUser: User = {
      ...mockUser,
      firstName: '',
    };

    it('should display an error message', () => {
      component.user = invalidUser;
      component.ngOnInit();
      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const error = el.query(
        By.css('.form-group:nth-of-type(2) .invalid-feedback')
      );
      expect(error).toBeTruthy();

      const message = error.query(By.css('span'));
      expect(message).toBeTruthy();
      expect(message.nativeElement.innerText).not.toEqual('');
    });
  });

  describe('when the last name is invalid', () => {
    const invalidUser: User = {
      ...mockUser,
      lastName: '',
    };

    it('should display an error message', () => {
      component.user = invalidUser;
      component.ngOnInit();
      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const error = el.query(
        By.css('.form-group:nth-of-type(3) .invalid-feedback')
      );
      expect(error).toBeTruthy();

      const message = error.query(By.css('span'));
      expect(message).toBeTruthy();
      expect(message.nativeElement.innerText).not.toEqual('');
    });
  });
});
