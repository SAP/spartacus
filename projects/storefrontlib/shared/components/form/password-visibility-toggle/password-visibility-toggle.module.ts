import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordVisibilityToggleDirective } from './password-visibility-toggle.directive';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormConfig } from '../../../../shared/config/form-config';
import { defaultFormConfig } from '../../../../shared/config/default-form-config';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  providers: [provideDefaultConfig(<FormConfig>defaultFormConfig)],
  declarations: [
    PasswordVisibilityToggleDirective,
    PasswordVisibilityToggleComponent,
  ],
  exports: [
    PasswordVisibilityToggleDirective,
    PasswordVisibilityToggleComponent,
  ],
})
export class PasswordVisibilityToggleModule {}
