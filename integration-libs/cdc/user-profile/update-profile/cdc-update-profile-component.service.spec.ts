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
import createSpy = jasmine.createSpy;

const mockUser = {
  customerId: '123',
  firstName: 'First',
  lastName: 'Last',
  titleCode: 'Mr.',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = createSpy('UserProfileFacade.get').and.returnValue(of({}));
  getTitles = createSpy('UserProfileFacade.getTitles').and.returnValue(EMPTY);
  update = createSpy('UserProfileFacade.update').and.returnValue(of({}));
  close = createSpy('UserProfileFacade.close').and.returnValue(EMPTY);
}
const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

class MockCDCJsService implements Partial<CdcJsService> {
  updateProfileWithoutScreenSet = createSpy().and.returnValue(
    of({ status: 'OK' })
  );
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
        spyOn(globalMessageService, 'add');
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
        spyOn(service.form, 'reset').and.callThrough();
        service.updateProfile();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });
  });
  describe('error', () => {
    it('should not save invalid form', () => {
      spyOn(globalMessageService, 'add');
      service.form.patchValue({ customerId: '123' } as User);
      service.updateProfile();
      expect(cdcJsService.updateProfileWithoutScreenSet).not.toHaveBeenCalled();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should show error', () => {
      spyOn(globalMessageService, 'add');
      service.form.patchValue(mockUser);
      cdcJsService.updateProfileWithoutScreenSet = createSpy().and.returnValue(
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
