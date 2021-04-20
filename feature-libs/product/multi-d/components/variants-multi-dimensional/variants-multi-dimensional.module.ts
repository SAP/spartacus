import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional.component';
import { RouterModule } from '@angular/router';
import { VariantsMultiDimensionalSelectorModule } from '../variants-multi-dimensional-selector/variants-multi-dimensional-selector.module';
import { VariantsMultiDimensionalGuard } from '../guards/variants-multi-dimensional.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    VariantsMultiDimensionalSelectorModule,
  ],
  declarations: [VariantsMultiDimensionalComponent],
  entryComponents: [VariantsMultiDimensionalComponent],
  exports: [VariantsMultiDimensionalComponent],
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
export class VariantsMultiDimensionalModule {}
