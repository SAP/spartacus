import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './password-input.component';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconModule],
  declarations: [PasswordInputComponent],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
