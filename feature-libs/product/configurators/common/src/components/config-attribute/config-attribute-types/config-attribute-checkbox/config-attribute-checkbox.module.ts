import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfigAttributeCheckBoxComponent } from './config-attribute-checkbox.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
  ],
  declarations: [ConfigAttributeCheckBoxComponent],
  exports: [ConfigAttributeCheckBoxComponent],
  entryComponents: [ConfigAttributeCheckBoxComponent],
})
export class ConfigAttributeCheckboxModule {}
