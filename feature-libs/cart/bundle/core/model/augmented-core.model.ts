import { BundleTemplate } from './bundle-template.model';

declare module '@spartacus/core' {
  interface Product {
    bundleTemplates?: BundleTemplate[];
  }
}
