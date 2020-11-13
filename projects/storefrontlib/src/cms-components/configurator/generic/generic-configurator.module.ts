import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
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
    IconModule,
  ],
  declarations: [ConfigureProductComponent],
  entryComponents: [ConfigureProductComponent],
  exports: [ConfigureProductComponent],
})
export class GenericConfiguratorModule {}
