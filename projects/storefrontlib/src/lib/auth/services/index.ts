import { ClientAuthenticationTokenService } from './client-authentication/client-authentication-token.service';
import { UserAuthenticationTokenService } from './user-authentication/user-authentication-token.service';
import { UserErrorHandlingService } from './user-error/user-error-handling.service';

export const services: any[] = [
  ClientAuthenticationTokenService,
  UserAuthenticationTokenService,
  UserErrorHandlingService
];
