import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { CpqConfiguratorLayoutModule } from './cpq-configurator-layout.module';
import { defaultCpqOverviewRoutingConfig } from './default-cpq-overview-routing-config';

/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // We can neither omit the path nor set to undefined
        // @ts-ignore
        path: null,
        component: PageLayoutComponent,
        data: {
          cxRoute: 'configureOverviewCLOUDCPQCONFIGURATOR',
        },
        canActivate: [CmsPageGuard],
      },
    ]),
    CpqConfiguratorLayoutModule,
  ],
  providers: [provideDefaultConfig(defaultCpqOverviewRoutingConfig)],
})
export class CpqConfiguratorOverviewModule {}
