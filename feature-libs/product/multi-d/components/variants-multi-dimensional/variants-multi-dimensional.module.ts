import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional.component';
import { RouterModule } from '@angular/router';
import { VariantsMultiDimensionalSelectorModule } from '../variants-multi-dimensional-selector/variants-multi-dimensional-selector.module';

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
})
export class VariantsMultiDimensionalComponentModule {}
