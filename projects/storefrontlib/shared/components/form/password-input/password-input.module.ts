import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PasswordInputComponent],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
