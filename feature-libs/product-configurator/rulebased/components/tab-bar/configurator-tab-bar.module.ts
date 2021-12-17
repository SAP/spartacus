import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ConfiguratorTabBarComponent } from './configurator-tab-bar.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorTabBar: {
          component: ConfiguratorTabBarComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorTabBarComponent],
  exports: [ConfiguratorTabBarComponent],
})
export class ConfiguratorTabBarModule {}
