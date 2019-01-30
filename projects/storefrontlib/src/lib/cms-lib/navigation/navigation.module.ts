import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  CmsConfig,
  CmsService,
  ConfigModule,
  UrlTranslationModule
} from '@spartacus/core';
import { NavigationComponent } from './navigation.component';
import { NavigationUIComponent } from './navigation-ui.component';
import { NavigationService } from './navigation.service';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BootstrapModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        NavigationComponent: {
          selector: 'cx-navigation',
          providers: [
            {
              provide: NavigationService,
              useClass: NavigationService,
              deps: [CmsService, CmsComponentData]
            }
          ]
        }
      }
    }),
    UrlTranslationModule
  ],
  declarations: [NavigationComponent, NavigationUIComponent],
  entryComponents: [NavigationComponent],
  exports: [NavigationComponent, NavigationUIComponent]
})
export class NavigationModule {}
