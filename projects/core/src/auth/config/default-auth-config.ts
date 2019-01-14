import { AuthConfig } from './auth-config';
import { StateConfig } from '../../state/config/state-config';

interface DefaultAuthConfig extends AuthConfig, StateConfig {}

export const defaultAuthConfig: DefaultAuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret'
  },
  state: {
    storageSync: {
      keys: [{ auth: ['userToken', 'clientToken'] }]
    }
  }
};
