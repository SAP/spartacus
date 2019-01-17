import { NgModule } from '@angular/core';
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
import {
  SiteContextSelectorComponent,
  ContextSelectorServiceMap
} from './site-context-selector.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SiteContextSelectorComponent: {
          selector: 'cx-site-context-selector'
        }
      }
    }),
    UrlTranslationModule,
    SiteContextModule
  ],
  providers: [
    LanguageService,
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
