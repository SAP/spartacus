import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ExportOrderEntriesComponent } from './export-order-entries.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ExportOrderEntriesComponent: {
          component: ExportOrderEntriesComponent,
        },
      },
    }),
  ],
  exports: [ExportOrderEntriesComponent],
  declarations: [ExportOrderEntriesComponent],
  entryComponents: [ExportOrderEntriesComponent],
})
export class ExportOrderEntriesModule {}
