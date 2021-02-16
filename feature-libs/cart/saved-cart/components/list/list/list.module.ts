import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';

import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountSavedCartHistoryComponent: {
          component: ListComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
  ],
  exports: [ListComponent],
  declarations: [ListComponent],
})
export class ListModule {}
