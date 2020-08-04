import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule, UserService } from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { ConfigOverviewAttributeComponent } from '../commons/config-overview-attribute/config-overview-attribute.component';
import { ConfigOverviewFormComponent } from '../commons/config-overview-form/config-overview-form.component';
import { ConfigOverviewNotificationBannerComponent } from '../commons/config-overview-notification-banner/config-overview-notification-banner.component';
import { GenericConfiguratorModule } from '../generic/generic-configurator.module';

@NgModule({
  imports: [
    CommonModule,
    GenericConfiguratorModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    IconModule,
    RouterModule,
  ],

  declarations: [
    ConfigOverviewNotificationBannerComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
  exports: [
    ConfigOverviewNotificationBannerComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
  providers: [UserService],
  entryComponents: [
    ConfigOverviewNotificationBannerComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
})
export class VariantConfiguratorOverviewModule {}
