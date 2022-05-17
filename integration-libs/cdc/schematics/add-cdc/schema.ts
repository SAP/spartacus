import { LibraryOptions } from '@spartacus/schematics';

export interface Schema extends LibraryOptions {
  baseSite?: string;
  jsSDKUrl?: string;
  sessionExpiration?: number;
}
