import { NgModule } from '@angular/core';
import { OrderGridModule } from './order-grid/order-grid.module';
import { VariantsMultiDimensionalModule } from './variants-multi-dimensional/variants-multi-dimensional.module';
import { VariantsMultiDimensionalSelectorModule } from './variants-multi-dimensional-selector/variants-multi-dimensional-selector.module';

@NgModule({
  imports: [
    VariantsMultiDimensionalModule,
    VariantsMultiDimensionalSelectorModule,
    OrderGridModule,
  ],
})
export class VariantsMultiDimensionalComponentsModule {}
