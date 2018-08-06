import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsModule } from '../../../cms/cms.module';
import { LandingPageLayoutComponent } from './landing-page-layout.component';
import { UiFrameworkModule } from '../../ui-framework/ui-framework.module';

@NgModule({
  imports: [CommonModule, CmsModule, UiFrameworkModule],
  declarations: [LandingPageLayoutComponent],
  exports: [LandingPageLayoutComponent]
})
export class LandingPageLayoutModule {}
