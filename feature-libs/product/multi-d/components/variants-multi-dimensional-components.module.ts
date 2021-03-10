import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional/variants-multi-dimensional.component';
import { VariantsMultiDimensionalGuard } from './guards/variants-multi-dimensional.guard';
import { VariantsMultiDimensionalComponentModule } from './variants-multi-dimensional/variants-multi-dimensional.module';

@NgModule({
  imports: [VariantsMultiDimensionalComponentModule],
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
