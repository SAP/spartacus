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
import { UpdateProfileService } from './update-profile.service';
import createSpy = jasmine.createSpy;

const mockUser = {
  customerId: '123',
  firstName: 'First',
  lastName: 'Last',
  titleCode: 'Mr.',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = createSpy('UserProfileFacade.get').and.returnValue(of());
  getTitles = createSpy('UserProfileFacade.getTitles').and.returnValue(of());
  update = createSpy('UserProfileFacade.update').and.returnValue(of({}));
  close = createSpy('UserProfileFacade.close').and.returnValue(of());
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}

describe('UpdateProfileService', () => {
  let service: UpdateProfileService;
  let userService: UserProfileFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdateProfileService,
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
    service = TestBed.inject(UpdateProfileService);
    userService = TestBed.inject(UserProfileFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('save()', () => {
    describe('success', () => {
      beforeEach(() => {
        service.form.patchValue(mockUser);
      });

      it('should update password', () => {
        service.save();
        expect(userService.update).toHaveBeenCalledWith(mockUser);
      });

      it('should show message', () => {
        service.save();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'updateProfileForm.profileUpdateSuccess',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('reset()', () => {
        spyOn(service.form, 'reset').and.callThrough();
        service.save();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });
  });
  describe('error', () => {
    it('should not save invalid form', () => {
      service.form.patchValue({ customerId: '123' } as User);
      service.save();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });
});
