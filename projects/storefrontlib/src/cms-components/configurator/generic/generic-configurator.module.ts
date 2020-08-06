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
import { ConfigureCartEntryComponent } from './configure-cart-entry/configure-cart-entry.component';
import { ConfigureProductComponent } from './configure-product/configure-product.component';
import { ConfigureIssuesNotificationComponent } from './configure-issues-notification/configure-issues-notification.component';

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
  declarations: [
    ConfigureProductComponent,
    ConfigureCartEntryComponent,
    ConfigureIssuesNotificationComponent,
  ],
  entryComponents: [ConfigureProductComponent, ConfigureCartEntryComponent],
  exports: [
    ConfigureProductComponent,
    ConfigureCartEntryComponent,
    ConfigureIssuesNotificationComponent,
  ],
})
export class GenericConfiguratorModule {}
