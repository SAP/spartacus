import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './password-input.component';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    I18nModule,
  ],
  declarations: [PasswordInputComponent],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
