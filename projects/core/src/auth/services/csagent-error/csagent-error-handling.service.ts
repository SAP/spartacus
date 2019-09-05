import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message/index';
import { AuthService } from '../../facade/auth.service';

@Injectable()
export class CustomerSupportAgentErrorHandlingService {
  constructor(
    protected authService: AuthService,
    protected globalMessageService: GlobalMessageService
  ) {}

  terminateCustomerSupportAgentExpiredSession(): void {
    this.authService.logoutCustomerSupportAgent();
    this.globalMessageService.add(
      {
        key: 'asm.csagentTokenExpired',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
