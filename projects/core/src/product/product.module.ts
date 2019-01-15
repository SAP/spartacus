import { NgModule } from '@angular/core';

import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from './facade/index';
import { ProductStoreModule } from './store/product-store.module';
import { ProductOccModule } from './occ/product-occ.module';
import { StateConfig } from '../state/config/state-config';
import { PRODUCT_FEATURE } from './store/product-state';
import { ConfigModule } from '../config/config.module';

const productSsrTransferConfig: StateConfig = {
  state: { ssrTransfer: { keys: [PRODUCT_FEATURE] } }
};

@NgModule({
  imports: [
    ProductOccModule,
    ProductStoreModule,
    ConfigModule.withConfig(productSsrTransferConfig)
  ],
  providers: [ProductService, ProductSearchService, ProductReviewService]
})
export class ProductModule {}
