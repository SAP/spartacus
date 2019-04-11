import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ConfigModule,
  CmsConfig,
  UrlTranslationModule,
  I18nModule,
} from '@spartacus/core';

import { CloseAccountComponent } from './components/close-account/close-account.component';
import { RouterModule } from '@angular/router';
import { CloseAccountModalComponent } from './components/close-account-modal/close-account-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlTranslationModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CloseAccountComponent: { selector: 'cx-close-account' },
      },
    }),
  ],
  declarations: [CloseAccountComponent, CloseAccountModalComponent],
  exports: [CloseAccountComponent],
  entryComponents: [CloseAccountComponent, CloseAccountModalComponent],
})
export class CloseAccountModule {}
