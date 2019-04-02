import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { User } from '@spartacus/core';
import { UpdateProfileFormComponent } from './update-profile-form.component';

const mockUser: User = {
  titleCode: 'dr',
  firstName: 'N',
  lastName: 'Z',
  uid: 'xxx@xxx.xxx',
};

fdescribe('UpdateProfileFormComponent', () => {
  let component: UpdateProfileFormComponent;
  let fixture: ComponentFixture<UpdateProfileFormComponent>;
  let el: DebugElement;
  let form: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UpdateProfileFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    form = fixture.debugElement.query(By.css('form'));

    fixture.detectChanges();
    component.user = mockUser;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isNotValid', () => {
    it('should return true if NOT valid', () => {
      component.ngOnInit();

      expect(component.isNotValid('firstName')).toEqual(false);
    });

    it('should return false if valid', () => {
      const invalidUser: User = {
        ...mockUser,
        firstName: '',
      };
      component.user = invalidUser;

      component.ngOnInit();
      component.form.get('firstName').markAsDirty();

      expect(component.isNotValid('firstName')).toEqual(true);
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit() on submit event', () => {
      spyOn(component, 'onSubmit').and.stub();
      form.triggerEventHandler('ngSubmit', null);
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should emit submited event', () => {
      spyOn(component.submited, 'emit').and.stub();
      component.onSubmit();
      expect(component.submited.emit).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should call onCancel() on click event', () => {
      spyOn(component, 'onCancel').and.stub();
      const cancelBtn = el.query(By.css('button[type="button"]'));
      cancelBtn.triggerEventHandler('click', null);
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
      fixture.detectChanges();

      const error = el.query(By.css('.invalid-feedback'));
      expect(error).toBeTruthy();

      const message = error.query(By.css('span'));
      expect(message).toBeTruthy();
      expect(message.nativeElement.innerText).toEqual(
        'First name is required.'
      );
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
      fixture.detectChanges();

      const error = el.query(
        By.css('.form-group:nth-of-type(3) .invalid-feedback')
      );
      expect(error).toBeTruthy();

      const message = error.query(By.css('span'));
      expect(message).toBeTruthy();
      expect(message.nativeElement.innerText).toEqual('Last name is required.');
    });
  });
});
