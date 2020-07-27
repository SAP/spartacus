import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfigAttributeDropDownComponent } from './config-attribute-drop-down.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    NgSelectModule,
  ],
  declarations: [ConfigAttributeDropDownComponent],
  exports: [ConfigAttributeDropDownComponent],
  entryComponents: [ConfigAttributeDropDownComponent],
})
export class ConfigAttributeDropDownModule {}
