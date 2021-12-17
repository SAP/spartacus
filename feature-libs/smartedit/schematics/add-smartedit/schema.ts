import { LibraryOptions } from '@spartacus/schematics';

export interface Schema extends LibraryOptions {
  storefrontPreviewRoute?: string;
  allowOrigin?: string;
}
