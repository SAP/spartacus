import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FacetHeadingModule } from '../facet-heading/facet-heading.module';
import { FacetComponent } from './facet.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FacetHeadingModule,
  ],
  declarations: [FacetComponent],
  exports: [FacetComponent],
})
export class FacetModule {}
