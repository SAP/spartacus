import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CmsPageGuard,
  HamburgerMenuModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CpqConfiguratorLayoutModule } from './cpq-configurator-layout.module';
import { defaultCpqInteractiveRoutingConfig } from './default-cpq-interactive-routing-config';

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
          cxRoute: 'configureCLOUDCPQCONFIGURATOR',
        },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    HamburgerMenuModule,
    CpqConfiguratorLayoutModule,
  ],
  providers: [provideDefaultConfig(defaultCpqInteractiveRoutingConfig)],
})
export class CpqConfiguratorInteractiveModule {}
