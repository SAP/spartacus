import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { EMPTY, of, throwError } from 'rxjs';
import { CDCUpdateProfileComponentService } from './cdc-update-profile-component.service';

const mockUser = {
  customerId: '123',
  firstName: 'First',
  lastName: 'Last',
  titleCode: 'Mr.',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = vi.fn().mockReturnValue(of({}));
  getTitles = vi.fn().mockReturnValue(EMPTY);
  update = vi.fn().mockReturnValue(of({}));
  close = vi.fn().mockReturnValue(EMPTY);
}
const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

class MockCDCJsService implements Partial<CdcJsService> {
  updateProfileWithoutScreenSet = vi.fn().mockReturnValue(of({ status: 'OK' }));
}

describe('UpdateProfileComponentService', () => {
  let service: CDCUpdateProfileComponentService;
  let userService: UserProfileFacade;
  let globalMessageService: GlobalMessageService;
  let cdcJsService: CdcJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        CDCUpdateProfileComponentService,
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        { provide: CdcJsService, useClass: MockCDCJsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CDCUpdateProfileComponentService);
    userService = TestBed.inject(UserProfileFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    cdcJsService = TestBed.inject(CdcJsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('save()', () => {
    describe('success', () => {
      beforeEach(() => {
        service.form.patchValue(mockUser);
        vi.spyOn(globalMessageService, 'add');
      });

      it('should update password', () => {
        service.updateProfile();
        expect(userService.update).not.toHaveBeenCalled();
        expect(cdcJsService.updateProfileWithoutScreenSet).toHaveBeenCalledWith(
          mockUser
        );
      });

      it('should show message', () => {
        service.updateProfile();
        expect(userService.update).not.toHaveBeenCalled();
        expect(cdcJsService.updateProfileWithoutScreenSet).toHaveBeenCalled();
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
      vi.spyOn(globalMessageService, 'add');
      service.form.patchValue({ customerId: '123' } as User);
      service.updateProfile();
      expect(cdcJsService.updateProfileWithoutScreenSet).not.toHaveBeenCalled();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should show error', () => {
      vi.spyOn(globalMessageService, 'add');
      service.form.patchValue(mockUser);
      cdcJsService.updateProfileWithoutScreenSet = vi.fn().mockReturnValue(
        throwError(() => ({
          status: 'ERROR',
          errorMessage: 'Error has occurred',
        }))
      );

      service.updateProfile();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        'Error has occurred',
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
