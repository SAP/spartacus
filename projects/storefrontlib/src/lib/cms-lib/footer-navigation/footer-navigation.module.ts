import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  CmsService,
  ConfigModule,
  UrlTranslationModule,
  CmsConfig
} from '@spartacus/core';
import { FooterNavigationComponent } from './footer-navigation.component';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';
import { NavigationService } from '../navigation/navigation.service';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        FooterNavigationComponent: {
          selector: 'cx-footer-navigation',
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
    GenericLinkModule,
    UrlTranslationModule
  ],
  declarations: [FooterNavigationComponent],
  entryComponents: [FooterNavigationComponent],
  exports: [FooterNavigationComponent]
})
export class FooterNavigationModule {}
