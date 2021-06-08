import { NgModule } from '@angular/core';
import { FeaturesConfigModule } from '@spartacus/core';
import { PwaModule } from '../../cms-structure/pwa/pwa.module';
import { SeoModule } from '../../cms-structure/seo/seo.module';
import { AnonymousConsentsDialogModule } from '../../shared/components/anonymous-consents-dialog/anonymous-consents-dialog.module';
import { StorefrontComponentModule } from './storefront-component.module';

/**
 * @deprecated since 3.1, see https://sap.github.io/spartacus-docs/reference-app-structure
 */
@NgModule({
  imports: [
    PwaModule,
    SeoModule,
    AnonymousConsentsDialogModule,
    FeaturesConfigModule,

    StorefrontComponentModule,
  ],
  exports: [StorefrontComponentModule],
})
export class MainModule {}
