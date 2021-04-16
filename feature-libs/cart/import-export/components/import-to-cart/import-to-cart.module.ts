import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ImportToCartComponent } from './import-to-cart.component';
import { defaultImportExportConfig } from '../../core/config';
import { ImportToCartService } from './import-to-cart.service';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportProductsLinkComponent: {
          component: ImportToCartComponent,
        },
      },
    }),
  ],
  exports: [ImportToCartComponent],
  declarations: [ImportToCartComponent],
  entryComponents: [ImportToCartComponent],
  providers: [
    provideDefaultConfig(defaultImportExportConfig),
    ImportToCartService,
    SavedCartService,
  ],
})
export class ImportToCartModule {}
