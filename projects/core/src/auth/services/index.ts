import { ClientAuthenticationTokenService } from './client-authentication/client-authentication-token.service';
import { ClientErrorHandlingService } from './client-error/client-error-handling.service';
import { CustomerSupportAgentErrorHandlingService } from './csagent-error/csagent-error-handling.service';
import { UserAuthenticationTokenService } from './user-authentication/user-authentication-token.service';
import { UserErrorHandlingService } from './user-error/user-error-handling.service';

export const AuthServices: any[] = [
  ClientAuthenticationTokenService,
  ClientErrorHandlingService,
  UserAuthenticationTokenService,
  UserErrorHandlingService,
  CustomerSupportAgentErrorHandlingService,
];
