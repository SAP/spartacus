import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ContextServiceMap,
  provideDefaultConfig,
  SiteContextModule,
} from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { IconModule } from '../icon/index';
import { LanguageCurrencyComponent } from './language-currency.component';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextSelectorComponent } from './site-context-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, SiteContextModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CMSSiteContextComponent: {
          component: SiteContextSelectorComponent,
          providers: [
            {
              provide: SiteContextComponentService,
              useClass: SiteContextComponentService,
              deps: [CmsComponentData, ContextServiceMap, Injector],
            },
          ],
        },
        LanguageCurrencyComponent: {
          component: LanguageCurrencyComponent,
        },
      },
    }),
    SiteContextComponentService,
  ],
  declarations: [SiteContextSelectorComponent, LanguageCurrencyComponent],
  exports: [SiteContextSelectorComponent, LanguageCurrencyComponent],
})
export class SiteContextSelectorModule {}
