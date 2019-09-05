import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
} from 'projects/core/src/global-message/index';
import { AuthService } from '../../facade/auth.service';
import { CustomerSupportAgentErrorHandlingService } from './csagent-error-handling.service';

class MockAuthService {
  logoutCustomerSupportAgent(): void {}
}

class MockGlobalMessageService {
  add(): void {}
}

describe('CustomerSupportAgentErrorHandlingService', () => {
  let csagentErrorHandlingService: CustomerSupportAgentErrorHandlingService;
  let authService: MockAuthService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CustomerSupportAgentErrorHandlingService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    csagentErrorHandlingService = TestBed.get(
      CustomerSupportAgentErrorHandlingService
    );
    authService = TestBed.get(AuthService);
    globalMessageService = TestBed.get(GlobalMessageService);
  });

  describe(`terminateCustomerSupportAgentExpiredSession`, () => {
    it('should logout the agent and display an error message.', () => {
      spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
      spyOn(globalMessageService, 'add').and.stub();
      csagentErrorHandlingService.terminateCustomerSupportAgentExpiredSession();
      expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'asm.csagentTokenExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
