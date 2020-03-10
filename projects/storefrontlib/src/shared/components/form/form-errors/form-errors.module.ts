import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-errors.component';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [FormErrorComponent],
  exports: [FormErrorComponent],
})
export class FormErrorsModule {}
