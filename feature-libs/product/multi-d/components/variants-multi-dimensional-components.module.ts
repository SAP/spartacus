import { NgModule } from '@angular/core';
import { VariantsMultiDimensionalSelectorModule } from './variants-multi-dimensional-selector/variants-multi-dimensional-selector.module';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { VariantsMultiDimensionalSelectorComponent } from './variants-multi-dimensional-selector';

@NgModule({
  imports: [VariantsMultiDimensionalSelectorModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantMultiDimensionalSelectorComponent: {
          component: VariantsMultiDimensionalSelectorComponent,
        },
      },
    }),
  ],
})
export class VariantsMultiDimensionalComponentsModule {}
