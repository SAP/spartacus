import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ExportProductListComponent } from './export-product-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ExportProductList: {
          component: ExportProductListComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
  ],
  exports: [ExportProductListComponent],
  declarations: [ExportProductListComponent],
  entryComponents: [ExportProductListComponent],
})
export class ExportProductListModule {}
