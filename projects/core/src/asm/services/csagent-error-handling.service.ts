import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { AsmAuthService } from '../facade/asm-auth.service';

@Injectable({ providedIn: 'root' })
export class CustomerSupportAgentErrorHandlingService {
  constructor(
    protected asmAuthService: AsmAuthService,
    protected globalMessageService: GlobalMessageService
  ) {}

  terminateCustomerSupportAgentExpiredSession(): void {
    this.asmAuthService.logoutCustomerSupportAgent();
    this.globalMessageService.add(
      {
        key: 'asm.csagentTokenExpired',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
