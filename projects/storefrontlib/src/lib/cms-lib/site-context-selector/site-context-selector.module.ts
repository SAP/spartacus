import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  ConfigModule,
  UrlTranslationModule,
  SiteContextModule,
  ContextServiceMap
} from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';
import { SiteContextSelectorComponent } from './site-context-selector.component';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { SiteContextComponentService } from './site-context-component.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SiteContextSelectorComponent: {
          selector: 'cx-site-context-selector',
          providers: [
            {
              provide: SiteContextComponentService,
              useClass: SiteContextComponentService,
              deps: [CmsComponentData, ContextServiceMap, Injector]
            }
          ]
        }
      }
    }),
    UrlTranslationModule,
    SiteContextModule
  ],
  providers: [SiteContextComponentService],
  declarations: [SiteContextSelectorComponent],
  exports: [SiteContextSelectorComponent],
  entryComponents: [SiteContextSelectorComponent]
})
export class SiteContextSelectorModule {}
