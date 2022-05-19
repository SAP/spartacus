import { LibraryOptions } from '@spartacus/schematics';

export interface Schema extends LibraryOptions {
  baseSite: string;
  javascriptUrl: string;
  sessionExpiration: number;
}
