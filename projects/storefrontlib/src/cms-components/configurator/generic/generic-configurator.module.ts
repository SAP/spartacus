import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { provideOutlet } from '../../../cms-structure/outlet/outlet.providers';
import { ProductListOutlets } from '../../product/product-outlets.model';
import { ConfigureProductComponent } from './configure-product/configure-product.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConfigureProductComponent: {
          component: ConfigureProductComponent,
        },
      },
    }),
    UrlModule,
    I18nModule,
    IconModule,
  ],
  providers: [
    provideOutlet({
      id: ProductListOutlets.GRID_ITEM_END,
      component: ConfigureProductComponent,
    }),
    provideOutlet({
      id: ProductListOutlets.LIST_ITEM_END,
      component: ConfigureProductComponent,
    }),
    //    provideOutlet({
    //      id: ProductDetailOutlets.SUMMARY,
    //      component: ConfigureProductComponent,
    //    }),
  ],
  declarations: [ConfigureProductComponent],
  entryComponents: [ConfigureProductComponent],
  exports: [ConfigureProductComponent],
})
export class GenericConfiguratorModule {}
