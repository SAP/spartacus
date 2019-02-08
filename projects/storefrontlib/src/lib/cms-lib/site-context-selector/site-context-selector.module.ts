import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  ConfigModule,
  UrlTranslationModule,
  SiteContextModule,
  LanguageService,
  CurrencyService
} from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';

import { CmsComponentData } from '../../cms/components/cms-component-data';

import {
  SiteContextComponentService,
  ContextSelectorServiceMap
} from './site-context-component.service';
import { SiteContextSelectorComponent } from './site-context-selector.component';

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
              deps: [CmsComponentData, ContextSelectorServiceMap, Injector]
            }
          ]
        }
      }
    }),
    UrlTranslationModule,
    SiteContextModule.forRoot()
  ],
  providers: [
    SiteContextComponentService,
    {
      provide: ContextSelectorServiceMap,
      useValue: {
        LANGUAGE: LanguageService,
        CURRENCY: CurrencyService
      }
    }
  ],
  declarations: [SiteContextSelectorComponent],
  exports: [SiteContextSelectorComponent],
  entryComponents: [SiteContextSelectorComponent]
})
export class SiteContextSelectorModule {}
