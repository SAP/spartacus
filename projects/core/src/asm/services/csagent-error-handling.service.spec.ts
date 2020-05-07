import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { AsmAuthService } from '../facade/asm-auth.service';
import { CustomerSupportAgentErrorHandlingService } from './csagent-error-handling.service';

class MockAsmAuthService {
  logoutCustomerSupportAgent(): void {}
}

class MockGlobalMessageService {
  add(): void {}
}

describe('CustomerSupportAgentErrorHandlingService', () => {
  let csagentErrorHandlingService: CustomerSupportAgentErrorHandlingService;
  let asmAuthService: MockAsmAuthService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CustomerSupportAgentErrorHandlingService,
        { provide: AsmAuthService, useClass: MockAsmAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    csagentErrorHandlingService = TestBed.inject(
      CustomerSupportAgentErrorHandlingService
    );
    asmAuthService = TestBed.inject(AsmAuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe(`terminateCustomerSupportAgentExpiredSession`, () => {
    it('should logout the agent and display an error message.', () => {
      spyOn(asmAuthService, 'logoutCustomerSupportAgent').and.stub();
      spyOn(globalMessageService, 'add').and.stub();
      csagentErrorHandlingService.terminateCustomerSupportAgentExpiredSession();
      expect(asmAuthService.logoutCustomerSupportAgent).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'asm.csagentTokenExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
