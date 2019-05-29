import { ClientAuthenticationTokenService } from './client-authentication/client-authentication-token.service';
import { ClientErrorHandlingService } from './client-error/client-error-handling.service';
import { OpenIdAuthenticationTokenService } from './open-id-token/open-id-token.service';
import { UserAuthenticationTokenService } from './user-authentication/user-authentication-token.service';
import { UserErrorHandlingService } from './user-error/user-error-handling.service';

export const AuthServices: any[] = [
  ClientAuthenticationTokenService,
  ClientErrorHandlingService,
  UserAuthenticationTokenService,
  UserErrorHandlingService,
  OpenIdAuthenticationTokenService,
];
