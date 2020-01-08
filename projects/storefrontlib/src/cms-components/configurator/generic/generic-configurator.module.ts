import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ConfigureCartEntryComponent } from './configure-cart-entry/configure-cart-entry.component';
import { ConfigureProductComponent } from './configure-product/configure-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConfigureProductComponent: {
          component: ConfigureProductComponent,
        },
      },
    }),
    UrlModule,
    I18nModule,
  ],
  declarations: [ConfigureProductComponent, ConfigureCartEntryComponent],
  entryComponents: [ConfigureProductComponent, ConfigureCartEntryComponent],
  exports: [ConfigureProductComponent, ConfigureCartEntryComponent],
})
export class GenericConfiguratorModule {}
