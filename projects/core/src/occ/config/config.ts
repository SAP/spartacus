import { ServerConfig } from '../../config/server-config/server-config';

export abstract class OccConfig extends ServerConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}

export const defaultOccConfig: OccConfig = {
  site: {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  }
};
