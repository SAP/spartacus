import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsPageGuard,
  HamburgerMenuModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { VariantConfiguratorInteractiveLayoutModule } from './variant-configurator-interactive-layout.module';

/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // We can neither omit the path nor set to undefined
        // @ts-ignore
        path: null,
        data: {
          cxRoute: 'configureCPQCONFIGURATOR',
        },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    HamburgerMenuModule,
    VariantConfiguratorInteractiveLayoutModule,
  ],
})
export class VariantConfiguratorInteractiveModule {}
