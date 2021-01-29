import { NgModule } from '@angular/core';
import { VariantsMultiDimensionalSelectorModule } from './variants-multi-dimensional-selector/variants-multi-dimensional-selector.module';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional/variants-multi-dimensional.component';

@NgModule({
  imports: [VariantsMultiDimensionalSelectorModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantMultiDimensionalSelectorComponent: {
          component: VariantsMultiDimensionalComponent,
        },
      },
    }),
  ],
})
export class VariantsMultiDimensionalComponentsModule {}
