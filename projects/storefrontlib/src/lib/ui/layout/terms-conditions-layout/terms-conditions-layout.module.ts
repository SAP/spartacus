import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsConditionsLayoutComponent } from './terms-conditions-layout.component';
import { CmsModule } from '../../../cms/cms.module';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [TermsConditionsLayoutComponent],
  exports: [TermsConditionsLayoutComponent]
})
export class TermsConditionsLayoutModule {}
