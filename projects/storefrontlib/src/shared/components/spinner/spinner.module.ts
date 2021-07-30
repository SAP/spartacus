import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '@spartacus/core';
import { SpinnerComponent } from './spinner.component';
import { SpinnerButtonComponent } from './spinner-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [SpinnerComponent, SpinnerButtonComponent],
  exports: [SpinnerComponent, SpinnerButtonComponent],
})
export class SpinnerModule {}
