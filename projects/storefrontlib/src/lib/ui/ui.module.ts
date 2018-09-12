import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { FormValidationService } from './services/form-validation/form-validation.service';

@NgModule({
  imports: [CommonModule, LayoutModule, PagesModule],
  exports: [LayoutModule, PagesModule],
  declarations: [],
  providers: [FormValidationService]
})
export class UiModule {}
