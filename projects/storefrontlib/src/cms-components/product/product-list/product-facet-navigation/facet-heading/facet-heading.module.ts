import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../../../cms-components/misc/icon/icon.module';
import { FacetHeadingComponent } from './facet-heading.component';
@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [FacetHeadingComponent],
  exports: [FacetHeadingComponent],
})
export class FacetHeadingModule {}
