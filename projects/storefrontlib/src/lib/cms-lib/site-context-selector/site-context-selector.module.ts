import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfigModule, UrlTranslationModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';
import { SiteContextSelectorComponent } from './site-context-selector.component';

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
    UrlTranslationModule
  ],
  declarations: [SiteContextSelectorComponent],
  exports: [SiteContextSelectorComponent],
  entryComponents: [SiteContextSelectorComponent]
})
export class SiteContextSelectorModule {}
