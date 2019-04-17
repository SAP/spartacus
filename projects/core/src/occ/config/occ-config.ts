import { ServerConfig } from '../../config/server-config/server-config';

export abstract class OccConfig extends ServerConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
  backend?: {
    occ?: {
      baseUrl?: string;
      prefix?: string;
      endpoints?: {
        [endpoint: string]: string;
      };
    };
  };
}
