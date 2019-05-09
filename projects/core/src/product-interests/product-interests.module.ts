import { NgModule } from '@angular/core';
import { ProcessModule } from '../process/process.module';
import { ProductInterestOccModule } from './occ/product-interest-occ.module';
import { ProductInterestsStoreModule } from './store/product-interests-store.module';
import { ProductInterestService } from './facade';

@NgModule({
  imports: [
    ProductInterestOccModule,
    ProductInterestsStoreModule,
    ProcessModule,
  ],
  providers: [ProductInterestService],
})
export class ProductInterestsModule {}
