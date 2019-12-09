import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { I18nModule } from '@spartacus/core';

import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
