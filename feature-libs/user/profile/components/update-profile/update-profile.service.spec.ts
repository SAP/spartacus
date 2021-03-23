import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  UrlCommands,
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

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

describe('UpdateProfileService', () => {
  let service: UpdateProfileService;
  let userService: UserProfileFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdateProfileService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
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

    routingService = TestBed.inject(RoutingService);
    userService = TestBed.inject(UserProfileFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('reset()', () => {
    spyOn(service.form, 'reset').and.callThrough();
    service.reset();
    expect(service.form.reset).toHaveBeenCalled();
  });

  describe('save()', () => {
    beforeEach(() => {
      spyOn(globalMessageService, 'add').and.stub();
      spyOn(routingService, 'go').and.stub();
    });

    function fillForm(user: User = mockUser) {
      service.form.patchValue(user);
    }

    it('should not save invalid form', () => {
      fillForm({ customerId: '123' });
      service.form.patchValue({ customerId: '123' } as User);
      service.save();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('should update password', () => {
      fillForm();
      service.save();
      expect(userService.update).toHaveBeenCalledWith(mockUser);
    });

    it('should show message', () => {
      fillForm();
      service.save();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'updateProfileForm.profileUpdateSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should not reroute the user after updating', () => {
      service.save();
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
