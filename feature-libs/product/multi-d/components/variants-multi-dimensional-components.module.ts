import { NgModule } from '@angular/core';
import { VariantsMultiDimensionalSelectorModule } from './variants-multi-dimensional-selector/variants-multi-dimensional-selector.module';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional/variants-multi-dimensional.component';
import { VariantsMultiDimensionalGuard } from '@spartacus/product/multi-d/core';

@NgModule({
  imports: [VariantsMultiDimensionalSelectorModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantMultiDimensionalSelectorComponent: {
          component: VariantsMultiDimensionalComponent,
          guards: [VariantsMultiDimensionalGuard],
        },
      },
    }),
  ],
})
export class VariantsMultiDimensionalComponentsModule {}
