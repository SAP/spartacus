import { NgModule } from '@angular/core';
import { VariantGenericCoreModule } from '@spartacus/product/variants/generic/core';
import { VariantGenericOccModule } from '@spartacus/product/variants/generic/occ';
import { VariantGenericComponentsModule } from '@spartacus/product/variants/generic/components';

@NgModule({
  imports: [
    VariantGenericCoreModule.forRoot(),
    VariantGenericOccModule,
    VariantGenericComponentsModule,
  ],
})
export class VariantsGenericModule {}
