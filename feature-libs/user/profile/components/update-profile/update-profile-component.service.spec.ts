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
import { EMPTY, of } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';
import createSpy = jasmine.createSpy;

const mockUser = {
  customerId: '123',
  firstName: 'First',
  lastName: 'Last',
  titleCode: 'Mr.',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = vi.fn('UserProfileFacade.get').mockReturnValue(of({}));
  getTitles = vi.fn('UserProfileFacade.getTitles').mockReturnValue(EMPTY);
  update = vi.fn('UserProfileFacade.update').mockReturnValue(of({}));
  close = vi.fn('UserProfileFacade.close').mockReturnValue(EMPTY);
}
class MockGlobalMessageService {
  add = vi.fn().mockImplementation(() => {});
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
      expect(result).toBe(true);
      expect(service.form.disabled).toBe(true);
    });

    it('should return false', () => {
      service['busy$'].next(false);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBe(false);
      expect(service.form.disabled).toBe(false);
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
        vi.spyOn(service.form, 'reset');
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
