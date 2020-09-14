import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ToggleUserRoleCellComponent } from './toggle-user-role.component';

@NgModule({
  imports: [CommonModule, I18nModule, ReactiveFormsModule],
  declarations: [ToggleUserRoleCellComponent],
})
export class ToggleUserRoleModule {}
