import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  CmsService,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { GenericLinkModule } from 'projects/storefrontlib/src/shared';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { BootstrapModule } from '../../../lib/bootstrap.module';
import { IconModule } from '../../misc';
import { NavigationUIComponent } from './navigation-ui.component';
import { NavigationComponent } from './navigation.component';
import { NavigationComponentService } from './navigation.component.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BootstrapModule,
    IconModule,
    GenericLinkModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        NavigationComponent: {
          selector: 'cx-navigation',
          providers: [
            {
              provide: NavigationComponentService,
              useClass: NavigationComponentService,
              deps: [CmsService, CmsComponentData],
            },
          ],
        },
      },
    }),
    I18nModule,
  ],
  declarations: [NavigationComponent, NavigationUIComponent],
  entryComponents: [NavigationComponent],
  exports: [NavigationComponent, NavigationUIComponent],
})
export class NavigationModule {}
