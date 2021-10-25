import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ExportEntriesComponent } from './export-entries.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ExportOrderEntriesComponent: {
          component: ExportEntriesComponent,
        },
      },
    }),
  ],
  exports: [ExportEntriesComponent],
  declarations: [ExportEntriesComponent],
  entryComponents: [ExportEntriesComponent],
})
export class ExportEntriesModule {}
