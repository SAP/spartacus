import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';
import createSpy = jasmine.createSpy;

const mockUser = {
  customerId: '123',
  firstName: 'First',
  lastName: 'Last',
  titleCode: 'Mr.',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = createSpy('UserProfileFacade.get').and.returnValue(of({}));
  getTitles = createSpy('UserProfileFacade.getTitles').and.returnValue(of());
  update = createSpy('UserProfileFacade.update').and.returnValue(of({}));
  close = createSpy('UserProfileFacade.close').and.returnValue(of());
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}

describe('UpdateProfileComponentService', () => {
  let service: UpdateProfileComponentService;
  let userService: UserProfileFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdateProfileComponentService,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(UpdateProfileComponentService);
    userService = TestBed.inject(UserProfileFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('isUpdating$', () => {
    it('should return true', () => {
      service['busy$'].next(true);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBeTrue();
      expect(service.form.disabled).toBeTrue();
    });

    it('should return false', () => {
      service['busy$'].next(false);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBeFalse;
      expect(service.form.disabled).toBeFalse();
    });
  });

  describe('save()', () => {
    describe('success', () => {
      beforeEach(() => {
        service.form.patchValue(mockUser);
      });

      it('should update password', () => {
        service.updateProfile();
        expect(userService.update).toHaveBeenCalledWith(mockUser);
      });

      it('should show message', () => {
        service.updateProfile();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'updateProfileForm.profileUpdateSuccess',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('reset()', () => {
        spyOn(service.form, 'reset').and.callThrough();
        service.updateProfile();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });
  });
  describe('error', () => {
    it('should not save invalid form', () => {
      service.form.patchValue({ customerId: '123' } as User);
      service.updateProfile();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });
});
