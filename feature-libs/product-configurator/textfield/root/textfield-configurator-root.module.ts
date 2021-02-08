import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CommonConfiguratorModule } from '@spartacus/product-configurator/common';
import {
  CmsPageGuard,
  LayoutConfig,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { TextfieldConfiguratorRootFeatureModule } from './textfield-configurator-root-feature.module';
import { TextfieldConfiguratorRoutingModule } from './textfield-configurator-routing.module';

/**
 * Exposes the root modules that we need to statically load. Contains page mappings
 */
@NgModule({
  imports: [
    CommonModule,
    CommonConfiguratorModule,
    TextfieldConfiguratorRootFeatureModule,
    TextfieldConfiguratorRoutingModule.forRoot(),
    RouterModule.forChild([
      {
        path: null,
        component: PageLayoutComponent,
        data: {
          cxRoute: 'configureTEXTFIELD',
        },
        canActivate: [CmsPageGuard],
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(<LayoutConfig>{
      layoutSlots: {
        TextfieldConfigurationTemplate: {
          slots: ['TextfieldConfigContent'],
        },
      },
    }),
  ],
})
export class TextfieldConfiguratorRootModule {
  static forRoot(): ModuleWithProviders<TextfieldConfiguratorRootModule> {
    return {
      ngModule: TextfieldConfiguratorRootModule,
    };
  }
}
