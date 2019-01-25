import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ResetNewPasswordFormComponent } from './reset-new-password-form/reset-new-password-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [ResetNewPasswordFormComponent],
  exports: [ResetNewPasswordFormComponent]
})
export class ResetNewPasswordModule {}
