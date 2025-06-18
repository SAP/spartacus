/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import {
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { RegistrationVerificationTokenFormComponentService } from './verify-register-verification-token-form.service';

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles = createSpy().and.returnValue(of([]));
  register = createSpy().and.callFake((user: any) => of(user));
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('RegistrationVerificationTokenFormComponentService', () => {
  let service: RegistrationVerificationTokenFormComponentService;
  let userRegisterFacade: UserRegisterFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistrationVerificationTokenFormComponentService,
        UntypedFormBuilder,
        { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    service = TestBed.inject(RegistrationVerificationTokenFormComponentService);
  });

  it('should inject RegistrationVerificationTokenFormComponentService', inject(
    [RegistrationVerificationTokenFormComponentService],
    (
      registrationVerificationTokenFormComponentService: RegistrationVerificationTokenFormComponentService
    ) => {
      expect(registrationVerificationTokenFormComponentService).toBeTruthy();
    }
  ));

  it('should display a success message after registration', () => {
    spyOn(globalMessageService, 'add');
    const userRegisterFormData: UserSignUp = {
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      verificationTokenId: 'mock_id',
      verificationTokenCode: 'mock_code',
      password: 'password',
    };
    service.register(userRegisterFormData);
    service.postRegisterMessage();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'register.postRegisterSuccessMessage',
        params: Object(10000),
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      10000
    );
  });

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

  describe('postRegisterMessage', () => {
    it('should delegate to displayMessage', () => {
      const displayMessageSpy = spyOn(service, 'displayMessage');
      service.postRegisterMessage();
      expect(displayMessageSpy).toHaveBeenCalled();
    });
  });
});
