import { LibraryOptions } from '@spartacus/schematics';

export interface Schema extends LibraryOptions {
  tenant: string;
  baseUrl: string;
  strategyId: string;
  profileTagLoadUrl?: string;
  profileTagConfigUrl?: string;
}
