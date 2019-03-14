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
import { NavigationComponentService } from '../navigation/navigation.component.service';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

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
              provide: NavigationComponentService,
              useClass: NavigationComponentService,
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
