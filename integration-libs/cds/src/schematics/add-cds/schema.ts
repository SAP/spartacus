import { LibraryOptions } from '@spartacus/schematics';

export interface Schema extends LibraryOptions {
  tenant: string;
  baseUrl: string;
  profileTagLoadUrl?: string;
  profileTagConfigUrl?: string;
}
