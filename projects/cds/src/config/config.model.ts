import { ServerConfig } from '@spartacus/core';

export abstract class CdsConfig extends ServerConfig {
  cds: {
    baseUrl?: string;
    tenantId?: string;
    httpHeaderName: {
      id: string;
    };
  };
}
