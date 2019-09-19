import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ToConfigurationComponent } from './to-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductAddToCartComponent: {
          component: ToConfigurationComponent,
        },
      },
    }),
    UrlModule,

    I18nModule,
  ],
  declarations: [ToConfigurationComponent],
  entryComponents: [ToConfigurationComponent],
  exports: [ToConfigurationComponent],
})
export class ToConfigurationModule {}
