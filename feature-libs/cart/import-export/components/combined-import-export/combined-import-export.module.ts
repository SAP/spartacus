import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { CombinedImportExportComponent } from './combined-import-export.component';

@NgModule({
  imports: [
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CombinedImportExportComponent: {
          component: CombinedImportExportComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
  ],
  exports: [CombinedImportExportComponent],
  declarations: [CombinedImportExportComponent],
})
export class CombinedImportExportModule {}
