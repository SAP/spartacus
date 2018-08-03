import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsModule } from '../../../cms/cms.module';
import { LandingPageLayoutComponent } from './landing-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [LandingPageLayoutComponent],
  exports: [LandingPageLayoutComponent]
})
export class LandingPageLayoutModule {}
