import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation.component';
import { NavigationUIComponent } from './navigation-ui.component';
import { NavigationService } from './navigation.service';
import { ConfigModule, UrlTranslationModule } from '@spartacus/core';
import { CmsModuleConfig } from '../../cms/cms-module-config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BootstrapModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        NavigationComponent: { selector: 'cx-navigation' }
      }
    }),
    UrlTranslationModule
  ],
  providers: [NavigationService],
  declarations: [NavigationComponent, NavigationUIComponent],
  entryComponents: [NavigationComponent],
  exports: [NavigationComponent, NavigationUIComponent]
})
export class NavigationModule {}
