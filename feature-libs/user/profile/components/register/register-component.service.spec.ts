import { inject, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import {
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { RegisterComponentService } from './register-component.service';

import createSpy = jasmine.createSpy;
const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'JohnDoe@thebest.john.intheworld.com',
  email_lowercase: 'johndoe@thebest.john.intheworld.com',
  termsandconditions: true,
  password: 'strongPass$!123',
  passwordconf: 'strongPass$!123',
  newsletter: true,
  captcha: true,
};

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles = createSpy().and.returnValue(of([]));
  register = createSpy().and.callFake((user: any) => of(user));
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('RegisterComponentService', () => {
  let service: RegisterComponentService;
  let userRegisterFacade: UserRegisterFacade;
  let globalMessageService: GlobalMessageService;
  let fb: UntypedFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterComponentService,
        UntypedFormBuilder,
        { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    globalMessageService = TestBed.inject(GlobalMessageService);
    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    fb = TestBed.inject(UntypedFormBuilder);
    service = TestBed.inject(RegisterComponentService);
  });

  it('should inject RegisterComponentService', inject(
    [RegisterComponentService],
    (registerComponentService: RegisterComponentService) => {
      expect(registerComponentService).toBeTruthy();
    }
  ));

  it('should be able to register user from UserRegisterService', () => {
    const userRegisterFormData: UserSignUp = {
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    };
    service.register(userRegisterFormData);
    expect(userRegisterFacade.register).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  it('should get titles from UserRegisterService', () => {
    service.getTitles().subscribe().unsubscribe();
    expect(userRegisterFacade.getTitles).toHaveBeenCalled();
  });

  describe('postRegisterMessage', () => {
    it('should delegate to globalMessageService.add', () => {
      service.postRegisterMessage();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'register.postRegisterSuccessMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });

  it('generateAdditionalConsentsFormControl', () => {
    spyOn(fb, 'array').and.callThrough();
    service.generateAdditionalConsentsFormControl();
    expect(fb.array).toHaveBeenCalled();
  });

  it('getAdditionalConsents', () => {
    let result = service.getAdditionalConsents();
    expect(result).toEqual([]);
  });
  it('collectDataFromRegisterForm()', () => {
    const form = mockRegisterFormData;
    expect(service.collectDataFromRegisterForm(form)).toEqual({
      firstName: form.firstName,
      lastName: form.lastName,
      uid: form.email_lowercase,
      password: form.password,
      titleCode: form.titleCode,
    });
  });
});
