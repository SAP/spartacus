import { OccConfig } from '@spartacus/core';

export abstract class AuthModuleConfig extends OccConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
  };
}

export const defaultAuthModuleConfig: AuthModuleConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret'
  }
};
