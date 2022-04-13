import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordVisibilityComponent } from './password-visibility.component';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [PasswordVisibilityComponent],
  exports: [PasswordVisibilityComponent],
})
export class PasswordVisibilityModule {}
