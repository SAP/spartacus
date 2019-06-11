import { ServerConfig } from '@spartacus/core';

export abstract class CdsConfig extends ServerConfig {
  cds: {
    tenant?: string;
    httpHeaderName: {
      id: string;
    };
  };
}
