import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { ImportToCartService } from './import-to-cart.service';
import { ImportEntriesLinkComponent } from './import-entries-link/import-entries-link-component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportProductsLinkComponent: {
          component: ImportEntriesLinkComponent,
        },
      },
    }),
  ],
  exports: [ImportEntriesLinkComponent],
  declarations: [ImportEntriesLinkComponent],
  providers: [ImportToCartService, SavedCartService],
})
export class ImportToCartModule {}
