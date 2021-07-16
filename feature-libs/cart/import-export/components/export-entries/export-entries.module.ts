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
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ExportOrderEntriesComponent: {
          component: ExportEntriesComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
  ],
  exports: [ExportEntriesComponent],
  declarations: [ExportEntriesComponent],
  entryComponents: [ExportEntriesComponent],
})
export class ExportEntriesModule {}
