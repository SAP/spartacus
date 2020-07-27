import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfigAttributeRadioButtonComponent } from './config-attribute-radio-button.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
  ],
  declarations: [ConfigAttributeRadioButtonComponent],
  exports: [ConfigAttributeRadioButtonComponent],
  entryComponents: [ConfigAttributeRadioButtonComponent],
})
export class ConfigAttributeRadioButtonModule {}
